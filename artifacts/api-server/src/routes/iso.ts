import { Router, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { isoDocuments, documentRevisions, hazards, incidents, facilitators, services, trainingPrograms } from "@workspace/db";
import { and, desc, eq, sql } from "drizzle-orm";

const router = Router();

function userIdOr401(req: Request, res: Response): string | null {
  if (!req.isAuthenticated()) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return null;
  }
  return req.user.id;
}

router.get("/iso/documents", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const conditions = [eq(isoDocuments.userId, userId)];
    if (status) conditions.push(eq(isoDocuments.status, status));
    const docs = await db.select().from(isoDocuments).where(and(...conditions)).orderBy(desc(isoDocuments.updatedAt)).limit(100);
    res.json({ success: true, data: docs, total: docs.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch documents");
    res.status(500).json({ success: false, error: "Failed to fetch documents" });
  }
});

router.post("/iso/documents", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  if (typeof req.body?.title !== "string" || !req.body.title.trim()) {
    res.status(400).json({ success: false, error: "Document title is required" });
    return;
  }
  try {
    const body = req.body;
    const doc = await db.transaction(async (tx) => {
      const [created] = await tx.insert(isoDocuments).values({
        userId,
        title: body.title,
        type: body.type,
        category: body.category,
        isoStandard: body.isoStandard,
        content: body.content,
        status: "draft",
        reviewer: body.reviewer,
        approver: body.approver,
        reviewDueDate: body.reviewDueDate ? new Date(body.reviewDueDate) : undefined,
        changeSummary: body.changeSummary || "Dokumen dibuat",
      }).returning();
      if (!created) throw new Error("Document insert did not return a row");
      await tx.insert(documentRevisions).values({
        documentId: created.id,
        userId,
        version: created.version ?? 1,
        status: created.status ?? "draft",
        changedBy: userId,
        changeSummary: body.changeSummary || "Dokumen dibuat",
        content: created.content,
      });
      return created;
    });
    if (!doc) {
      res.status(500).json({ success: false, error: "Failed to create document" });
      return;
    }
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    req.log.error({ error }, "Failed to create document");
    res.status(500).json({ success: false, error: "Failed to create document" });
  }
});

router.get("/iso/documents/:id", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ success: false, error: "Invalid document id" });
    return;
  }
  try {
    const [doc] = await db.select().from(isoDocuments).where(and(eq(isoDocuments.id, id), eq(isoDocuments.userId, userId)));
    if (!doc) {
      res.status(404).json({ success: false, error: "Document not found" });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch document");
    res.status(500).json({ success: false, error: "Failed to fetch document" });
  }
});

router.patch("/iso/documents/:id", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ success: false, error: "Invalid document id" });
    return;
  }
  try {
    const [current] = await db.select().from(isoDocuments).where(and(eq(isoDocuments.id, id), eq(isoDocuments.userId, userId)));
    if (!current) {
      res.status(404).json({ success: false, error: "Document not found" });
      return;
    }
    const nextStatus = req.body?.status ?? current.status ?? "draft";
    const allowedTransitions: Record<string, string[]> = {
      draft: ["draft", "review"],
      review: ["review", "approved", "rejected", "draft"],
      rejected: ["rejected", "draft"],
      approved: ["approved", "draft"],
    };
    if (!allowedTransitions[current.status ?? "draft"]?.includes(nextStatus)) {
      res.status(400).json({ success: false, error: `Transition ${current.status} → ${nextStatus} is not allowed` });
      return;
    }
    const newVersion = current.status === "approved" && nextStatus === "draft" ? (current.version ?? 1) + 1 : current.version ?? 1;
    const doc = await db.transaction(async (tx) => {
      const [updated] = await tx.update(isoDocuments).set({
        ...(req.body?.title !== undefined ? { title: String(req.body.title).trim() || current.title } : {}),
        ...(req.body?.type !== undefined ? { type: req.body.type } : {}),
        ...(req.body?.category !== undefined ? { category: req.body.category } : {}),
        ...(req.body?.isoStandard !== undefined ? { isoStandard: req.body.isoStandard } : {}),
        ...(req.body?.content !== undefined ? { content: req.body.content } : {}),
        ...(req.body?.reviewer !== undefined ? { reviewer: req.body.reviewer } : {}),
        ...(req.body?.approver !== undefined ? { approver: req.body.approver } : {}),
        ...(req.body?.reviewDueDate !== undefined ? { reviewDueDate: req.body.reviewDueDate ? new Date(req.body.reviewDueDate) : null } : {}),
        status: nextStatus,
        version: newVersion,
        reviewedAt: nextStatus === "review" ? new Date() : current.reviewedAt,
        approvedAt: nextStatus === "approved" ? new Date() : current.approvedAt,
        distributedAt: nextStatus === "approved" ? new Date() : current.distributedAt,
        changeSummary: req.body?.changeSummary || `Status diubah menjadi ${nextStatus}`,
        updatedAt: new Date(),
      }).where(and(eq(isoDocuments.id, id), eq(isoDocuments.userId, userId))).returning();
      if (!updated) throw new Error("Document update did not return a row");
      await tx.insert(documentRevisions).values({
        documentId: updated.id,
        userId,
        version: updated.version ?? newVersion,
        status: updated.status ?? nextStatus,
        changedBy: userId,
        changeSummary: updated.changeSummary,
        content: updated.content,
      });
      return updated;
    });
    if (!doc) {
      res.status(404).json({ success: false, error: "Document not found" });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    req.log.error({ error }, "Failed to update document");
    res.status(500).json({ success: false, error: "Failed to update document" });
  }
});

router.get("/iso/documents/:id/history", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ success: false, error: "Invalid document id" });
    return;
  }
  try {
    const data = await db.select().from(documentRevisions)
      .where(and(eq(documentRevisions.documentId, id), eq(documentRevisions.userId, userId)))
      .orderBy(desc(documentRevisions.createdAt));
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch document history");
    res.status(500).json({ success: false, error: "Failed to fetch document history" });
  }
});

router.get("/iso/hazards", async (req, res) => {
  try {
    const data = await db.select().from(hazards).limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hazards" });
  }
});

router.post("/iso/hazards", async (req, res) => {
  try {
    const body = req.body;
    const [hazard] = await db.insert(hazards).values({
      name: body.name,
      description: body.description,
      riskLevel: body.riskLevel || "medium",
      mitigation: body.mitigation,
    }).returning();
    res.status(201).json(hazard);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hazard" });
  }
});

router.get("/iso/incidents", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const data = await db.select().from(incidents).where(eq(incidents.userId, userId)).orderBy(desc(incidents.createdAt)).limit(50);
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch incidents");
    res.status(500).json({ success: false, error: "Failed to fetch incidents" });
  }
});

router.post("/iso/incidents", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const body = req.body;
    const [incident] = await db.insert(incidents).values({
      userId,
      title: body.title,
      description: body.description,
      severity: body.severity || "minor",
      location: body.location,
      status: body.status || "open",
    }).returning();
    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    res.status(500).json({ error: "Failed to create incident" });
  }
});

router.get("/iso/facilitators", async (req, res) => {
  try {
    const data = await db.select().from(facilitators).limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch facilitators" });
  }
});

router.post("/iso/facilitators", async (req, res) => {
  try {
    const body = req.body;
    const [facilitator] = await db.insert(facilitators).values({
      name: body.name,
      expertise: body.expertise,
      company: body.company,
      location: body.location,
      bio: body.bio,
      certifications: body.certifications,
      status: "active",
    }).returning();
    res.status(201).json(facilitator);
  } catch (error) {
    res.status(500).json({ error: "Failed to create facilitator" });
  }
});

router.get("/iso/services", async (req, res) => {
  try {
    const data = await db.select().from(services).limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.get("/iso/training", async (req, res) => {
  try {
    const data = await db.select().from(trainingPrograms).limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch training programs" });
  }
});

export default router;

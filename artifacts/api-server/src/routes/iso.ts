import { Router, type Request, type Response } from "express";
import { db } from "@workspace/db";
import {
  documentRevisions,
  documentTeamMembers,
  facilitators,
  hazards,
  incidents,
  isoDocuments,
  services,
  trainingPrograms,
  usersTable,
} from "@workspace/db";
import { and, desc, eq, exists, inArray, or, sql } from "drizzle-orm";

const router = Router();

function userIdOr401(req: Request, res: Response): string | null {
  if (!req.isAuthenticated()) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return null;
  }
  return req.user.id;
}

const TEAM_ROLES = ["author", "reviewer", "approver"] as const;
type TeamRole = (typeof TEAM_ROLES)[number];

function isTeamRole(value: unknown): value is TeamRole {
  return typeof value === "string" && TEAM_ROLES.includes(value as TeamRole);
}

function userDisplayName(user: {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email || user.id;
}

async function ensureTeamMember(teamOwnerId: string, userId: string, role: TeamRole): Promise<void> {
  await db.insert(documentTeamMembers).values({ teamOwnerId, userId, role }).onConflictDoNothing();
}

async function hasActiveRole(teamOwnerId: string, userId: string, role: TeamRole): Promise<boolean> {
  const [member] = await db
    .select({ id: documentTeamMembers.id })
    .from(documentTeamMembers)
    .where(and(
      eq(documentTeamMembers.teamOwnerId, teamOwnerId),
      eq(documentTeamMembers.userId, userId),
      eq(documentTeamMembers.role, role),
      eq(documentTeamMembers.status, "active"),
    ));
  return Boolean(member);
}

function documentAccess(userId: string) {
  const documentOwnerId = sql<string>`coalesce(${isoDocuments.authorId}, ${isoDocuments.userId})`;
  return or(
    eq(isoDocuments.userId, userId),
    eq(isoDocuments.authorId, userId),
    and(
      eq(isoDocuments.reviewerId, userId),
      exists(
        db.select({ value: sql`1` })
          .from(documentTeamMembers)
          .where(and(
            eq(documentTeamMembers.teamOwnerId, documentOwnerId),
            eq(documentTeamMembers.userId, userId),
            eq(documentTeamMembers.role, "reviewer"),
            eq(documentTeamMembers.status, "active"),
          )),
      ),
    ),
    and(
      eq(isoDocuments.approverId, userId),
      exists(
        db.select({ value: sql`1` })
          .from(documentTeamMembers)
          .where(and(
            eq(documentTeamMembers.teamOwnerId, documentOwnerId),
            eq(documentTeamMembers.userId, userId),
            eq(documentTeamMembers.role, "approver"),
            eq(documentTeamMembers.status, "active"),
          )),
      ),
    ),
  );
}

async function getAccessibleDocument(id: number, userId: string) {
  const [doc] = await db
    .select()
    .from(isoDocuments)
    .where(and(eq(isoDocuments.id, id), documentAccess(userId)));
  return doc;
}

async function enrichDocuments<T extends typeof isoDocuments.$inferSelect>(docs: T[]) {
  const ids = Array.from(new Set(
    docs.flatMap((doc) => [doc.authorId, doc.userId, doc.reviewerId, doc.approverId]).filter(
      (id): id is string => Boolean(id),
    ),
  ));
  const profiles = ids.length
    ? await db.select({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    }).from(usersTable).where(inArray(usersTable.id, ids))
    : [];
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
  return docs.map((doc) => {
    const authorId = doc.authorId ?? doc.userId;
    const author = authorId ? profileById.get(authorId) : undefined;
    const reviewer = doc.reviewerId ? profileById.get(doc.reviewerId) : undefined;
    const approver = doc.approverId ? profileById.get(doc.approverId) : undefined;
    return {
      ...doc,
      authorId,
      authorName: author ? userDisplayName(author) : authorId,
      reviewerName: reviewer ? userDisplayName(reviewer) : (doc.reviewerId ?? doc.reviewer),
      approverName: approver ? userDisplayName(approver) : (doc.approverId ?? doc.approver),
    };
  });
}

async function enrichRevisions<T extends typeof documentRevisions.$inferSelect>(revisions: T[]) {
  const ids = Array.from(new Set(
    revisions.flatMap((revision) => [revision.actorId, revision.changedBy, revision.userId]).filter(
      (id): id is string => Boolean(id),
    ),
  ));
  const profiles = ids.length
    ? await db.select({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    }).from(usersTable).where(inArray(usersTable.id, ids))
    : [];
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
  return revisions.map((revision) => {
    const actorId = revision.actorId ?? revision.changedBy ?? revision.userId;
    const actor = actorId ? profileById.get(actorId) : undefined;
    return {
      ...revision,
      actorId,
      actorName: actor ? userDisplayName(actor) : actorId,
    };
  });
}

async function validateAssignee(
  assigneeId: unknown,
  role: Extract<TeamRole, "reviewer" | "approver">,
  authorId: string,
): Promise<string | null | undefined> {
  if (assigneeId === undefined) return undefined;
  if (assigneeId === null || assigneeId === "") return null;
  if (typeof assigneeId !== "string") {
    throw { status: 400, code: "INVALID_ASSIGNMENT", error: `${role}Id harus berupa identitas user` };
  }
  if (role === "approver" && assigneeId === authorId) {
    throw { status: 403, code: "SELF_APPROVAL", error: "Pembuat dokumen tidak boleh menjadi approver dokumennya sendiri" };
  }
  if (!(await hasActiveRole(authorId, assigneeId, role))) {
    throw {
      status: 400,
      code: "INVALID_ASSIGNMENT",
      error: `User yang dipilih belum memiliki role ${role}. Tambahkan user tersebut sebagai ${role} terlebih dahulu.`,
    };
  }
  return assigneeId;
}

function sendWorkflowError(res: Response, error: unknown, fallback: string): void {
  if (error && typeof error === "object" && "status" in error && "error" in error) {
    const workflowError = error as { status: number; code?: string; error: string };
    res.status(workflowError.status).json({
      success: false,
      error: workflowError.error,
      code: workflowError.code,
    });
    return;
  }
  res.status(500).json({ success: false, error: fallback });
}

router.get("/iso/team-members", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    await ensureTeamMember(userId, userId, "author");
    const members = await db
      .select({
        id: documentTeamMembers.id,
        teamOwnerId: documentTeamMembers.teamOwnerId,
        userId: documentTeamMembers.userId,
        role: documentTeamMembers.role,
        status: documentTeamMembers.status,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
      })
      .from(documentTeamMembers)
      .leftJoin(usersTable, eq(documentTeamMembers.userId, usersTable.id))
      .where(and(
        eq(documentTeamMembers.teamOwnerId, userId),
        eq(documentTeamMembers.status, "active"),
      ))
      .orderBy(documentTeamMembers.userId, documentTeamMembers.role);
    res.json({
      success: true,
      data: members.map((member) => ({
        ...member,
        name: userDisplayName({
          id: member.userId,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
        }),
      })),
      total: members.length,
    });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch document team members");
    res.status(500).json({ success: false, error: "Failed to fetch document team members" });
  }
});

router.post("/iso/team-members", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const memberId = typeof req.body?.userId === "string" ? req.body.userId : "";
  const memberEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const role = req.body?.role;
  if ((!memberId && !memberEmail) || !isTeamRole(role)) {
    res.status(400).json({ success: false, error: "userId atau email serta role author, reviewer, atau approver wajib diisi" });
    return;
  }
  try {
    const [user] = await db.select({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    }).from(usersTable).where(
      memberId
        ? eq(usersTable.id, memberId)
        : sql`lower(${usersTable.email}) = lower(${memberEmail})`,
    );
    if (!user) {
      res.status(404).json({ success: false, error: "Identitas user tidak ditemukan" });
      return;
    }
    const [member] = await db.insert(documentTeamMembers).values({
      teamOwnerId: userId,
      userId: user.id,
      role,
    }).onConflictDoUpdate({
      target: [documentTeamMembers.teamOwnerId, documentTeamMembers.userId, documentTeamMembers.role],
      set: { status: "active", updatedAt: new Date() },
    }).returning();
    res.status(201).json({
      success: true,
      data: {
        ...member,
        name: userDisplayName(user),
        email: user.email,
      },
    });
  } catch (error) {
    req.log.error({ error }, "Failed to assign document team role");
    res.status(500).json({ success: false, error: "Failed to assign document team role" });
  }
});

router.get("/iso/documents", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const conditions = [documentAccess(userId)];
    if (status) conditions.push(eq(isoDocuments.status, status));
    const docs = await db.select().from(isoDocuments).where(and(...conditions)).orderBy(desc(isoDocuments.updatedAt)).limit(100);
    res.json({ success: true, data: await enrichDocuments(docs), total: docs.length });
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
  if (req.body?.reviewer !== undefined || req.body?.approver !== undefined) {
    res.status(400).json({ success: false, code: "TEXT_ASSIGNMENT_NOT_ALLOWED", error: "Assignment harus menggunakan reviewerId dan approverId, bukan teks bebas" });
    return;
  }
  try {
    const body = req.body;
    await ensureTeamMember(userId, userId, "author");
    const reviewerId = await validateAssignee(body.reviewerId, "reviewer", userId);
    const approverId = await validateAssignee(body.approverId, "approver", userId);
    const doc = await db.transaction(async (tx) => {
      const [created] = await tx.insert(isoDocuments).values({
        authorId: userId,
        userId,
        title: body.title,
        type: body.type,
        category: body.category,
        isoStandard: body.isoStandard,
        content: body.content,
        status: "draft",
        reviewerId,
        approverId,
        reviewDueDate: body.reviewDueDate ? new Date(body.reviewDueDate) : undefined,
        changeSummary: body.changeSummary || "Dokumen dibuat",
      }).returning();
      if (!created) throw new Error("Document insert did not return a row");
      await tx.insert(documentRevisions).values({
        documentId: created.id,
        userId,
        version: created.version ?? 1,
        status: created.status ?? "draft",
        actorId: userId,
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
    res.status(201).json({ success: true, data: (await enrichDocuments([doc]))[0] });
  } catch (error) {
    req.log.error({ error }, "Failed to create document");
    sendWorkflowError(res, error, "Failed to create document");
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
    const doc = await getAccessibleDocument(id, userId);
    if (!doc) {
      res.status(404).json({ success: false, error: "Document not found" });
      return;
    }
    res.json({ success: true, data: (await enrichDocuments([doc]))[0] });
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
  if (req.body?.reviewer !== undefined || req.body?.approver !== undefined) {
    res.status(400).json({ success: false, code: "TEXT_ASSIGNMENT_NOT_ALLOWED", error: "Assignment harus menggunakan reviewerId dan approverId, bukan teks bebas" });
    return;
  }
  try {
    const [current] = await db.select().from(isoDocuments).where(eq(isoDocuments.id, id));
    if (!current) {
      res.status(404).json({ success: false, error: "Document not found" });
      return;
    }
    const authorId = current.authorId ?? current.userId;
    const isAuthor = authorId === userId;
    const nextStatus = req.body?.status ?? current.status ?? "draft";
    const isAssignedParticipant = isAuthor || current.reviewerId === userId || current.approverId === userId;
    if (!isAssignedParticipant && nextStatus !== "approved") {
      res.status(403).json({ success: false, code: "DOCUMENT_ACCESS_DENIED", error: "Anda tidak ditugaskan pada workflow dokumen ini" });
      return;
    }
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
    const hasDocumentFields = ["title", "type", "category", "isoStandard", "content", "reviewerId", "approverId", "reviewDueDate"]
      .some((field) => req.body?.[field] !== undefined);
    if (hasDocumentFields && !isAuthor) {
      res.status(403).json({
        success: false,
        code: "AUTHOR_ONLY",
        error: "Hanya pembuat dokumen yang dapat mengubah isi atau assignment dokumen",
      });
      return;
    }
    if (nextStatus === "review" && current.status !== "review" && !isAuthor) {
      res.status(403).json({ success: false, code: "AUTHOR_ONLY", error: "Hanya pembuat dokumen yang dapat mengajukan dokumen untuk ditinjau" });
      return;
    }
    if (nextStatus === "rejected" && current.status !== "rejected" && current.reviewerId !== userId) {
      res.status(403).json({ success: false, code: "REVIEW_NOT_ASSIGNED", error: "Anda bukan reviewer yang ditugaskan untuk dokumen ini" });
      return;
    }
    if (nextStatus === "rejected" && current.status !== "rejected" && (
      typeof req.body?.changeSummary !== "string" || !req.body.changeSummary.trim()
    )) {
      res.status(400).json({ success: false, code: "REJECTION_REASON_REQUIRED", error: "Alasan penolakan wajib diisi" });
      return;
    }
    if (nextStatus === "approved" && current.status !== "approved") {
      if (authorId === userId) {
        res.status(403).json({ success: false, code: "SELF_APPROVAL", error: "Approval ditolak: pembuat dokumen tidak boleh menyetujui dokumennya sendiri" });
        return;
      }
      if (current.approverId !== userId) {
        res.status(403).json({
          success: false,
          code: current.approverId ? "APPROVAL_NOT_ASSIGNED" : "APPROVER_REQUIRED",
          error: current.approverId
            ? "Approval ditolak: hanya approver yang ditugaskan yang dapat menyetujui dokumen ini"
            : "Approval ditolak: dokumen ini belum memiliki approver yang ditugaskan",
        });
        return;
      }
      if (!(await hasActiveRole(authorId ?? userId, userId, "approver"))) {
        res.status(403).json({ success: false, code: "APPROVER_ROLE_REQUIRED", error: "Approval ditolak: akun Anda tidak memiliki role approver aktif" });
        return;
      }
    }
    if (nextStatus === "draft" && current.status !== "draft" && !isAuthor) {
      res.status(403).json({ success: false, code: "AUTHOR_ONLY", error: "Hanya pembuat dokumen yang dapat mengembalikan dokumen ke draft" });
      return;
    }
    if (nextStatus === "review" && nextStatus !== current.status && (!current.reviewerId || !current.approverId)) {
      res.status(400).json({
        success: false,
        code: "ASSIGNMENTS_REQUIRED",
        error: "Reviewer dan approver harus ditugaskan sebelum dokumen diajukan untuk ditinjau",
      });
      return;
    }
    if (current.status === "review" && nextStatus === "rejected" && !(await hasActiveRole(authorId ?? userId, userId, "reviewer"))) {
      res.status(403).json({ success: false, code: "REVIEWER_ROLE_REQUIRED", error: "Penolakan ditolak: akun Anda tidak memiliki role reviewer aktif" });
      return;
    }
    const reviewerId = await validateAssignee(req.body?.reviewerId, "reviewer", authorId ?? userId);
    const approverId = await validateAssignee(req.body?.approverId, "approver", authorId ?? userId);
    const newVersion = current.status === "approved" && nextStatus === "draft" ? (current.version ?? 1) + 1 : current.version ?? 1;
    const doc = await db.transaction(async (tx) => {
      const [updated] = await tx.update(isoDocuments).set({
        authorId: authorId ?? userId,
        ...(isAuthor && req.body?.title !== undefined ? { title: String(req.body.title).trim() || current.title } : {}),
        ...(isAuthor && req.body?.type !== undefined ? { type: req.body.type } : {}),
        ...(isAuthor && req.body?.category !== undefined ? { category: req.body.category } : {}),
        ...(isAuthor && req.body?.isoStandard !== undefined ? { isoStandard: req.body.isoStandard } : {}),
        ...(isAuthor && req.body?.content !== undefined ? { content: req.body.content } : {}),
        ...(reviewerId !== undefined ? { reviewerId } : {}),
        ...(approverId !== undefined ? { approverId } : {}),
        ...(req.body?.reviewDueDate !== undefined ? { reviewDueDate: req.body.reviewDueDate ? new Date(req.body.reviewDueDate) : null } : {}),
        status: nextStatus,
        version: newVersion,
        reviewedAt: nextStatus === "review" || nextStatus === "rejected" ? new Date() : current.reviewedAt,
        approvedAt: nextStatus === "approved" ? new Date() : current.approvedAt,
        distributedAt: nextStatus === "approved" ? new Date() : current.distributedAt,
        changeSummary: req.body?.changeSummary || `Status diubah menjadi ${nextStatus}`,
        updatedAt: new Date(),
      }).where(and(eq(isoDocuments.id, id), documentAccess(userId))).returning();
      if (!updated) throw new Error("Document update did not return a row");
      await tx.insert(documentRevisions).values({
        documentId: updated.id,
        userId,
        version: updated.version ?? newVersion,
        status: updated.status ?? nextStatus,
        actorId: userId,
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
    res.json({ success: true, data: (await enrichDocuments([doc]))[0] });
  } catch (error) {
    req.log.error({ error }, "Failed to update document");
    sendWorkflowError(res, error, "Failed to update document");
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
    const document = await getAccessibleDocument(id, userId);
    if (!document) {
      res.status(404).json({ success: false, error: "Document not found" });
      return;
    }
    const revisions = await db.select().from(documentRevisions)
      .where(eq(documentRevisions.documentId, id))
      .orderBy(desc(documentRevisions.createdAt));
    const data = await enrichRevisions(revisions);
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

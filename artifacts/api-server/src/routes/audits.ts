import { Router, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { externalAudits, certifications, internalAudits, auditFindings, correctiveActions } from "@workspace/db";
import { and, desc, eq } from "drizzle-orm";

const router = Router();

function userIdOr401(req: Request, res: Response): string | null {
  if (!req.isAuthenticated()) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return null;
  }
  return req.user.id;
}

router.get("/audits/external", async (req, res) => {
  try {
    const audits = await db.select().from(externalAudits);
    const certs = await db.select().from(certifications);
    res.json({ audits: audits.length, certifications: certs.length, data: audits });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch external audits" });
  }
});

router.post("/audits/external", async (req, res) => {
  try {
    const body = req.body;
    const [audit] = await db.insert(externalAudits).values({
      certificationBody: body.certificationBody,
      scope: body.scope,
      type: body.type || "surveillance",
      status: body.status || "scheduled",
    }).returning();
    res.status(201).json(audit);
  } catch (error) {
    res.status(500).json({ error: "Failed to create external audit" });
  }
});

router.get("/audits/internal", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const audits = await db.select().from(internalAudits).where(eq(internalAudits.userId, userId));
    const findings = await db.select().from(auditFindings).where(eq(auditFindings.userId, userId));
    const actions = await db.select().from(correctiveActions).where(eq(correctiveActions.userId, userId));
    res.json({ success: true, audits: audits.length, findings: findings.length, actions: actions.length, data: audits });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch internal audits");
    res.status(500).json({ success: false, error: "Failed to fetch internal audits" });
  }
});

router.post("/audits/internal", async (req, res) => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const body = req.body;
    const [audit] = await db.insert(internalAudits).values({
      userId,
      scope: body.scope,
      auditor: body.auditor,
      status: body.status || "scheduled",
    }).returning();
    res.status(201).json({ success: true, data: audit });
  } catch (error) {
    res.status(500).json({ error: "Failed to create audit" });
  }
});

export default router;

import { Router } from "express";
import { db } from "@workspace/db";
import { externalAudits, certifications, internalAudits, auditFindings, correctiveActions } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

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
  try {
    const audits = await db.select().from(internalAudits);
    const findings = await db.select().from(auditFindings);
    const actions = await db.select().from(correctiveActions);
    res.json({ audits: audits.length, findings: findings.length, actions: actions.length, data: audits });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch internal audits" });
  }
});

router.post("/audits/internal", async (req, res) => {
  try {
    const body = req.body;
    const [audit] = await db.insert(internalAudits).values({
      scope: body.scope,
      auditor: body.auditor,
      status: body.status || "scheduled",
    }).returning();
    res.status(201).json(audit);
  } catch (error) {
    res.status(500).json({ error: "Failed to create audit" });
  }
});

export default router;

import { Router, type Request, type Response } from "express";
import { boundedRiskScore, classifyRisk, normalizeRiskStatus } from "@workspace/api-zod";
import { and, desc, eq, or } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  auditFindings,
  correctiveActions,
  incidents,
  kpiMeasurements,
  kpis,
  managementReviews,
  risks,
  vendors,
} from "@workspace/db";
import { canCloseFinding, normalizeFindingStatus } from "../lib/qmsPolicy";

const router = Router();

function userIdOr401(req: Request, res: Response): string | null {
  if (!req.isAuthenticated()) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return null;
  }
  return req.user.id;
}

function optionalDate(value: unknown): Date | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function requiredText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

async function ownedSource(
  userId: string,
  sourceType: string,
  sourceId: string,
): Promise<boolean> {
  const numericId = Number(sourceId);
  if (!Number.isInteger(numericId) || numericId <= 0) return false;

  if (sourceType === "risk") {
    const [source] = await db.select({ id: risks.id }).from(risks).where(and(eq(risks.id, numericId), eq(risks.userId, userId)));
    return Boolean(source);
  }
  if (sourceType === "finding") {
    const [source] = await db.select({ id: auditFindings.id }).from(auditFindings).where(and(eq(auditFindings.id, numericId), eq(auditFindings.userId, userId)));
    return Boolean(source);
  }
  if (sourceType === "incident") {
    const [source] = await db.select({ id: incidents.id }).from(incidents).where(and(eq(incidents.id, numericId), eq(incidents.userId, userId)));
    return Boolean(source);
  }
  if (sourceType === "vendor") {
    const [source] = await db.select({ id: vendors.id }).from(vendors).where(and(eq(vendors.id, numericId), eq(vendors.userId, userId)));
    return Boolean(source);
  }
  return false;
}

// Operational risk register
router.get("/qms/risks", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;

  try {
    const data = await db.select().from(risks)
      .where(eq(risks.userId, userId))
      .orderBy(desc(risks.updatedAt), desc(risks.createdAt));
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch QMS risks");
    res.status(500).json({ success: false, error: "Failed to fetch risks" });
  }
});

router.post("/qms/risks", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;

  const name = requiredText(req.body?.name);
  if (!name) {
    res.status(400).json({ success: false, error: "Risk name is required" });
    return;
  }

  try {
    const probability = boundedRiskScore(req.body?.probability);
    const impact = boundedRiskScore(req.body?.impact);
    const residualProbability = boundedRiskScore(req.body?.residualProbability, probability);
    const residualImpact = boundedRiskScore(req.body?.residualImpact, impact);
    const [risk] = await db.insert(risks).values({
      userId,
      code: `R-${Date.now().toString(36).toUpperCase()}`,
      name,
      description: req.body?.description,
      context: req.body?.context,
      standard: req.body?.standard,
      category: req.body?.category,
      probability,
      impact,
      riskLevel: classifyRisk(probability, impact),
      controls: req.body?.controls,
      owner: req.body?.owner,
      status: normalizeRiskStatus(req.body?.status),
      mitigation: req.body?.mitigation,
      dueDate: optionalDate(req.body?.dueDate),
      residualProbability,
      residualImpact,
      residualRiskLevel: classifyRisk(residualProbability, residualImpact),
    }).returning();
    res.status(201).json({ success: true, data: risk });
  } catch (error) {
    req.log.error({ error }, "Failed to create QMS risk");
    res.status(500).json({ success: false, error: "Failed to create risk" });
  }
});

router.patch("/qms/risks/:id", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ success: false, error: "Invalid risk id" });
    return;
  }

  try {
    const [current] = await db.select().from(risks).where(and(eq(risks.id, id), eq(risks.userId, userId)));
    if (!current) {
      res.status(404).json({ success: false, error: "Risk not found" });
      return;
    }
    const probability = req.body?.probability === undefined ? current.probability ?? 1 : boundedRiskScore(req.body.probability);
    const impact = req.body?.impact === undefined ? current.impact ?? 1 : boundedRiskScore(req.body.impact);
    const residualProbability = req.body?.residualProbability === undefined ? current.residualProbability ?? probability : boundedRiskScore(req.body.residualProbability);
    const residualImpact = req.body?.residualImpact === undefined ? current.residualImpact ?? impact : boundedRiskScore(req.body.residualImpact);
    const [risk] = await db.update(risks).set({
      ...(req.body?.name !== undefined ? { name: requiredText(req.body.name) ?? current.name } : {}),
      ...(req.body?.description !== undefined ? { description: req.body.description } : {}),
      ...(req.body?.context !== undefined ? { context: req.body.context } : {}),
      ...(req.body?.standard !== undefined ? { standard: req.body.standard } : {}),
      ...(req.body?.category !== undefined ? { category: req.body.category } : {}),
      probability,
      impact,
      riskLevel: classifyRisk(probability, impact),
      ...(req.body?.controls !== undefined ? { controls: req.body.controls } : {}),
      ...(req.body?.owner !== undefined ? { owner: req.body.owner } : {}),
      ...(req.body?.status !== undefined ? { status: normalizeRiskStatus(req.body.status, normalizeRiskStatus(current.status)) } : {}),
      ...(req.body?.mitigation !== undefined ? { mitigation: req.body.mitigation } : {}),
      ...(req.body?.dueDate !== undefined ? { dueDate: optionalDate(req.body.dueDate) ?? null } : {}),
      residualProbability,
      residualImpact,
      residualRiskLevel: classifyRisk(residualProbability, residualImpact),
      updatedAt: new Date(),
    }).where(and(eq(risks.id, id), eq(risks.userId, userId))).returning();
    res.json({ success: true, data: risk });
  } catch (error) {
    req.log.error({ error }, "Failed to update QMS risk");
    res.status(500).json({ success: false, error: "Failed to update risk" });
  }
});

// Audit findings
router.get("/qms/findings", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const data = await db.select().from(auditFindings)
      .where(eq(auditFindings.userId, userId))
      .orderBy(desc(auditFindings.createdAt));
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch findings");
    res.status(500).json({ success: false, error: "Failed to fetch findings" });
  }
});

router.post("/qms/findings", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const description = requiredText(req.body?.description);
  if (!description) {
    res.status(400).json({ success: false, error: "Finding description is required" });
    return;
  }
  try {
    const [finding] = await db.insert(auditFindings).values({
      userId,
      auditId: Number.isInteger(Number(req.body?.auditId)) ? Number(req.body.auditId) : undefined,
      description,
      category: req.body?.category,
      standard: req.body?.standard,
      context: req.body?.context,
      severity: req.body?.severity || "minor",
      status: "open",
      dueDate: optionalDate(req.body?.dueDate),
    }).returning();
    res.status(201).json({ success: true, data: finding });
  } catch (error) {
    req.log.error({ error }, "Failed to create finding");
    res.status(500).json({ success: false, error: "Failed to create finding" });
  }
});

router.patch("/qms/findings/:id", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ success: false, error: "Invalid finding id" });
    return;
  }
  try {
    const [current] = await db.select().from(auditFindings).where(
      and(eq(auditFindings.id, id), eq(auditFindings.userId, userId)),
    );
    if (!current) {
      res.status(404).json({ success: false, error: "Finding not found" });
      return;
    }

    const nextStatus = req.body?.status === undefined
      ? normalizeFindingStatus(current.status)
      : normalizeFindingStatus(req.body.status, normalizeFindingStatus(current.status));

    if (nextStatus === "closed" && current.status !== "closed") {
      const linkedActions = await db.select({
        status: correctiveActions.status,
        evidence: correctiveActions.evidence,
        effectivenessCheck: correctiveActions.effectivenessCheck,
        effectivenessStatus: correctiveActions.effectivenessStatus,
      }).from(correctiveActions).where(
        and(
          eq(correctiveActions.userId, userId),
          or(
            eq(correctiveActions.findingId, id),
            and(
              eq(correctiveActions.sourceType, "finding"),
              eq(correctiveActions.sourceId, String(id)),
            ),
          ),
        ),
      );

      if (!canCloseFinding(linkedActions)) {
        res.status(409).json({
          success: false,
          error: "Finding can only be closed after every linked CAPA is completed with evidence and verified effectiveness",
          code: "CAPA_VERIFICATION_REQUIRED",
        });
        return;
      }
    }

    const [finding] = await db.update(auditFindings).set({
      ...(req.body?.status !== undefined ? { status: nextStatus } : {}),
      ...(req.body?.dueDate !== undefined ? { dueDate: optionalDate(req.body.dueDate) ?? null } : {}),
      ...(req.body?.severity !== undefined ? { severity: req.body.severity } : {}),
      ...(req.body?.description !== undefined ? { description: String(req.body.description).trim() } : {}),
      ...(req.body?.status !== undefined ? { closedAt: nextStatus === "closed" ? new Date() : null } : {}),
    }).where(and(eq(auditFindings.id, id), eq(auditFindings.userId, userId))).returning();
    if (!finding) {
      res.status(404).json({ success: false, error: "Finding not found" });
      return;
    }
    res.json({ success: true, data: finding });
  } catch (error) {
    req.log.error({ error }, "Failed to update finding");
    res.status(500).json({ success: false, error: "Failed to update finding" });
  }
});

// CAPA / corrective actions
router.get("/qms/actions", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const data = await db.select().from(correctiveActions)
      .where(eq(correctiveActions.userId, userId))
      .orderBy(desc(correctiveActions.createdAt));
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch corrective actions");
    res.status(500).json({ success: false, error: "Failed to fetch corrective actions" });
  }
});

router.post("/qms/actions", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const action = requiredText(req.body?.action);
  if (!action) {
    res.status(400).json({ success: false, error: "Corrective action is required" });
    return;
  }
  const sourceType = requiredText(req.body?.sourceType);
  const sourceId = req.body?.sourceId === undefined || req.body?.sourceId === "" ? undefined : String(req.body.sourceId);
  if (sourceType && (!sourceId || !(await ownedSource(userId, sourceType, sourceId)))) {
    res.status(400).json({ success: false, error: "Source record is not available to this user" });
    return;
  }
  try {
    const findingId = req.body?.findingId === undefined ? undefined : Number(req.body.findingId);
    if (findingId !== undefined) {
      const [finding] = await db.select({ id: auditFindings.id }).from(auditFindings).where(and(eq(auditFindings.id, findingId), eq(auditFindings.userId, userId)));
      if (!finding) {
        res.status(400).json({ success: false, error: "Finding is not available to this user" });
        return;
      }
    }
    const [created] = await db.insert(correctiveActions).values({
      userId,
      findingId,
      sourceType,
      sourceId,
      action,
      responsible: req.body?.responsible,
      dueDate: optionalDate(req.body?.dueDate),
      status: req.body?.status || "pending",
      evidence: req.body?.evidence,
      effectivenessCheck: req.body?.effectivenessCheck,
      effectivenessStatus: req.body?.effectivenessStatus || "pending",
    }).returning();
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    req.log.error({ error }, "Failed to create corrective action");
    res.status(500).json({ success: false, error: "Failed to create corrective action" });
  }
});

router.patch("/qms/actions/:id", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ success: false, error: "Invalid action id" });
    return;
  }
  try {
    const status = req.body?.status;
    const effectivenessStatus = req.body?.effectivenessStatus;
    const [updated] = await db.update(correctiveActions).set({
      ...(req.body?.action !== undefined ? { action: String(req.body.action).trim() } : {}),
      ...(req.body?.responsible !== undefined ? { responsible: req.body.responsible } : {}),
      ...(req.body?.dueDate !== undefined ? { dueDate: optionalDate(req.body.dueDate) ?? null } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(req.body?.evidence !== undefined ? { evidence: req.body.evidence } : {}),
      ...(req.body?.effectivenessCheck !== undefined ? { effectivenessCheck: req.body.effectivenessCheck } : {}),
      ...(effectivenessStatus !== undefined ? { effectivenessStatus } : {}),
      ...(status === "completed" ? { completedAt: new Date() } : {}),
      ...(effectivenessStatus === "verified" ? { verifiedAt: new Date() } : {}),
    }).where(and(eq(correctiveActions.id, id), eq(correctiveActions.userId, userId))).returning();
    if (!updated) {
      res.status(404).json({ success: false, error: "Corrective action not found" });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    req.log.error({ error }, "Failed to update corrective action");
    res.status(500).json({ success: false, error: "Failed to update corrective action" });
  }
});

// KPI register and management review
router.get("/qms/kpis", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const definitions = await db.select().from(kpis).where(eq(kpis.userId, userId)).orderBy(desc(kpis.updatedAt));
    const data = await Promise.all(definitions.map(async (kpi) => {
      const [latest] = await db.select().from(kpiMeasurements)
        .where(and(eq(kpiMeasurements.kpiId, kpi.id), eq(kpiMeasurements.userId, userId)))
        .orderBy(desc(kpiMeasurements.createdAt)).limit(1);
      const actual = latest?.actual ?? null;
      const target = Number(kpi.target);
      const achievement = actual === null ? null : kpi.direction === "lower_better"
        ? actual === 0 ? 100 : (target / actual) * 100
        : target === 0 ? 0 : (actual / target) * 100;
      return { ...kpi, latestMeasurement: latest ?? null, actual, achievement, status: actual === null ? "no_data" : (achievement ?? 0) >= 100 ? "on_track" : "below_target" };
    }));
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch KPIs");
    res.status(500).json({ success: false, error: "Failed to fetch KPIs" });
  }
});

router.post("/qms/kpis", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const name = requiredText(req.body?.name);
  const category = requiredText(req.body?.category);
  const target = Number(req.body?.target);
  if (!name || !category || !Number.isFinite(target)) {
    res.status(400).json({ success: false, error: "KPI name, category, and numeric target are required" });
    return;
  }
  try {
    const [kpi] = await db.insert(kpis).values({
      userId,
      code: `KPI-${Date.now().toString(36).toUpperCase()}`,
      name,
      description: req.body?.description,
      category,
      unit: req.body?.unit,
      target,
      direction: req.body?.direction === "lower_better" ? "lower_better" : "higher_better",
      owner: req.body?.owner,
    }).returning();
    res.status(201).json({ success: true, data: kpi });
  } catch (error) {
    req.log.error({ error }, "Failed to create KPI");
    res.status(500).json({ success: false, error: "Failed to create KPI" });
  }
});

router.post("/qms/kpis/:id/measurements", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const kpiId = Number(req.params.id);
  const actual = Number(req.body?.actual);
  if (!Number.isInteger(kpiId) || !Number.isFinite(actual) || !requiredText(req.body?.period)) {
    res.status(400).json({ success: false, error: "KPI, period, and numeric actual value are required" });
    return;
  }
  try {
    const [kpi] = await db.select({ id: kpis.id }).from(kpis).where(and(eq(kpis.id, kpiId), eq(kpis.userId, userId)));
    if (!kpi) {
      res.status(404).json({ success: false, error: "KPI not found" });
      return;
    }
    const [measurement] = await db.insert(kpiMeasurements).values({
      kpiId,
      userId,
      period: String(req.body.period).trim(),
      actual,
      notes: req.body?.notes,
      recordedBy: userId,
    }).returning();
    res.status(201).json({ success: true, data: measurement });
  } catch (error) {
    req.log.error({ error }, "Failed to record KPI measurement");
    res.status(500).json({ success: false, error: "Failed to record KPI measurement" });
  }
});

router.get("/qms/management-reviews", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  try {
    const data = await db.select().from(managementReviews).where(eq(managementReviews.userId, userId)).orderBy(desc(managementReviews.createdAt));
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch management reviews");
    res.status(500).json({ success: false, error: "Failed to fetch management reviews" });
  }
});

router.post("/qms/management-reviews", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;
  const title = requiredText(req.body?.title);
  if (!title) {
    res.status(400).json({ success: false, error: "Review title is required" });
    return;
  }
  try {
    const [review] = await db.insert(managementReviews).values({
      userId,
      title,
      period: req.body?.period,
      status: req.body?.status || "planned",
      notes: req.body?.notes,
    }).returning();
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    req.log.error({ error }, "Failed to create management review");
    res.status(500).json({ success: false, error: "Failed to create management review" });
  }
});

export default router;
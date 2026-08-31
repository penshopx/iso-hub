import { Router, type Request, type Response } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  consultingProjects,
  readinessAssessments,
} from "@workspace/db";

const router = Router();

const NEED_TYPES = new Set(["tender", "proyek", "audit"]);
const STANDARD_IDS = new Set([
  "iso9001",
  "iso14001",
  "iso45001",
  "iso39001",
]);

function userIdOr401(req: Request, res: Response): string | null {
  if (!req.isAuthenticated()) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return null;
  }
  return req.user.id;
}

function requiredText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function stringArray(value: unknown, allowed?: Set<string>): string[] | null {
  if (!Array.isArray(value) || value.length > 100) return null;
  const values = value.filter((item): item is string => typeof item === "string");
  if (values.length !== value.length || new Set(values).size !== values.length) {
    return null;
  }
  if (allowed && values.some((item) => !allowed.has(item))) return null;
  return values;
}

function normalizeReadinessBody(body: unknown): {
  needType: string;
  selectedStandards: string[];
  checkedItems: string[];
} | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;
  const needType = typeof input.needType === "string" ? input.needType : "";
  const selectedStandards = stringArray(input.selectedStandards, STANDARD_IDS);
  const checkedItems = stringArray(input.checkedItems);

  if (!NEED_TYPES.has(needType) || !selectedStandards || !checkedItems) {
    return null;
  }
  return { needType, selectedStandards, checkedItems };
}

router.get("/v1/projects", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;

  try {
    const rows = await db
      .select({
        project: consultingProjects,
        readiness: readinessAssessments,
      })
      .from(consultingProjects)
      .leftJoin(
        readinessAssessments,
        eq(readinessAssessments.projectId, consultingProjects.id),
      )
      .where(eq(consultingProjects.userId, userId))
      .orderBy(desc(consultingProjects.updatedAt), desc(consultingProjects.createdAt));

    const data = rows.map(({ project, readiness }) => ({
      ...project,
      readiness: readiness
        ? {
            id: readiness.id,
            projectId: readiness.projectId,
            needType: readiness.needType,
            selectedStandards: readiness.selectedStandards,
            checkedItems: readiness.checkedItems,
            updatedAt: readiness.updatedAt,
          }
        : null,
    }));
    res.json({ success: true, data });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch projects");
    res.status(500).json({ success: false, error: "Failed to fetch projects" });
  }
});

router.post("/v1/projects", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;

  const name = requiredText(req.body?.name);
  const client = requiredText(req.body?.client);
  const isoStandard = requiredText(req.body?.isoStandard);
  if (!name || !client || !isoStandard) {
    res.status(400).json({
      success: false,
      error: "Project name, client, and ISO standard are required",
    });
    return;
  }

  try {
    const [project] = await db
      .insert(consultingProjects)
      .values({
        userId,
        name,
        client,
        isoStandard,
        description: requiredText(req.body?.description) ?? undefined,
        status: "planning",
      })
      .returning();
    res.status(201).json({ success: true, data: { ...project, readiness: null } });
  } catch (error) {
    req.log.error({ error }, "Failed to create project");
    res.status(500).json({ success: false, error: "Failed to create project" });
  }
});

router.get("/v1/projects/:id/readiness", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;

  const projectId = Number(req.params.id);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    res.status(400).json({ success: false, error: "Invalid project id" });
    return;
  }

  try {
    const [project] = await db
      .select({ id: consultingProjects.id })
      .from(consultingProjects)
      .where(
        and(
          eq(consultingProjects.id, projectId),
          eq(consultingProjects.userId, userId),
        ),
      );
    if (!project) {
      res.status(404).json({ success: false, error: "Project not found" });
      return;
    }

    const [readiness] = await db
      .select()
      .from(readinessAssessments)
      .where(eq(readinessAssessments.projectId, projectId));
    res.json({ success: true, data: readiness ?? null });
  } catch (error) {
    req.log.error({ error }, "Failed to fetch project readiness");
    res.status(500).json({
      success: false,
      error: "Failed to fetch project readiness",
    });
  }
});

router.put("/v1/projects/:id/readiness", async (req, res): Promise<void> => {
  const userId = userIdOr401(req, res);
  if (!userId) return;

  const projectId = Number(req.params.id);
  const body = normalizeReadinessBody(req.body);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    res.status(400).json({ success: false, error: "Invalid project id" });
    return;
  }
  if (!body) {
    res.status(400).json({
      success: false,
      error: "Need type, selected standards, and checklist items are required",
    });
    return;
  }

  try {
    const [project] = await db
      .select({ id: consultingProjects.id })
      .from(consultingProjects)
      .where(
        and(
          eq(consultingProjects.id, projectId),
          eq(consultingProjects.userId, userId),
        ),
      );
    if (!project) {
      res.status(404).json({ success: false, error: "Project not found" });
      return;
    }

    const [readiness] = await db
      .insert(readinessAssessments)
      .values({
        projectId,
        needType: body.needType,
        selectedStandards: body.selectedStandards,
        checkedItems: body.checkedItems,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: readinessAssessments.projectId,
        set: {
          needType: body.needType,
          selectedStandards: body.selectedStandards,
          checkedItems: body.checkedItems,
          updatedAt: new Date(),
        },
      })
      .returning();
    res.json({ success: true, data: readiness });
  } catch (error) {
    req.log.error({ error }, "Failed to save project readiness");
    res.status(500).json({
      success: false,
      error: "Failed to save project readiness",
    });
  }
});

export default router;
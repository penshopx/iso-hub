import {
  auditFindings,
  correctiveActions,
  db,
  documentRevisions,
  incidents,
  internalAudits,
  isoDocuments,
  risks,
  usersTable,
} from "@workspace/db";
import { eq, inArray, isNull, sql } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";

const QMS_PATH_PREFIXES = [
  "/api/iso/documents",
  "/api/iso/incidents",
  "/api/audits",
  "/api/qms",
  "/api/v1/risks",
];

let legacyOwnershipResolved = false;

class LegacyOwnershipConflictError extends Error {
  constructor() {
    super(
      "Legacy QMS records need an explicit owner. Set LEGACY_QMS_OWNER_USER_ID to an existing authenticated user ID before serving QMS routes.",
    );
  }
}

function isQmsPath(path: string): boolean {
  return QMS_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
}

async function claimLegacyRecords(): Promise<void> {
  if (legacyOwnershipResolved) return;

  await db.transaction(async (tx) => {
    await tx.execute(sql`SELECT pg_advisory_xact_lock(472938105)`);

    const legacyDocuments = await tx
      .select()
      .from(isoDocuments)
      .where(isNull(isoDocuments.userId));
    const legacyRisks = await tx
      .select({ id: risks.id })
      .from(risks)
      .where(isNull(risks.userId))
      .limit(1);
    const legacyIncidents = await tx
      .select({ id: incidents.id })
      .from(incidents)
      .where(isNull(incidents.userId))
      .limit(1);
    const legacyAudits = await tx
      .select({ id: internalAudits.id })
      .from(internalAudits)
      .where(isNull(internalAudits.userId))
      .limit(1);
    const legacyFindings = await tx
      .select({ id: auditFindings.id })
      .from(auditFindings)
      .where(isNull(auditFindings.userId))
      .limit(1);
    const legacyActions = await tx
      .select({ id: correctiveActions.id })
      .from(correctiveActions)
      .where(isNull(correctiveActions.userId))
      .limit(1);

    const hasLegacyRecords =
      legacyDocuments.length > 0 ||
      legacyRisks.length > 0 ||
      legacyIncidents.length > 0 ||
      legacyAudits.length > 0 ||
      legacyFindings.length > 0 ||
      legacyActions.length > 0;

    await tx.update(risks).set({ status: "open" }).where(inArray(risks.status, ["Open"]));
    await tx.update(risks).set({ status: "mitigating" }).where(inArray(risks.status, ["Mitigasi", "Mitigating"]));
    await tx.update(risks).set({ status: "closed" }).where(inArray(risks.status, ["Closed"]));

    if (!hasLegacyRecords) return;

    const configuredOwnerId = process.env.LEGACY_QMS_OWNER_USER_ID?.trim();
    let ownerId: string;

    if (configuredOwnerId) {
      const [configuredOwner] = await tx
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(eq(usersTable.id, configuredOwnerId))
        .limit(1);
      if (!configuredOwner) throw new LegacyOwnershipConflictError();
      ownerId = configuredOwner.id;
    } else {
      const authUsers = await tx
        .select({ id: usersTable.id })
        .from(usersTable)
        .limit(2);
      if (authUsers.length !== 1) throw new LegacyOwnershipConflictError();
      ownerId = authUsers[0].id;
    }

    await tx.update(isoDocuments).set({ userId: ownerId }).where(isNull(isoDocuments.userId));
    await tx.update(risks).set({ userId: ownerId }).where(isNull(risks.userId));
    await tx.update(incidents).set({ userId: ownerId }).where(isNull(incidents.userId));
    await tx.update(internalAudits).set({ userId: ownerId }).where(isNull(internalAudits.userId));
    await tx.update(auditFindings).set({ userId: ownerId }).where(isNull(auditFindings.userId));
    await tx.update(correctiveActions).set({ userId: ownerId }).where(isNull(correctiveActions.userId));

    if (legacyDocuments.length > 0) {
      await tx.insert(documentRevisions).values(
        legacyDocuments.map((document) => ({
          documentId: document.id,
          userId: ownerId,
          version: document.version ?? 1,
          status: document.status ?? "draft",
          changedBy: ownerId,
          changeSummary: "Baseline riwayat dari data sebelum workflow revisi",
          content: document.content,
        })),
      );
    }
  });

  legacyOwnershipResolved = true;
}

export async function legacyQmsOwnershipMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.isAuthenticated() || !isQmsPath(req.path)) {
    next();
    return;
  }

  try {
    await claimLegacyRecords();
    next();
  } catch (error) {
    if (error instanceof LegacyOwnershipConflictError) {
      req.log.error({ error }, "Legacy QMS ownership requires explicit mapping");
      res.status(409).json({
        success: false,
        error: error.message,
        code: "LEGACY_QMS_OWNER_REQUIRED",
      });
      return;
    }

    req.log.error({ error }, "Failed to resolve legacy QMS ownership");
    res.status(500).json({
      success: false,
      error: "Failed to resolve legacy QMS ownership",
    });
  }
}
export const FINDING_STATUSES = ["open", "closed"] as const;

export type FindingStatus = (typeof FINDING_STATUSES)[number];

export interface CapaClosureState {
  status: string | null;
  evidence: string | null;
  effectivenessCheck: string | null;
  effectivenessStatus: string | null;
}

export function normalizeFindingStatus(
  value: unknown,
  fallback: FindingStatus = "open",
): FindingStatus {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "open" || normalized === "closed"
    ? normalized
    : fallback;
}

export function canCloseFinding(actions: CapaClosureState[]): boolean {
  return (
    actions.length > 0 &&
    actions.every(
      (action) =>
        action.status === "completed" &&
        action.effectivenessStatus === "verified" &&
        Boolean(action.evidence?.trim()) &&
        Boolean(action.effectivenessCheck?.trim()),
    )
  );
}
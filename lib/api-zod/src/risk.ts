export const RISK_STATUSES = ["open", "mitigating", "closed"] as const;

export type RiskStatus = (typeof RISK_STATUSES)[number];
export type RiskLevel = "low" | "medium" | "high" | "critical";

export function boundedRiskScore(value: unknown, fallback = 1): number {
  const score = Number(value);
  return Number.isInteger(score) && score >= 1 && score <= 5 ? score : fallback;
}

export function classifyRisk(probability: number, impact: number): RiskLevel {
  const score = probability * impact;
  if (score >= 16) return "critical";
  if (score >= 10) return "high";
  if (score >= 5) return "medium";
  return "low";
}

export function normalizeRiskStatus(
  value: unknown,
  fallback: RiskStatus = "open",
): RiskStatus {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase();
  if (normalized === "open") return "open";
  if (normalized === "mitigasi" || normalized === "mitigating") {
    return "mitigating";
  }
  if (normalized === "closed") return "closed";
  return fallback;
}
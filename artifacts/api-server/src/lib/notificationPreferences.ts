export type ComplianceAlertType =
  | "critical_risk"
  | "audit_deadline"
  | "kpi_below_target";

export interface NotificationPreferenceFlags {
  criticalRiskAlerts: boolean;
  auditReminders: boolean;
  kpiWarnings: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferenceFlags = {
  criticalRiskAlerts: true,
  auditReminders: true,
  kpiWarnings: true,
};

export function allowsComplianceAlert(
  preferences: NotificationPreferenceFlags,
  alertType: ComplianceAlertType,
): boolean {
  switch (alertType) {
    case "critical_risk":
      return preferences.criticalRiskAlerts;
    case "audit_deadline":
      return preferences.auditReminders;
    case "kpi_below_target":
      return preferences.kpiWarnings;
  }
}

export function filterEligiblePushTokens<
  T extends NotificationPreferenceFlags,
>(tokens: T[], alertType: ComplianceAlertType): T[] {
  return tokens.filter(token => allowsComplianceAlert(token, alertType));
}
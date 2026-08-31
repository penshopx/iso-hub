import assert from "node:assert/strict";
import {
  allowsComplianceAlert,
  DEFAULT_NOTIFICATION_PREFERENCES,
  filterEligiblePushTokens,
} from "../artifacts/api-server/src/lib/notificationPreferences";

assert.equal(
  allowsComplianceAlert(DEFAULT_NOTIFICATION_PREFERENCES, "critical_risk"),
  true,
);
assert.equal(
  allowsComplianceAlert(DEFAULT_NOTIFICATION_PREFERENCES, "audit_deadline"),
  true,
);
assert.equal(
  allowsComplianceAlert(DEFAULT_NOTIFICATION_PREFERENCES, "kpi_below_target"),
  true,
);

const optedOutOfCritical = {
  ...DEFAULT_NOTIFICATION_PREFERENCES,
  criticalRiskAlerts: false,
};
assert.equal(allowsComplianceAlert(optedOutOfCritical, "critical_risk"), false);
assert.equal(allowsComplianceAlert(optedOutOfCritical, "audit_deadline"), true);

const optedOutOfAudit = {
  ...DEFAULT_NOTIFICATION_PREFERENCES,
  auditReminders: false,
};
assert.equal(allowsComplianceAlert(optedOutOfAudit, "audit_deadline"), false);
assert.equal(allowsComplianceAlert(optedOutOfAudit, "critical_risk"), true);

const optedOutOfKpi = {
  ...DEFAULT_NOTIFICATION_PREFERENCES,
  kpiWarnings: false,
};
assert.equal(allowsComplianceAlert(optedOutOfKpi, "kpi_below_target"), false);

const deviceTokens = [
  {
    token: "device-critical-off",
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    criticalRiskAlerts: false,
  },
  {
    token: "device-all-on",
    ...DEFAULT_NOTIFICATION_PREFERENCES,
  },
  {
    token: "device-audit-off",
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    auditReminders: false,
  },
];

assert.deepEqual(
  filterEligiblePushTokens(deviceTokens, "critical_risk").map(row => row.token),
  ["device-all-on", "device-audit-off"],
);
assert.deepEqual(
  filterEligiblePushTokens(deviceTokens, "audit_deadline").map(row => row.token),
  ["device-critical-off", "device-all-on"],
);

console.log("Notification preference rules passed.");
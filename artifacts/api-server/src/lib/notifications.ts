import {
  auditFindings,
  correctiveActions,
  db,
  notificationDeliveries,
  pool,
  pushTokens,
  risks,
} from "@workspace/db";
import {
  and,
  eq,
  inArray,
  isNotNull,
  isNull,
  lte,
  notInArray,
  or,
  sql,
} from "drizzle-orm";
import crypto from "node:crypto";
import {
  allowsComplianceAlert,
  type ComplianceAlertType,
  DEFAULT_NOTIFICATION_PREFERENCES,
  filterEligiblePushTokens,
  type NotificationPreferenceFlags,
} from "./notificationPreferences";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";
const DEFAULT_INTERVAL_MS = 15 * 60 * 1000;
const DEADLINE_WINDOW_MS = 24 * 60 * 60 * 1000;
const CLAIM_LEASE_MS = 10 * 60 * 1000;
const EXPO_TOKEN_PATTERN = /^(?:Expo|Exponent)PushToken\[[^\]]+\]$/;
const EXPO_CHUNK_SIZE = 100;
const EXPO_REQUEST_TIMEOUT_MS = 30_000;
const COMPLIANCE_JOB_LOCK_ID = 13_013_001;

export interface RegisterPushTokenInput {
  token: string;
  platform: "ios" | "android";
  deviceId?: string;
  preferences?: NotificationPreferenceFlags;
}

interface ComplianceAlert {
  alertKey: string;
  alertType: ComplianceAlertType;
  entityId: number;
  userId: string;
  title: string;
  body: string;
  data: Record<string, string | number>;
}

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data: Record<string, string | number>;
  sound: "default";
  priority: "high";
  channelId: "compliance-alerts";
  alertKey: string;
}

interface ExpoTicket {
  status?: string;
  details?: {
    error?: string;
  };
}

export function isValidExpoPushToken(token: unknown): token is string {
  return typeof token === "string" && EXPO_TOKEN_PATTERN.test(token);
}

export async function registerPushToken(
  userId: string,
  input: RegisterPushTokenInput,
): Promise<void> {
  const preferences = input.preferences ?? DEFAULT_NOTIFICATION_PREFERENCES;
  await db
    .insert(pushTokens)
    .values({
      userId,
      token: input.token,
      platform: input.platform,
      deviceId: input.deviceId,
      ...preferences,
      updatedAt: new Date(),
      lastUsedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: pushTokens.token,
      set: {
        userId,
        platform: input.platform,
        deviceId: input.deviceId,
        ...(input.preferences ?? {}),
        updatedAt: new Date(),
        lastUsedAt: new Date(),
      },
    });
}

export async function updatePushTokenPreferences(
  userId: string,
  token: string,
  preferences: NotificationPreferenceFlags,
): Promise<boolean> {
  const updated = await db
    .update(pushTokens)
    .set({
      ...preferences,
      updatedAt: new Date(),
      lastUsedAt: new Date(),
    })
    .where(and(eq(pushTokens.userId, userId), eq(pushTokens.token, token)))
    .returning({ id: pushTokens.id });
  return updated.length > 0;
}

export async function unregisterPushToken(
  userId: string,
  token: string,
): Promise<void> {
  await db
    .delete(pushTokens)
    .where(and(eq(pushTokens.userId, userId), eq(pushTokens.token, token)));
}

async function sendExpoPushMessages(
  messages: ExpoPushMessage[],
): Promise<{ deliveredAlertKeys: Set<string>; tokensRemoved: number }> {
  const deliveredAlertKeys = new Set<string>();
  let tokensRemoved = 0;

  for (let offset = 0; offset < messages.length; offset += EXPO_CHUNK_SIZE) {
    const chunk = messages.slice(offset, offset + EXPO_CHUNK_SIZE);
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(EXPO_REQUEST_TIMEOUT_MS),
      body: JSON.stringify(
        chunk.map(({ alertKey: _alertKey, ...message }) => message),
      ),
    });

    if (!response.ok) {
      throw new Error(`Expo push service returned HTTP ${response.status}`);
    }

    const payload = (await response.json()) as { data?: ExpoTicket[] };
    const tickets = Array.isArray(payload.data) ? payload.data : [];
    const invalidTokens: string[] = [];

    tickets.forEach((ticket, index) => {
      const message = chunk[index];
      if (!message) return;

      if (ticket.status === "ok") {
        deliveredAlertKeys.add(message.alertKey);
      } else if (ticket.details?.error === "DeviceNotRegistered") {
        invalidTokens.push(message.to);
      }
    });

    if (invalidTokens.length > 0) {
      await db.delete(pushTokens).where(inArray(pushTokens.token, invalidTokens));
      tokensRemoved += invalidTokens.length;
    }
  }

  return { deliveredAlertKeys, tokensRemoved };
}

async function findComplianceAlerts(now: Date): Promise<ComplianceAlert[]> {
  const deadline = new Date(now.getTime() + DEADLINE_WINDOW_MS);
  const alerts: ComplianceAlert[] = [];

  const criticalRisks = await db
    .select({
      id: risks.id,
      userId: risks.userId,
      name: risks.name,
      updatedAt: risks.updatedAt,
    })
    .from(risks)
    .where(and(
      eq(risks.riskLevel, "critical"),
      isNotNull(risks.userId),
      or(isNull(risks.status), notInArray(risks.status, ["closed", "completed"])),
    ));

  for (const risk of criticalRisks) {
    if (!risk.userId) continue;
    alerts.push({
      alertKey: `critical-risk:${risk.id}:${risk.updatedAt?.toISOString() ?? "current"}`,
      alertType: "critical_risk",
      entityId: risk.id,
      userId: risk.userId,
      title: "Risiko Kritis Memerlukan Tindakan",
      body: `"${risk.name}" diklasifikasikan sebagai risiko KRITIS. Tindakan segera diperlukan.`,
      data: { type: "critical_risk", riskId: risk.id },
    });
  }

  const pendingFindings = await db
    .select({
      id: auditFindings.id,
      userId: auditFindings.userId,
      description: auditFindings.description,
      dueDate: auditFindings.dueDate,
    })
    .from(auditFindings)
    .where(and(
      isNotNull(auditFindings.userId),
      isNotNull(auditFindings.dueDate),
      lte(auditFindings.dueDate, deadline),
      or(
        isNull(auditFindings.status),
        notInArray(auditFindings.status, ["closed", "completed"]),
      ),
    ));

  for (const finding of pendingFindings) {
    if (!finding.userId || !finding.dueDate) continue;
    alerts.push({
      alertKey: `audit-finding-deadline:${finding.id}:${finding.dueDate.toISOString()}`,
      alertType: "audit_deadline",
      entityId: finding.id,
      userId: finding.userId,
      title: "Tenggat Audit Mendekat",
      body: `Temuan audit "${finding.description}" memiliki tenggat ${finding.dueDate.toLocaleDateString("id-ID")}.`,
      data: { type: "audit_deadline", findingId: finding.id },
    });
  }

  const pendingActions = await db
    .select({
      id: correctiveActions.id,
      userId: correctiveActions.userId,
      action: correctiveActions.action,
      dueDate: correctiveActions.dueDate,
    })
    .from(correctiveActions)
    .where(and(
      isNotNull(correctiveActions.userId),
      isNotNull(correctiveActions.dueDate),
      lte(correctiveActions.dueDate, deadline),
      or(
        isNull(correctiveActions.status),
        notInArray(correctiveActions.status, ["closed", "completed"]),
      ),
    ));

  for (const action of pendingActions) {
    if (!action.userId || !action.dueDate) continue;
    alerts.push({
      alertKey: `corrective-action-deadline:${action.id}:${action.dueDate.toISOString()}`,
      alertType: "audit_deadline",
      entityId: action.id,
      userId: action.userId,
      title: "Tenggat Tindakan Korektif Mendekat",
      body: `Tindakan korektif "${action.action}" memiliki tenggat ${action.dueDate.toLocaleDateString("id-ID")}.`,
      data: { type: "audit_deadline", correctiveActionId: action.id },
    });
  }

  return alerts;
}

export interface ComplianceNotificationJobResult {
  alertsFound: number;
  alertsSent: number;
  tokensRemoved: number;
}

async function claimAlerts(
  alerts: ComplianceAlert[],
  now: Date,
): Promise<{ alerts: ComplianceAlert[]; claimId: string }> {
  const claimId = crypto.randomUUID();
  if (alerts.length === 0) return { alerts: [], claimId };

  const inserted = await db
    .insert(notificationDeliveries)
    .values(alerts.map(alert => ({
      userId: alert.userId,
      alertKey: alert.alertKey,
      alertType: alert.alertType,
      entityId: alert.entityId,
      status: "processing",
      claimId,
      claimedAt: now,
      attempts: 1,
    })))
    .onConflictDoNothing({ target: notificationDeliveries.alertKey })
    .returning({ alertKey: notificationDeliveries.alertKey });

  const staleBefore = new Date(now.getTime() - CLAIM_LEASE_MS);
  const reclaimed = await db
    .update(notificationDeliveries)
    .set({
      status: "processing",
      claimId,
      claimedAt: now,
      attempts: sql`${notificationDeliveries.attempts} + 1`,
      lastError: null,
    })
    .where(and(
      inArray(notificationDeliveries.alertKey, alerts.map(alert => alert.alertKey)),
      or(
        eq(notificationDeliveries.status, "pending"),
        and(
          eq(notificationDeliveries.status, "processing"),
          lte(notificationDeliveries.claimedAt, staleBefore),
        ),
      ),
    ))
    .returning({ alertKey: notificationDeliveries.alertKey });

  const claimedKeys = new Set([
    ...inserted.map(row => row.alertKey),
    ...reclaimed.map(row => row.alertKey),
  ]);
  return {
    alerts: alerts.filter(alert => claimedKeys.has(alert.alertKey)),
    claimId,
  };
}

async function releaseAlertClaims(
  alertKeys: string[],
  claimId: string,
  error: string,
): Promise<void> {
  if (alertKeys.length === 0) return;
  await db
    .update(notificationDeliveries)
    .set({
      status: "pending",
      claimId: null,
      claimedAt: null,
      lastError: error.slice(0, 1000),
    })
    .where(and(
      inArray(notificationDeliveries.alertKey, alertKeys),
      eq(notificationDeliveries.status, "processing"),
      eq(notificationDeliveries.claimId, claimId),
    ));
}

async function runClaimedComplianceNotificationJob(
  now = new Date(),
): Promise<ComplianceNotificationJobResult> {
  const alerts = await findComplianceAlerts(now);
  if (alerts.length === 0) {
    return { alertsFound: 0, alertsSent: 0, tokensRemoved: 0 };
  }

  const userIds = [...new Set(alerts.map(alert => alert.userId))];
  const tokenRows = await db
    .select({
      userId: pushTokens.userId,
      token: pushTokens.token,
      criticalRiskAlerts: pushTokens.criticalRiskAlerts,
      auditReminders: pushTokens.auditReminders,
      kpiWarnings: pushTokens.kpiWarnings,
    })
    .from(pushTokens)
    .where(inArray(pushTokens.userId, userIds));

  const tokensByUser = new Map<string, typeof tokenRows>();
  for (const row of tokenRows) {
    const tokens = tokensByUser.get(row.userId) ?? [];
    tokens.push(row);
    tokensByUser.set(row.userId, tokens);
  }

  const alertsWithTokens = alerts.filter(
    alert => tokensByUser
      .get(alert.userId)
      ?.some(token => allowsComplianceAlert(token, alert.alertType)) ?? false,
  );
  const { alerts: claimedAlerts, claimId } = await claimAlerts(alertsWithTokens, now);
  if (claimedAlerts.length === 0) {
    return { alertsFound: alerts.length, alertsSent: 0, tokensRemoved: 0 };
  }

  const messages: ExpoPushMessage[] = [];
  for (const alert of claimedAlerts) {
    const eligibleTokens = filterEligiblePushTokens(
      tokensByUser.get(alert.userId) ?? [],
      alert.alertType,
    );
    for (const token of eligibleTokens) {
      messages.push({
        to: token.token,
        title: alert.title,
        body: alert.body,
        data: alert.data,
        sound: "default",
        priority: "high",
        channelId: "compliance-alerts",
        alertKey: alert.alertKey,
      });
    }
  }

  let deliveredAlertKeys: Set<string>;
  let tokensRemoved: number;
  try {
    ({ deliveredAlertKeys, tokensRemoved } = await sendExpoPushMessages(messages));
  } catch (error) {
    await releaseAlertClaims(
      claimedAlerts.map(alert => alert.alertKey),
      claimId,
      error instanceof Error ? error.message : "Expo push request failed",
    );
    throw error;
  }

  const sentAlerts = claimedAlerts.filter(alert => deliveredAlertKeys.has(alert.alertKey));
  const retryAlerts = claimedAlerts.filter(alert => !deliveredAlertKeys.has(alert.alertKey));
  if (sentAlerts.length > 0) {
    await db
      .update(notificationDeliveries)
      .set({
        status: "sent",
        claimId: null,
        sentAt: now,
        claimedAt: null,
        lastError: null,
      })
      .where(and(
        inArray(
          notificationDeliveries.alertKey,
          sentAlerts.map(alert => alert.alertKey),
        ),
        eq(notificationDeliveries.claimId, claimId),
      ));
  }
  if (retryAlerts.length > 0) {
    await releaseAlertClaims(
      retryAlerts.map(alert => alert.alertKey),
      claimId,
      "Expo push service did not accept the notification",
    );
  }

  return {
    alertsFound: alerts.length,
    alertsSent: sentAlerts.length,
    tokensRemoved,
  };
}

export async function runComplianceNotificationJob(
  now = new Date(),
): Promise<ComplianceNotificationJobResult> {
  const lockClient = await pool.connect();
  let lockAcquired = false;

  try {
    const lockResult = await lockClient.query<{ acquired: boolean }>(
      "select pg_try_advisory_lock($1) as acquired",
      [COMPLIANCE_JOB_LOCK_ID],
    );
    lockAcquired = lockResult.rows[0]?.acquired === true;
    if (!lockAcquired) {
      return { alertsFound: 0, alertsSent: 0, tokensRemoved: 0 };
    }

    return await runClaimedComplianceNotificationJob(now);
  } finally {
    if (lockAcquired) {
      await lockClient.query("select pg_advisory_unlock($1)", [
        COMPLIANCE_JOB_LOCK_ID,
      ]);
    }
    lockClient.release();
  }
}

export function startComplianceNotificationScheduler(): () => void {
  const configuredInterval = Number(process.env.COMPLIANCE_NOTIFICATION_INTERVAL_MS);
  const intervalMs = Number.isFinite(configuredInterval) && configuredInterval > 0
    ? Math.max(configuredInterval, 60_000)
    : DEFAULT_INTERVAL_MS;
  let running = false;

  const run = async () => {
    if (running) return;
    running = true;
    try {
      const result = await runComplianceNotificationJob();
      if (result.alertsSent > 0) {
        console.info("[notifications] compliance alerts sent", result);
      }
    } catch (error) {
      console.warn("[notifications] compliance job failed:", error);
    } finally {
      running = false;
    }
  };

  void run();
  const timer = setInterval(() => void run(), intervalMs);
  timer.unref();
  return () => clearInterval(timer);
}
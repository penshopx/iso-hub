import assert from "node:assert/strict";
import { and, eq, sql } from "drizzle-orm";
import { db, idempotencyKeys, pool, vendors } from "../lib/db/src";
import { runIdempotentMutation } from "../artifacts/api-server/src/lib/idempotency";

const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
const userId = `idempotency-check-${suffix}`;
const secondUserId = `idempotency-check-other-${suffix}`;
const key = `lost-response-${suffix}`;
const requestBody = { name: `Vendor ${suffix}`, status: "active" };
let executions = 0;

async function createVendorFor(user: string) {
  return runIdempotentMutation({
    userId: user,
    idempotencyKey: key,
    requestBody,
    execute: async (tx) => {
      executions += 1;
      const [vendor] = await tx
        .insert(vendors)
        .values({ userId: user, ...requestBody })
        .returning();
      return {
        statusCode: 201,
        body: { success: true, data: vendor },
      };
    },
  });
}

async function main(): Promise<void> {
  try {
    const committedResponse = await createVendorFor(userId);

    // Simulate a lost HTTP response: ignore the committed result and retry the
    // same queued request with its original idempotency key.
    const retriedResponse = await createVendorFor(userId);

    assert.equal(committedResponse.replayed, false);
    assert.equal(retriedResponse.replayed, true);
    assert.deepEqual(retriedResponse.body, committedResponse.body);
    assert.equal(executions, 1);

    const [sameUserCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(vendors)
      .where(and(eq(vendors.userId, userId), eq(vendors.name, requestBody.name)));
    assert.equal(Number(sameUserCount?.count ?? 0), 1);

    const otherUserResponse = await createVendorFor(secondUserId);
    assert.equal(otherUserResponse.replayed, false);
    assert.equal(executions, 2);
    assert.notEqual(
      (otherUserResponse.body as typeof committedResponse.body).data.id,
      committedResponse.body.data.id,
    );

    console.log("Idempotent lost-response retry check passed.");
  } finally {
    await db.delete(vendors).where(and(
      eq(vendors.name, requestBody.name),
      sql`${vendors.userId} in (${userId}, ${secondUserId})`,
    ));
    await db.delete(idempotencyKeys).where(and(
      eq(idempotencyKeys.key, key),
      sql`${idempotencyKeys.userId} in (${userId}, ${secondUserId})`,
    ));
    await pool.end();
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
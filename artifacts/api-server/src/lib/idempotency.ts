import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { db, idempotencyKeys } from "@workspace/db";

type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export interface MutationResponse<T> {
  statusCode: number;
  body: T;
}

export interface IdempotentMutationResponse<T> extends MutationResponse<T> {
  replayed: boolean;
}

export class IdempotencyConflictError extends Error {
  constructor() {
    super("Idempotency key was already used for a different request");
    this.name = "IdempotencyConflictError";
  }
}

function canonicalize(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => `${JSON.stringify(key)}:${canonicalize(nested)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

function hashRequestBody(body: unknown): string {
  return createHash("sha256").update(canonicalize(body)).digest("hex");
}

function normalizeResponseBody<T>(body: T): T {
  return JSON.parse(JSON.stringify(body)) as T;
}

export function normalizeIdempotencyKey(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function isValidIdempotencyKey(value: string | undefined): boolean {
  return value === undefined || value.length <= 255;
}

export async function runIdempotentMutation<T>(params: {
  userId: string;
  idempotencyKey?: string;
  requestBody: unknown;
  execute: (tx: DbTransaction) => Promise<MutationResponse<T>>;
}): Promise<IdempotentMutationResponse<T>> {
  const { userId, idempotencyKey, requestBody, execute } = params;

  return db.transaction(async (tx) => {
    if (!idempotencyKey) {
      return { ...(await execute(tx)), replayed: false };
    }

    const requestHash = hashRequestBody(requestBody);
    const [inserted] = await tx
      .insert(idempotencyKeys)
      .values({
        userId,
        key: idempotencyKey,
        requestHash,
        statusCode: 0,
        responseBody: {},
      })
      .onConflictDoNothing({
        target: [idempotencyKeys.userId, idempotencyKeys.key],
      })
      .returning();

    if (!inserted) {
      const [existing] = await tx
        .select()
        .from(idempotencyKeys)
        .where(and(
          eq(idempotencyKeys.userId, userId),
          eq(idempotencyKeys.key, idempotencyKey),
        ))
        .limit(1);

      if (!existing) {
        throw new Error("Idempotency record disappeared after a key conflict");
      }
      if (existing.requestHash !== requestHash) {
        throw new IdempotencyConflictError();
      }

      return {
        statusCode: existing.statusCode,
        body: existing.responseBody as T,
        replayed: true,
      };
    }

    const result = await execute(tx);
    const responseBody = normalizeResponseBody(result.body);
    await tx
      .update(idempotencyKeys)
      .set({
        statusCode: result.statusCode,
        responseBody,
        updatedAt: new Date(),
      })
      .where(eq(idempotencyKeys.id, inserted.id));

    return {
      statusCode: result.statusCode,
      body: responseBody,
      replayed: false,
    };
  });
}
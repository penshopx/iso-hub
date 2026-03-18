import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { auditPrograms, auditSchedules } from "@/db/schema";
import { eq, desc, and, sql, like, or } from "drizzle-orm";
import { 
  validateInput, parsePagination, parseFilters,
  generateCode, logActivity,
  successResponse, errorResponse, paginatedResponse 
} from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "schedules";
    const programId = searchParams.get("programId");

    if (type === "programs") {
      const [data, countResult] = await Promise.all([
        db.select()
          .from(auditPrograms)
          .orderBy(desc(auditPrograms.year))
          .limit(50),
        db.select({ count: sql<number>`count(*)` }).from(auditPrograms),
      ]);

      return NextResponse.json(paginatedResponse(data, countResult[0]?.count || 0, 1, 50));
    }

    const pagination = parsePagination(searchParams);
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (programId) {
      conditions.push(eq(auditSchedules.programId, parseInt(programId)));
    }

    const search = searchParams.get("search");
    if (search) {
      conditions.push(
        or(
          like(auditSchedules.code, `%${search}%`),
          like(auditSchedules.scope, `%${search}%`)
        )
      );
    }

    const status = searchParams.get("status");
    if (status) {
      conditions.push(eq(auditSchedules.status, status));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      db.select()
        .from(auditSchedules)
        .where(whereClause)
        .orderBy(desc(auditSchedules.auditDate))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` })
        .from(auditSchedules)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count || 0;

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    console.error("Error fetching audits:", error);
    return errorResponse("Failed to fetch audits");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const isProgram = body.type === "program";

    if (isProgram) {
      const validation = validateInput(body, [
        { field: "name", required: true },
        { field: "year", required: true },
        { field: "type", required: true },
      ]);

      if (!validation.valid) {
        return errorResponse(validation.errors.join(", "));
      }

      const countResult = await db.select({ count: sql<number>`count(*)` }).from(auditPrograms);
      const sequence = (countResult[0]?.count || 0) + 1;
      const code = generateCode("PROG", sequence);

      const [newProgram] = await db.insert(auditPrograms).values({
        code,
        name: body.name,
        year: body.year,
        type: body.type,
        scope: body.scope,
        isoStandard: body.isoStandard,
        status: "draft",
      }).returning();

      await logActivity(undefined, "CREATE", "audit_program", newProgram.id, `Created audit program: ${newProgram.name}`);

      return NextResponse.json(successResponse(newProgram), { status: 201 });
    }

    const validation = validateInput(body, [
      { field: "programId", required: true },
      { field: "scope", required: true },
      { field: "type", required: true },
    ]);

    if (!validation.valid) {
      return errorResponse(validation.errors.join(", "));
    }

    const countResult = await db.select({ count: sql<number>`count(*)` }).from(auditSchedules);
    const sequence = (countResult[0]?.count || 0) + 1;
    const code = generateCode("AUD", sequence);

    const [newSchedule] = await db.insert(auditSchedules).values({
      programId: body.programId,
      code,
      type: body.type,
      scope: body.scope,
      department: body.department,
      auditorLead: body.auditorLead,
      auditors: body.auditors ? JSON.stringify(body.auditors) : undefined,
      auditDate: body.auditDate ? new Date(body.auditDate) : null,
      status: "scheduled",
    }).returning();

    await db.update(auditPrograms)
      .set({ plannedAudits: sql`${auditPrograms.plannedAudits} + 1` })
      .where(eq(auditPrograms.id, body.programId));

    await logActivity(undefined, "CREATE", "audit_schedule", newSchedule.id, `Created audit: ${newSchedule.scope}`);

    return NextResponse.json(successResponse(newSchedule), { status: 201 });
  } catch (error) {
    console.error("Error creating audit:", error);
    return errorResponse("Failed to create audit");
  }
}

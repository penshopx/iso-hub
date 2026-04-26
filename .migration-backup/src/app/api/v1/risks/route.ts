import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { risks } from "@/db/schema";
import { eq, desc, asc, and, sql, gte, lte, like, or } from "drizzle-orm";
import { 
  validateInput, parsePagination, parseFilters, 
  generateCode, calculateRiskLevel, logActivity,
  successResponse, errorResponse, paginatedResponse 
} from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const filters = parseFilters(searchParams);

    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (filters.search) {
      conditions.push(
        or(
          like(risks.name, `%${filters.search}%`),
          like(risks.description, `%${filters.search}%`)
        )
      );
    }

    if (filters.status) {
      conditions.push(eq(risks.status, filters.status));
    }

    if (filters.category) {
      conditions.push(eq(risks.category, filters.category));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      db.select()
        .from(risks)
        .where(whereClause)
        .orderBy(desc(risks.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` })
        .from(risks)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count || 0;

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    console.error("Error fetching risks:", error);
    return errorResponse("Failed to fetch risks");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateInput(body, [
      { field: "name", required: true, minLength: 3 },
      { field: "category", required: true },
      { field: "probability", required: true },
      { field: "impact", required: true },
    ]);

    if (!validation.valid) {
      return errorResponse(validation.errors.join(", "));
    }

    const riskLevel = calculateRiskLevel(body.probability, body.impact);

    const countResult = await db.select({ count: sql<number>`count(*)` }).from(risks);
    const sequence = (countResult[0]?.count || 0) + 1;
    const code = generateCode("RISK", sequence);

    const [newRisk] = await db.insert(risks).values({
      code,
      name: body.name,
      description: body.description,
      category: body.category,
      probability: body.probability,
      impact: body.impact,
      riskLevel,
      owner: body.owner,
      status: "open",
      mitigation: body.mitigation,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    }).returning();

    await logActivity(undefined, "CREATE", "risk", newRisk.id, `Created risk: ${newRisk.name}`);

    return NextResponse.json(successResponse(newRisk), { status: 201 });
  } catch (error) {
    console.error("Error creating risk:", error);
    return errorResponse("Failed to create risk");
  }
}

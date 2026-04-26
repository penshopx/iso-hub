import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { kpis, kpiData } from "@/db/schema";
import { eq, desc, and, sql, like, gte, lte } from "drizzle-orm";
import { 
  validateInput, parsePagination, parseFilters,
  calculateKpiAchievement, getStatusFromAchievement,
  logActivity, successResponse, errorResponse, paginatedResponse 
} from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "kpis";
    const period = searchParams.get("period");

    if (type === "data" && period) {
      const kpiId = searchParams.get("kpiId");
      const whereClause = kpiId 
        ? eq(kpiData.kpiId, parseInt(kpiId))
        : undefined;

      const data = await db.select()
        .from(kpiData)
        .where(whereClause)
        .orderBy(desc(kpiData.period))
        .limit(50);

      return NextResponse.json(successResponse(data));
    }

    const pagination = parsePagination(searchParams);
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select()
        .from(kpis)
        .orderBy(desc(kpis.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(kpis),
    ]);

    const total = countResult[0]?.count || 0;

    const kpisWithAchievement = await Promise.all(
      data.map(async (kpi) => {
        const latestData = await db.select()
          .from(kpiData)
          .where(eq(kpiData.kpiId, kpi.id))
          .orderBy(desc(kpiData.period))
          .limit(1);

        if (latestData.length === 0) {
          return { ...kpi, latestValue: null, achievement: null, status: null };
        }

        const achievement = calculateKpiAchievement(
          latestData[0].value || 0,
          kpi.target || 0,
          kpi.direction || "higher_better"
        );
        const status = getStatusFromAchievement(achievement);

        return {
          ...kpi,
          latestValue: latestData[0].value,
          achievement: Math.round(achievement * 10) / 10,
          status,
        };
      })
    );

    return NextResponse.json(paginatedResponse(kpisWithAchievement, total, page, limit));
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    return errorResponse("Failed to fetch KPIs");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateInput(body, [
      { field: "name", required: true, minLength: 3 },
      { field: "category", required: true },
      { field: "target", required: true },
    ]);

    if (!validation.valid) {
      return errorResponse(validation.errors.join(", "));
    }

    const [newKpi] = await db.insert(kpis).values({
      code: body.code || `KPI-${Date.now()}`,
      name: body.name,
      description: body.description,
      category: body.category,
      unit: body.unit,
      target: body.target,
      targetFrequency: body.targetFrequency || "monthly",
      weight: body.weight || 1,
      direction: body.direction || "higher_better",
      department: body.department,
      owner: body.owner,
      formula: body.formula,
      dataSource: body.dataSource,
      status: "active",
    }).returning();

    await logActivity(undefined, "CREATE", "kpi", newKpi.id, `Created KPI: ${newKpi.name}`);

    return NextResponse.json(successResponse(newKpi), { status: 201 });
  } catch (error) {
    console.error("Error creating KPI:", error);
    return errorResponse("Failed to create KPI");
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { risks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateRiskLevel, logActivity, successResponse, errorResponse } from "@/lib/api-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const risk = await db.select().from(risks).where(eq(risks.id, parseInt(id))).limit(1);

    if (risk.length === 0) {
      return errorResponse("Risk not found", 404);
    }

    return NextResponse.json(successResponse(risk[0]));
  } catch (error) {
    console.error("Error fetching risk:", error);
    return errorResponse("Failed to fetch risk");
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.select().from(risks).where(eq(risks.id, parseInt(id))).limit(1);
    if (existing.length === 0) {
      return errorResponse("Risk not found", 404);
    }

    const probability = body.probability ?? existing[0].probability;
    const impact = body.impact ?? existing[0].impact;
    const riskLevel = calculateRiskLevel(probability, impact);

    const [updatedRisk] = await db
      .update(risks)
      .set({
        ...body,
        riskLevel,
        updatedAt: new Date(),
      })
      .where(eq(risks.id, parseInt(id)))
      .returning();

    await logActivity(undefined, "UPDATE", "risk", updatedRisk.id, `Updated risk: ${updatedRisk.name}`);

    return NextResponse.json(successResponse(updatedRisk));
  } catch (error) {
    console.error("Error updating risk:", error);
    return errorResponse("Failed to update risk");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.select().from(risks).where(eq(risks.id, parseInt(id))).limit(1);
    if (existing.length === 0) {
      return errorResponse("Risk not found", 404);
    }

    await db.delete(risks).where(eq(risks.id, parseInt(id)));

    await logActivity(undefined, "DELETE", "risk", parseInt(id), `Deleted risk: ${existing[0].name}`);

    return NextResponse.json(successResponse({ message: "Risk deleted successfully" }));
  } catch (error) {
    console.error("Error deleting risk:", error);
    return errorResponse("Failed to delete risk");
  }
}

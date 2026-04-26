import { NextResponse } from "next/server";
import { db } from "@/db";
import { hazards } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(hazards);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hazards" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(hazards).values({
      name: body.name,
      description: body.description,
      riskLevel: body.riskLevel || "medium",
      mitigation: body.mitigation,
    }).returning({ id: hazards.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create hazard" }, { status: 500 });
  }
}

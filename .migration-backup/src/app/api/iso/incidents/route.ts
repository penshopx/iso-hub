import { NextResponse } from "next/server";
import { db } from "@/db";
import { incidents } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(incidents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(incidents).values({
      title: body.title,
      description: body.description,
      severity: body.severity || "minor",
      location: body.location,
      date: body.date ? new Date(body.date) : null,
    }).returning({ id: incidents.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create incident" }, { status: 500 });
  }
}

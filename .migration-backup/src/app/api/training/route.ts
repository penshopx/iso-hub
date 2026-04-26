import { NextResponse } from "next/server";
import { db } from "@/db";
import { trainingPrograms, participants } from "@/db/schema";

export async function GET() {
  try {
    const programs = await db.select().from(trainingPrograms);
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch training programs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(trainingPrograms).values({
      name: body.name,
      description: body.description,
      type: body.type,
      date: body.date ? new Date(body.date) : null,
      location: body.location,
      status: body.status || "scheduled",
    }).returning({ id: trainingPrograms.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create training program" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { internalAudits, auditFindings } from "@/db/schema";

export async function GET() {
  try {
    const audits = await db.select().from(internalAudits);
    return NextResponse.json(audits);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch audits" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(internalAudits).values({
      scope: body.scope,
      auditor: body.auditor,
      date: body.date ? new Date(body.date) : null,
      status: body.status || "scheduled",
    }).returning({ id: internalAudits.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create audit" }, { status: 500 });
  }
}

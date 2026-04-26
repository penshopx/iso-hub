import { NextResponse } from "next/server";
import { db } from "@/db";
import { externalAudits, certifications } from "@/db/schema";

export async function GET() {
  try {
    const audits = await db.select().from(externalAudits);
    return NextResponse.json(audits);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch external audits" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(externalAudits).values({
      certificationBody: body.certificationBody,
      scope: body.scope,
      date: body.date ? new Date(body.date) : null,
      type: body.type || "surveillance",
      status: body.status || "scheduled",
    }).returning({ id: externalAudits.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create external audit" }, { status: 500 });
  }
}

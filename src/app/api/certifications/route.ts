import { NextResponse } from "next/server";
import { db } from "@/db";
import { certifications } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(certifications);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(certifications).values({
      standard: body.standard,
      certificationBody: body.certificationBody,
      certificateNumber: body.certificateNumber,
      issueDate: body.issueDate ? new Date(body.issueDate) : null,
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      status: body.status || "active",
    }).returning({ id: certifications.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 });
  }
}

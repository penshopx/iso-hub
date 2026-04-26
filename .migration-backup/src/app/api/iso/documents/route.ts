import { NextResponse } from "next/server";
import { db } from "@/db";
import { isoDocuments } from "@/db/schema";

export async function GET() {
  try {
    const documents = await db.select().from(isoDocuments);
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(isoDocuments).values({
      title: body.title,
      type: body.type,
      category: body.category,
      content: body.content,
      status: body.status || "draft",
    }).returning({ id: isoDocuments.id });
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}

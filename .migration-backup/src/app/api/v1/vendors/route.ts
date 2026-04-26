import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { vendors } from "@/db/schema";
import { eq, desc, and, sql, like, or } from "drizzle-orm";
import { 
  validateInput, parsePagination, parseFilters, 
  generateCode, logActivity,
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
          like(vendors.name, `%${filters.search}%`),
          like(vendors.code, `%${filters.search}%`)
        )
      );
    }

    if (filters.status) {
      conditions.push(eq(vendors.status, filters.status));
    }

    if (filters.category) {
      conditions.push(eq(vendors.category, filters.category));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      db.select()
        .from(vendors)
        .where(whereClause)
        .orderBy(desc(vendors.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` })
        .from(vendors)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count || 0;

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return errorResponse("Failed to fetch vendors");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateInput(body, [
      { field: "name", required: true, minLength: 2 },
      { field: "category", required: true },
    ]);

    if (!validation.valid) {
      return errorResponse(validation.errors.join(", "));
    }

    const countResult = await db.select({ count: sql<number>`count(*)` }).from(vendors);
    const sequence = (countResult[0]?.count || 0) + 1;
    const code = generateCode("VND", sequence);

    const [newVendor] = await db.insert(vendors).values({
      code,
      name: body.name,
      category: body.category,
      address: body.address,
      city: body.city,
      country: body.country || "Indonesia",
      phone: body.phone,
      email: body.email,
      website: body.website,
      contactPerson: body.contactPerson,
      riskCategory: body.riskCategory || "low",
      status: "pending",
      certifications: body.certifications ? JSON.stringify(body.certifications) : undefined,
      annualSpend: body.annualSpend,
    }).returning();

    await logActivity(undefined, "CREATE", "vendor", newVendor.id, `Created vendor: ${newVendor.name}`);

    return NextResponse.json(successResponse(newVendor), { status: 201 });
  } catch (error) {
    console.error("Error creating vendor:", error);
    return errorResponse("Failed to create vendor");
  }
}

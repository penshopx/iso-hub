import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { 
  risks, vendors, kpis, auditSchedules,
  incidents, trainingPrograms, certifications, isoDocuments,
  knowledgeArticles, facilitators, services
} from "@/db/schema";
import { like, or, sql, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!query || query.length < 2) {
      return NextResponse.json({ success: false, error: "Query must be at least 2 characters" }, { status: 400 });
    }

    const searchPattern = `%${query}%`;

    const [
      riskResults,
      vendorResults,
      kpiResults,
      auditResults,
      incidentResults,
      trainingResults,
      certificationResults,
      documentResults,
      articleResults,
      facilitatorResults,
    ] = await Promise.all([
      db.select({
        id: risks.id,
        name: risks.name,
        type: sql`"risk"`,
        category: risks.category,
        status: risks.status,
        createdAt: risks.createdAt,
      }).from(risks)
        .where(or(like(risks.name, searchPattern), like(risks.description, searchPattern)))
        .limit(limit),
      
      db.select({
        id: vendors.id,
        name: vendors.name,
        type: sql`"vendor"`,
        category: vendors.category,
        status: vendors.status,
        createdAt: vendors.createdAt,
      }).from(vendors)
        .where(or(like(vendors.name, searchPattern), like(vendors.code, searchPattern)))
        .limit(limit),

      db.select({
        id: kpis.id,
        name: kpis.name,
        type: sql`"kpi"`,
        category: kpis.category,
        status: kpis.status,
        createdAt: kpis.createdAt,
      }).from(kpis)
        .where(or(like(kpis.name, searchPattern), like(kpis.description, searchPattern)))
        .limit(limit),

      db.select({
        id: auditSchedules.id,
        name: auditSchedules.scope,
        type: sql`"audit"`,
        category: auditSchedules.type,
        status: auditSchedules.status,
        createdAt: auditSchedules.createdAt,
      }).from(auditSchedules)
        .where(or(like(auditSchedules.scope, searchPattern), like(auditSchedules.code, searchPattern)))
        .limit(limit),

      db.select({
        id: incidents.id,
        name: incidents.title,
        type: sql`"incident"`,
        category: incidents.severity,
        status: incidents.status,
        createdAt: incidents.createdAt,
      }).from(incidents)
        .where(or(like(incidents.title, searchPattern), like(incidents.description, searchPattern)))
        .limit(limit),

      db.select({
        id: trainingPrograms.id,
        name: trainingPrograms.name,
        type: sql`"training"`,
        category: trainingPrograms.type,
        status: trainingPrograms.status,
        createdAt: trainingPrograms.createdAt,
      }).from(trainingPrograms)
        .where(or(like(trainingPrograms.name, searchPattern), like(trainingPrograms.description, searchPattern)))
        .limit(limit),

      db.select({
        id: certifications.id,
        name: certifications.standard,
        type: sql`"certification"`,
        category: certifications.certificationBody,
        status: certifications.status,
        createdAt: certifications.createdAt,
      }).from(certifications)
        .where(like(certifications.standard, searchPattern))
        .limit(limit),

      db.select({
        id: isoDocuments.id,
        name: isoDocuments.title,
        type: sql`"document"`,
        category: isoDocuments.category,
        status: isoDocuments.status,
        createdAt: isoDocuments.createdAt,
      }).from(isoDocuments)
        .where(or(like(isoDocuments.title, searchPattern), like(isoDocuments.type, searchPattern)))
        .limit(limit),

      db.select({
        id: knowledgeArticles.id,
        name: knowledgeArticles.title,
        type: sql`"article"`,
        category: knowledgeArticles.category,
        status: knowledgeArticles.status,
        createdAt: knowledgeArticles.createdAt,
      }).from(knowledgeArticles)
        .where(or(like(knowledgeArticles.title, searchPattern), like(knowledgeArticles.content, searchPattern)))
        .limit(limit),

      db.select({
        id: facilitators.id,
        name: facilitators.name,
        type: sql`"facilitator"`,
        category: facilitators.expertise,
        status: facilitators.status,
        createdAt: facilitators.createdAt,
      }).from(facilitators)
        .where(or(like(facilitators.name, searchPattern), like(facilitators.expertise, searchPattern)))
        .limit(limit),
    ]);

    const results = [
      ...riskResults,
      ...vendorResults,
      ...kpiResults,
      ...auditResults,
      ...incidentResults,
      ...trainingResults,
      ...certificationResults,
      ...documentResults,
      ...articleResults,
      ...facilitatorResults,
    ].sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));

    const groupedResults = {
      all: results,
      byType: {
        risks: riskResults,
        vendors: vendorResults,
        kpis: kpiResults,
        audits: auditResults,
        incidents: incidentResults,
        trainings: trainingResults,
        certifications: certificationResults,
        documents: documentResults,
        articles: articleResults,
        facilitators: facilitatorResults,
      },
    };

    return NextResponse.json({
      success: true,
      data: groupedResults,
      meta: {
        query,
        totalResults: results.length,
        searchedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ success: false, error: "Failed to search" }, { status: 500 });
  }
}

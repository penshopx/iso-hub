import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { 
  risks, vendors, kpis, kpiData, auditSchedules,
  incidents, trainingPrograms, certifications, isoDocuments,
  knowledgeArticles, bookings, facilitators, services
} from "@/db/schema";
import { eq, desc, sql, gte, lte, and, like, count, sum } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";

    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "quarter":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const [
      riskStats,
      vendorStats,
      kpiStats,
      auditStats,
      incidentStats,
      trainingStats,
      certificationStats,
      documentStats,
      knowledgeStats,
      bookingStats,
    ] = await Promise.all([
      db.select({
        total: sql<number>`count(*)`,
        open: sql<number>`sum(case when ${risks.status} = 'open' then 1 else 0 end)`,
        closed: sql<number>`sum(case when ${risks.status} = 'closed' then 1 else 0 end)`,
        critical: sql<number>`sum(case when ${risks.riskLevel} = 'critical' then 1 else 0 end)`,
        high: sql<number>`sum(case when ${risks.riskLevel} = 'high' then 1 else 0 end)`,
      }).from(risks),
      
      db.select({
        total: sql<number>`count(*)`,
        approved: sql<number>`sum(case when ${vendors.status} = 'approved' then 1 else 0 end)`,
        pending: sql<number>`sum(case when ${vendors.status} = 'pending' then 1 else 0 end)`,
        highRisk: sql<number>`sum(case when ${vendors.riskCategory} = 'high' then 1 else 0 end)`,
      }).from(vendors),

      db.select({
        total: sql<number>`count(*)`,
        active: sql<number>`sum(case when ${kpis.status} = 'active' then 1 else 0 end)`,
      }).from(kpis),

      db.select({
        total: sql<number>`count(*)`,
        completed: sql<number>`sum(case when ${auditSchedules.status} = 'completed' then 1 else 0 end)`,
        scheduled: sql<number>`sum(case when ${auditSchedules.status} = 'scheduled' then 1 else 0 end)`,
        findings: sql<number>`sum(${auditSchedules.findings})`,
      }).from(auditSchedules),

      db.select({
        total: sql<number>`count(*)`,
        open: sql<number>`sum(case when ${incidents.status} = 'open' then 1 else 0 end)`,
        serious: sql<number>`sum(case when ${incidents.severity} = 'serious' then 1 else 0 end)`,
      }).from(incidents),

      db.select({
        total: sql<number>`count(*)`,
        completed: sql<number>`sum(case when ${trainingPrograms.status} = 'completed' then 1 else 0 end)`,
        scheduled: sql<number>`sum(case when ${trainingPrograms.status} = 'scheduled' then 1 else 0 end)`,
      }).from(trainingPrograms),

      db.select({
        total: sql<number>`count(*)`,
        active: sql<number>`sum(case when ${certifications.status} = 'active' then 1 else 0 end)`,
        expiring: sql<number>`sum(case when ${certifications.expiryDate} < datetime('now', '+30 days') then 1 else 0 end)`,
      }).from(certifications),

      db.select({
        total: sql<number>`count(*)`,
        published: sql<number>`sum(case when ${isoDocuments.status} = 'published' then 1 else 0 end)`,
        draft: sql<number>`sum(case when ${isoDocuments.status} = 'draft' then 1 else 0 end)`,
      }).from(isoDocuments),

      db.select({
        total: sql<number>`count(*)`,
        published: sql<number>`sum(case when ${knowledgeArticles.status} = 'published' then 1 else 0 end)`,
        views: sql<number>`sum(${knowledgeArticles.viewCount})`,
      }).from(knowledgeArticles),

      db.select({
        total: sql<number>`count(*)`,
        pending: sql<number>`sum(case when ${bookings.status} = 'pending' then 1 else 0 end)`,
        confirmed: sql<number>`sum(case when ${bookings.status} = 'confirmed' then 1 else 0 end)`,
      }).from(bookings),
    ]);

    const [recentActivities] = await Promise.all([
      db.select()
        .from(kpiData)
        .orderBy(desc(kpiData.createdAt))
        .limit(10),
    ]);

    const dashboard = {
      overview: {
        risks: riskStats[0],
        vendors: vendorStats[0],
        kpis: kpiStats[0],
        audits: auditStats[0],
        incidents: incidentStats[0],
        trainings: trainingStats[0],
        certifications: certificationStats[0],
        documents: documentStats[0],
        knowledge: knowledgeStats[0],
        bookings: bookingStats[0],
      },
      recentActivities,
      alerts: [
        ...(riskStats[0].critical > 0 ? [{ type: "critical", message: `${riskStats[0].critical} critical risks need attention` }] : []),
        ...(certificationStats[0].expiring > 0 ? [{ type: "warning", message: `${certificationStats[0].expiring} certifications expiring soon` }] : []),
        ...(incidentStats[0].serious > 0 ? [{ type: "danger", message: `${incidentStats[0].serious} serious incidents reported` }] : []),
      ],
    };

    return NextResponse.json({ success: true, data: dashboard });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard" }, { status: 500 });
  }
}

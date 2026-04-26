import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { 
  risks, vendors, kpis, kpiData, auditSchedules,
  incidents, trainingPrograms, certifications, isoDocuments
} from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");
    const format = searchParams.get("format") || "json";
    const id = searchParams.get("id");

    if (!entity) {
      return NextResponse.json({ success: false, error: "Entity is required" }, { status: 400 });
    }

    let data: unknown[];
    let filename: string;

    switch (entity) {
      case "risks":
        data = await db.select().from(risks).orderBy(desc(risks.createdAt));
        filename = "risks-export";
        break;

      case "vendors":
        data = await db.select().from(vendors).orderBy(desc(vendors.createdAt));
        filename = "vendors-export";
        break;

      case "kpis":
        const kpisData = await db.select().from(kpis).orderBy(desc(kpis.createdAt));
        const kpisWithData = await Promise.all(
          kpisData.map(async (kpi) => {
            const history = await db.select()
              .from(kpiData)
              .where(eq(kpiData.kpiId, kpi.id))
              .orderBy(desc(kpiData.period))
              .limit(12);
            return { ...kpi, history };
          })
        );
        data = kpisWithData;
        filename = "kpis-export";
        break;

      case "audits":
        data = await db.select().from(auditSchedules).orderBy(desc(auditSchedules.auditDate));
        filename = "audits-export";
        break;

      case "incidents":
        data = await db.select().from(incidents).orderBy(desc(incidents.createdAt));
        filename = "incidents-export";
        break;

      case "trainings":
        data = await db.select().from(trainingPrograms).orderBy(desc(trainingPrograms.createdAt));
        filename = "trainings-export";
        break;

      case "certifications":
        data = await db.select().from(certifications).orderBy(desc(certifications.createdAt));
        filename = "certifications-export";
        break;

      case "documents":
        data = await db.select().from(isoDocuments).orderBy(desc(isoDocuments.createdAt));
        filename = "documents-export";
        break;

      case "dashboard":
        const [
          riskStats, vendorStats, auditStats, incidentStats, 
          trainingStats, certificationStats, documentStats
        ] = await Promise.all([
          db.select({
            total: sql<number>`count(*)`,
            open: sql<number>`sum(case when ${risks.status} = 'open' then 1 else 0 end)`,
            closed: sql<number>`sum(case when ${risks.status} = 'closed' then 1 else 0 end)`,
          }).from(risks),
          db.select({
            total: sql<number>`count(*)`,
            approved: sql<number>`sum(case when ${vendors.status} = 'approved' then 1 else 0 end)`,
          }).from(vendors),
          db.select({
            total: sql<number>`count(*)`,
            findings: sql<number>`sum(${auditSchedules.findings})`,
          }).from(auditSchedules),
          db.select({
            total: sql<number>`count(*)`,
            serious: sql<number>`sum(case when ${incidents.severity} = 'serious' then 1 else 0 end)`,
          }).from(incidents),
          db.select({ total: sql<number>`count(*)` }).from(trainingPrograms),
          db.select({
            total: sql<number>`count(*)`,
            active: sql<number>`sum(case when ${certifications.status} = 'active' then 1 else 0 end)`,
          }).from(certifications),
          db.select({
            total: sql<number>`count(*)`,
            published: sql<number>`sum(case when ${isoDocuments.status} = 'published' then 1 else 0 end)`,
          }).from(isoDocuments),
        ]);

        data = [{
          risks: riskStats[0],
          vendors: vendorStats[0],
          audits: auditStats[0],
          incidents: incidentStats[0],
          trainings: trainingStats[0],
          certifications: certificationStats[0],
          documents: documentStats[0],
          generatedAt: new Date().toISOString(),
        }];
        filename = "dashboard-summary";
        break;

      default:
        return NextResponse.json({ success: false, error: "Invalid entity" }, { status: 400 });
    }

    if (id && entity !== "kpis") {
      const singleData = await db.select().from(
        entity === "risks" ? risks :
        entity === "vendors" ? vendors :
        entity === "audits" ? auditSchedules :
        entity === "incidents" ? incidents :
        entity === "trainings" ? trainingPrograms :
        entity === "certifications" ? certifications :
        isoDocuments
      ).where(eq(
        (entity === "risks" ? risks :
        entity === "vendors" ? vendors :
        entity === "audits" ? auditSchedules :
        entity === "incidents" ? incidents :
        entity === "trainings" ? trainingPrograms :
        entity === "certifications" ? certifications :
        isoDocuments).id, parseInt(id)
      ));
      
      if (singleData.length > 0) {
        data = singleData;
      }
    }

    if (format === "csv") {
      if (data.length === 0) {
        return NextResponse.json({ success: false, error: "No data to export" }, { status: 404 });
      }

      const headers = Object.keys(data[0] as Record<string, unknown>);
      const csvRows = [
        headers.join(","),
        ...data.map(row => 
          headers.map(header => {
            const value = (row as Record<string, unknown>)[header];
            if (value === null || value === undefined) return "";
            if (typeof value === "string" && value.includes(",")) return `"${value}"`;
            return String(value);
          }).join(",")
        )
      ];

      return new NextResponse(csvRows.join("\n"), {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data,
      meta: {
        exportedAt: new Date().toISOString(),
        totalRecords: data.length,
        entity,
        format,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json({ success: false, error: "Failed to export data" }, { status: 500 });
  }
}

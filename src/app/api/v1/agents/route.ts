import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { opcAgentStats } from "@/db/schema";
import { eq } from "drizzle-orm";

const AGENTS = [
  {
    id: "iso",
    name: "ISO Agent",
    description: "Expert dalam standar ISO - ISO 9001, 14001, 45001, 27001, 37001, PANCEK, dan lainnya",
    capabilities: [
      "Konsultasi standar ISO",
      "Gap analysis",
      "Klausul requirements",
      "Implementasi guidance",
      "ISO 9001 Quality Management",
      "ISO 14001 Environmental",
      "ISO 45001 OHS",
      "ISO 27001 Security",
      "ISO 37001 Anti-Bribery",
    ],
    color: "blue",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    status: "active",
    keywords: ["iso", "sertifikasi", "klausul", "standar", "mutu", "lingkungan", "k3", "keamanan"],
  },
  {
    id: "legal",
    name: "Legal Agent",
    description: "Expert dalam regulasi dan compliance Indonesia - UU Anti Korupsi, Peraturan K3, Lingkungan",
    capabilities: [
      "Konsultasi regulasi",
      "Compliance check",
      "Peraturan pemerintah",
      "UU No 20/2001",
      "UU No 13/2003 Ketenagakerjaan",
      "Peraturan K3",
      "Peraturan Lingkungan",
      "Anti Penyuapan",
    ],
    color: "green",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m12-2l.001 2.5m-6-2l.001 2.5",
    status: "active",
    keywords: ["legal", "hukum", "uu", "korupsi", "compliance", "k3", "peraturan", "lngkungan"],
  },
  {
    id: "technical",
    name: "Technical Agent",
    description: "Expert dalam dokumentasi dan implementasi - Pembuatan dokumen, SOP, Template",
    capabilities: [
      "Pembuatan dokumen",
      "Generator SOP",
      "Template management",
      "Implementation roadmap",
      "Manual Mutu",
      "Kebijakan Mutu",
      "Prosedur Operasional",
      "Instruksi Kerja",
    ],
    color: "purple",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    status: "active",
    keywords: ["dokumen", "sop", "template", "kebijakan", "manual", "prosedur", "generate", "buat"],
  },
  {
    id: "audit",
    name: "Audit Agent",
    description: "Expert dalam audit dan sertifikasi - Audit preparation, Checklist, Finding tracking",
    capabilities: [
      "Persiapan audit",
      "Checklist generation",
      "Finding tracking",
      "Certification roadmap",
      "Audit Internal",
      "Audit Eksternal",
      "Pre-assessment",
      "Surveillance",
    ],
    color: "orange",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    status: "active",
    keywords: ["audit", "checklist", "finding", "temuan", "nonconformity", "capa", "assessment"],
  },
  {
    id: "training",
    name: "Training Agent",
    description: "Expert dalam pembelajaran dan pengembangan - Course, Quiz, Learning path",
    capabilities: [
      "Rekomendasi kursus",
      "Quiz generation",
      "Learning path",
      "Competency assessment",
      "Pelatihan ISO",
      "E-Learning",
      "Sertifikasi Kompetensi",
    ],
    color: "cyan",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    status: "active",
    keywords: ["training", "kursus", "quiz", "belajar", "pelatihan", "learning", "kompetensi"],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get("includeStats") === "true";

    let agentStats: Record<string, unknown>[] = [];
    if (includeStats) {
      agentStats = await db.select().from(opcAgentStats);
    }

    const agentsWithStats = AGENTS.map((agent) => {
      const stats = agentStats.find((s) => s.agentType === agent.id);
      return {
        ...agent,
        stats: stats ? {
          totalTasks: stats.totalTasks || 0,
          successTasks: stats.successTasks || 0,
          failedTasks: stats.failedTasks || 0,
          avgExecutionTime: stats.avgExecutionTime || 0,
          lastRunAt: stats.lastRunAt,
        } : null,
      };
    });

    return NextResponse.json({
      success: true,
      data: agentsWithStats,
      meta: {
        totalAgents: AGENTS.length,
        activeAgents: AGENTS.filter((a) => a.status === "active").length,
      },
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch agents" }, { status: 500 });
  }
}

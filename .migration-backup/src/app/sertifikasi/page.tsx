import Link from "next/link";
import { db } from "@/db";
import { certificationRoadmap, gapAnalysis, readinessChecklist } from "@/db/schema";

async function getRoadmaps() {
  const roadmaps = await db.select().from(certificationRoadmap);
  return roadmaps;
}

async function getGapAnalysis(roadmapId: number) {
  const allGaps = await db.select().from(gapAnalysis);
  return allGaps.filter(g => g.roadmapId === roadmapId);
}

async function getReadiness(roadmapId: number) {
  const allItems = await db.select().from(readinessChecklist);
  return allItems.filter(i => i.roadmapId === roadmapId);
}

const stageColors: Record<string, string> = {
  gap_analysis: "bg-yellow-500",
  implementation: "bg-blue-500",
  internal_audit: "bg-purple-500",
  certification: "bg-green-500",
};

const stageLabels: Record<string, string> = {
  gap_analysis: "Gap Analysis",
  implementation: "Implementasi",
  internal_audit: "Audit Internal",
  certification: "Sertifikasi",
};

const complianceLevels: Record<string, number> = {
  "not_applicable": 0,
  "non_compliant": 1,
  "partially_compliant": 2,
  "compliant": 3,
  "fully_compliant": 4,
};

function getStageColor(stage: string | null): string {
  return stageColors[stage || "gap_analysis"] || "bg-yellow-500";
}

function getStageLabel(stage: string | null): string {
  return stageLabels[stage || "gap_analysis"] || stage || "Unknown";
}

export default async function SertifikasiPage() {
  const roadmaps = await getRoadmaps();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Panduan Sertifikasi</h1>
                <p className="text-sm text-neutral-400">Roadmap dan gap analysis ISO</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Roadmap Baru
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Tahapan Sertifikasi ISO</h2>
          <div className="flex items-center justify-between">
            {["Gap Analysis", "Implementasi", "Audit Internal", "Sertifikasi"].map((stage, index) => (
              <div key={stage} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-blue-500" : index === 2 ? "bg-purple-500" : "bg-green-500"}`}>
                  <span className="font-bold">{index + 1}</span>
                </div>
                <span className="ml-2 text-sm hidden md:inline">{stage}</span>
                {index < 3 && <div className="w-12 md:w-24 h-1 bg-neutral-700 mx-2"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h3 className="font-semibold mb-4">Klien & Roadmap</h3>
              {roadmaps.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  <p>Belum ada roadmap sertifikasi</p>
                  <p className="text-sm">Mulai panduan sertifikasi untuk klien</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {roadmaps.map(async (roadmap) => {
                    const gaps = await getGapAnalysis(roadmap.id);
                    const readyItems = await getReadiness(roadmap.id);
                    const totalCompliance = gaps.reduce((sum, g) => sum + (complianceLevels[g.complianceLevel || "non_compliant"] || 0), 0);
                    const maxCompliance = gaps.length * 4;
                    const compliancePercent = maxCompliance > 0 ? Math.round((totalCompliance / maxCompliance) * 100) : 0;
                    
                    return (
                      <div key={roadmap.id} className="p-4 bg-neutral-700 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{roadmap.clientName}</h4>
                            <p className="text-sm text-neutral-400">{roadmap.isoStandard}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStageColor(roadmap.currentStage)} text-white`}>
                            {getStageLabel(roadmap.currentStage)}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-400">Kesesuaian</span>
                            <span>{compliancePercent}%</span>
                          </div>
                          <div className="h-2 bg-neutral-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${compliancePercent}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-400">
                          <span>{gaps.length} Klausul</span>
                          <span>{readyItems.filter(i => i.status === "completed").length}/{readyItems.length} Checklist</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h3 className="font-semibold mb-4">Gap Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Belum Terpenuhi</span>
                  <span className="text-red-400">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Sebagian</span>
                  <span className="text-yellow-400">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Terpenuhi</span>
                  <span className="text-green-400">0</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h3 className="font-semibold mb-4">Persiapan Sertifikasi</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-neutral-500 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Gap Analysis Selesai</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-neutral-500 flex items-center justify-center"></div>
                  <span className="text-sm">Dokumen Diimplementasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-neutral-500 flex items-center justify-center"></div>
                  <span className="text-sm">Audit Internal Dilakukan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-neutral-500 flex items-center justify-center"></div>
                  <span className="text-sm">Temuan Ditutup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-neutral-500 flex items-center justify-center"></div>
                  <span className="text-sm">Audit Sertifikasi</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h3 className="font-semibold mb-4">Bantuan</h3>
              <div className="space-y-2 text-sm text-neutral-400">
                <p>Hubungi konsultan untuk panduan:</p>
                <p className="text-blue-400">consulting@iso-id.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

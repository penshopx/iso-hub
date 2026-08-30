"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";




const stageColors: Record<string, string> = {
  gap_analysis: "bg-yellow-500",
  implementation: "bg-blue-500",
  internal_audit: "bg-purple-500",
  certification: "bg-green-500",
  continual_improvement: "bg-cyan-500",
};

const stageLabels: Record<string, string> = {
  gap_analysis: "Gap Analysis",
  implementation: "Implementasi",
  internal_audit: "Audit Internal",
  certification: "Sertifikasi",
  continual_improvement: "Perbaikan Berkelanjutan",
};

type Certification = {
  id: number;
  standard: string;
  certificationBody: string | null;
  certificateNumber: string | null;
  status: string | null;
};

const CERTIFICATION_STAGES = [
  { label: "Gap Analysis", href: "/kesiapan-proyek", color: "bg-yellow-500" },
  { label: "Implementasi", href: "/dokumen", color: "bg-blue-500" },
  { label: "Audit Internal", href: "/audit", color: "bg-purple-500" },
  { label: "Keputusan Eksternal", href: "/sertifikasi-badan", color: "bg-green-500" },
  { label: "Perbaikan Berkelanjutan", href: "/perubahan", color: "bg-cyan-500" },
];

function getStageColor(stage: string | null): string {
  return stageColors[stage || "gap_analysis"] || "bg-yellow-500";
}

function getStageLabel(stage: string | null): string {
  return stageLabels[stage || "gap_analysis"] || stage || "Unknown";
}

export default function SertifikasiPage() {
  const [roadmaps, setRoadmaps] = useState<Certification[]>([]);

  useEffect(() => {
    fetch('/api/certifications')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRoadmaps(d); })
      .catch(() => {});
  }, []);


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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CERTIFICATION_STAGES.map((stage, index) => (
              <Link
                key={stage.label}
                href={stage.href}
                className="p-4 rounded-lg border border-neutral-700 bg-neutral-800 hover:border-neutral-500 transition-colors"
                data-testid={`link-certification-stage-${index + 1}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stage.color}`}>
                  <span className="font-bold">{index + 1}</span>
                </div>
                <span className="mt-3 block text-sm font-medium">{stage.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg border border-blue-500/30 bg-blue-500/10 text-sm text-blue-100" data-testid="certification-boundary-note">
            ISO Hub membantu menyiapkan dokumen, implementasi, audit internal, dan tindak lanjut. Audit serta keputusan penerbitan sertifikat dilakukan oleh badan sertifikasi atau instansi berwenang yang independen—bukan oleh ISO Hub maupun Gustafta.
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
                  {roadmaps.map((roadmap) => {
                    return (
                      <div key={roadmap.id} className="p-4 bg-neutral-700 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{roadmap.standard}</h4>
                            <p className="text-sm text-neutral-400">
                              {roadmap.certificationBody || "Badan sertifikasi belum dipilih"}
                            </p>
                          </div>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-neutral-600 text-white">
                            {roadmap.status || "active"}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">
                          Nomor sertifikat: {roadmap.certificateNumber || "Belum diterbitkan pihak eksternal"}
                        </p>
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

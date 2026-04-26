"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";


const statusColors: Record<string, string> = {
  draft: "bg-neutral-500",
  review: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

const stageLabels: Record<string, string> = {
  draft: "Draft",
  review: "Dalam Tinjauan",
  approved: "Disetujui",
  rejected: "Ditolak",
};

function getStatusColor(status: string | null): string {
  return statusColors[status || "draft"] || "bg-neutral-500";
}

export default function DokumenPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('/api/iso/documents')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setDocuments(d); })
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
                <h1 className="text-xl font-semibold">Manajemen Dokumen</h1>
                <p className="text-sm text-neutral-400">Kelola dokumen ISO dengan workflow</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Dokumen Baru
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex gap-4">
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">Semua</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Draft</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Review</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Disetujui</button>
        </div>

        <div className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Dokumen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Tipe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">ISO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Versi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-400">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 mb-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>Belum ada dokumen</p>
                      <p className="text-sm">Buat dokumen ISO pertama Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-neutral-750">
                    <td className="px-6 py-4">
                      <div className="font-medium">{doc.title}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{doc.type}</td>
                    <td className="px-6 py-4 text-neutral-400">{doc.isoStandard || "-"}</td>
                    <td className="px-6 py-4 text-neutral-400">v{doc.version}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(doc.status)} text-white`}>
                        {stageLabels[doc.status || "draft"]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString("id-ID") : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h3 className="font-semibold mb-4">Workflow Dokumen</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center text-sm">1</div>
                <div>
                  <div className="text-sm font-medium">Draft</div>
                  <div className="text-xs text-neutral-400">Pembuatan dokumen</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm">2</div>
                <div>
                  <div className="text-sm font-medium">Review</div>
                  <div className="text-xs text-neutral-400">Tinjauan oleh reviewer</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm">3</div>
                <div>
                  <div className="text-sm font-medium">Approved</div>
                  <div className="text-xs text-neutral-400">Disetujui dan released</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h3 className="font-semibold mb-4">Statistik</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Dokumen</span>
                <span className="font-medium">{documents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Draft</span>
                <span className="font-medium">{documents.filter(d => d.status === "draft").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Dalam Review</span>
                <span className="font-medium">{documents.filter(d => d.status === "review").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Disetujui</span>
                <span className="font-medium">{documents.filter(d => d.status === "approved").length}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h3 className="font-semibold mb-4">ISO Standards</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">ISO 45001 - K3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">ISO 14001 - Lingkungan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">ISO 9001 - Mutu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

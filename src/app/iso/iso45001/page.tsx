import Link from "next/link";
import { db } from "@/db";
import { isoDocuments, hazards, incidents } from "@/db/schema";

async function getData() {
  const allDocuments = await db.select().from(isoDocuments);
  const documents = allDocuments.filter(d => d.category === "iso45001");
  const hazardsData = await db.select().from(hazards);
  const incidentsData = await db.select().from(incidents);
  
  return {
    documents: documents.length,
    hazards: hazardsData.length,
    incidents: incidentsData.length,
  };
}

export default async function Iso45001Page() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">ISO 45001 - Sistem Manajemen K3</h1>
              <p className="text-sm text-neutral-400">Keselamatan dan Kesehatan Kerja</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-red-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Dokumen K3</h3>
            <p className="text-sm text-neutral-400 mb-4">Kelola dokumen kebijakan dan prosedur K3</p>
            <div className="text-2xl font-bold text-red-400">{data.documents}</div>
            <div className="text-xs text-neutral-500">dokumen</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-orange-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Identifikasi Bahaya</h3>
            <p className="text-sm text-neutral-400 mb-4">Identifikasi dan evaluasi risiko K3</p>
            <div className="text-2xl font-bold text-orange-400">{data.hazards}</div>
            <div className="text-xs text-neutral-500">identifikasi bahaya</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Insiden K3</h3>
            <p className="text-sm text-neutral-400 mb-4">Pelaporan dan investigasi insiden</p>
            <div className="text-2xl font-bold text-green-400">{data.incidents}</div>
            <div className="text-xs text-neutral-500">insiden</div>
          </div>
        </div>
      </div>
    </main>
  );
}

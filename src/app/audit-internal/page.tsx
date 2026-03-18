import Link from "next/link";
import { db } from "@/db";
import { internalAudits, auditFindings, correctiveActions } from "@/db/schema";

async function getData() {
  const audits = await db.select().from(internalAudits);
  const findings = await db.select().from(auditFindings);
  const actions = await db.select().from(correctiveActions);
  
  return {
    audits: audits.length,
    findings: findings.length,
    actions: actions.length,
  };
}

export default async function AuditInternalPage() {
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
              <h1 className="text-xl font-semibold">Audit Internal</h1>
              <p className="text-sm text-neutral-400">Kelola audit internal ISO</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Jadwal Audit</h3>
            <p className="text-sm text-neutral-400 mb-4">Kelola jadwal audit internal</p>
            <div className="text-2xl font-bold text-purple-400">{data.audits}</div>
            <div className="text-xs text-neutral-500">audit terjadwal</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Temuan Audit</h3>
            <p className="text-sm text-neutral-400 mb-4">Daftar temuan dan ketidaksesuaian</p>
            <div className="text-2xl font-bold text-pink-400">{data.findings}</div>
            <div className="text-xs text-neutral-500">temuan</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-rose-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Tindakan Koreksi</h3>
            <p className="text-sm text-neutral-400 mb-4">Verifikasi dan closing temuan</p>
            <div className="text-2xl font-bold text-rose-400">{data.actions}</div>
            <div className="text-xs text-neutral-500">tindakan koreksi</div>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { db } from "@/db";
import { externalAudits, certifications } from "@/db/schema";

async function getData() {
  const audits = await db.select().from(externalAudits);
  const certs = await db.select().from(certifications);
  
  return {
    audits: audits.length,
    certifications: certs.length,
  };
}

export default async function AuditEksternalPage() {
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
              <h1 className="text-xl font-semibold">Audit Eksternal</h1>
              <p className="text-sm text-neutral-400">Kelola audit eksternal dan sertifikasi</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-orange-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Cari Lembaga</h3>
            <p className="text-sm text-neutral-400 mb-4">Cari dan pilih lembaga sertifikasi</p>
            <div className="text-2xl font-bold text-orange-400">{data.audits}</div>
            <div className="text-xs text-neutral-500">audit terjadwal</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-amber-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Audit Tahunan</h3>
            <p className="text-sm text-neutral-400 mb-4">Jadwal audit surveilans</p>
            <div className="text-2xl font-bold text-amber-400">{data.audits}</div>
            <div className="text-xs text-neutral-500">audit surveilans</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Sertifikasi</h3>
            <p className="text-sm text-neutral-400 mb-4">Status dan renewal sertifikasi</p>
            <div className="text-2xl font-bold text-yellow-400">{data.certifications}</div>
            <div className="text-xs text-neutral-500">sertifikasi aktif</div>
          </div>
        </div>
      </div>
    </main>
  );
}

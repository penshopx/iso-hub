import { Link } from "wouter";

const miniApps = [
  {
    id: 1,
    title: "Kalkulator Risiko",
    description: "Hitung level risiko dengan metode matrix 5x5",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m12-2l.001 2.5m-6-2l.001 2.5",
    color: "bg-red-500",
    category: "Tools",
  },
  {
    id: 2,
    title: "Checklist Audit",
    description: "Buat checklist audit internal sesuai klausul ISO",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    color: "bg-blue-500",
    category: "Audit",
  },
  {
    id: 3,
    title: "Timeline Proyek",
    description: "Buat timeline implementasi ISO dengan milestones",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    color: "bg-purple-500",
    category: "Project",
  },
  {
    id: 4,
    title: "Gap Analysis Tool",
    description: "Evaluasi kesiapan sertifikasi ISO perusahaan",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    color: "bg-green-500",
    category: "Assessment",
  },
  {
    id: 5,
    title: "Cost Calculator",
    description: "Hitung estimasi biaya sertifikasi ISO",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "bg-yellow-500",
    category: "Finance",
  },
  {
    id: 6,
    title: "Document Tracker",
    description: "Lacak status dokumen ISO perusahaan",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "bg-cyan-500",
    category: "Documents",
  },
];

const generalDocs = [
  {
    id: 1,
    title: "Kebijakan Mutu",
    category: "Kebijakan",
    downloads: 1250,
  },
  {
    id: 2,
    title: "Manual Mutu",
    category: "Manual",
    downloads: 980,
  },
  {
    id: 3,
    title: "Prosedur Umum",
    category: "Prosedur",
    downloads: 756,
  },
  {
    id: 4,
    title: "Formulir Umum",
    category: "Formulir",
    downloads: 620,
  },
  {
    id: 5,
    title: "Job Description",
    category: "HR",
    downloads: 450,
  },
  {
    id: 6,
    title: " SOP Produksi",
    category: "SOP",
    downloads: 380,
  },
];

export default function ProduktivitasPage() {
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
              <h1 className="text-xl font-semibold">Produktivitas</h1>
              <p className="text-sm text-neutral-400">Mini Apps & General Documents</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Mini Apps Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Mini Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniApps.map((app) => (
              <div key={app.id} className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 hover:border-neutral-600 transition-colors group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={app.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{app.title}</h3>
                    <p className="text-sm text-neutral-400">{app.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-400">
                      {app.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Documents Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Dokumen Umum</h2>
            <Link href="/dokumen" className="text-blue-400 hover:text-blue-300 text-sm">
              Lihat Semua →
            </Link>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Dokumen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase">Downloads</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-300 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {generalDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-neutral-750">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-medium">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{doc.category}</td>
                    <td className="px-6 py-4 text-neutral-400">{doc.downloads}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Generator */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Generator Dokumen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg">
              <h3 className="font-semibold text-xl mb-3">Generator Kebijakan</h3>
              <p className="text-blue-200 mb-4">Buat dokumen kebijakan ISO otomatis berdasarkan template</p>
              <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Buat Kebijakan
              </button>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-900 to-teal-900 rounded-lg">
              <h3 className="font-semibold text-xl mb-3">Generator SOP</h3>
              <p className="text-green-200 mb-4">Buat prosedur operasi standar dengan mudah</p>
              <button className="px-4 py-2 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors">
                Buat SOP
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors text-left">
              <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Kalender Audit</span>
            </button>
            <button className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors text-left">
              <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Team Auditor</span>
            </button>
            <button className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors text-left">
              <svg className="w-8 h-8 text-yellow-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Laporan Audit</span>
            </button>
            <button className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors text-left">
              <svg className="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">Sertifikat</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

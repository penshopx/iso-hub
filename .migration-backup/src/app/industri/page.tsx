import Link from "next/link";
import { INDUSTRIES, type IndustryType } from "@/lib/industries";

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  teal: "bg-teal-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  slate: "bg-slate-500",
  purple: "bg-purple-500",
  rose: "bg-rose-500",
  cyan: "bg-cyan-500",
  violet: "bg-violet-500",
  lime: "bg-lime-500",
};

const priorityColors: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  low: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30",
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Industri & ISO</h1>
              <p className="text-sm text-neutral-400">Panduan Implementasi ISO per Industri</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Industry Overview */}
        <div className="mb-12 p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">ISO Management System per Industri</h2>
          <p className="text-blue-100 mb-4">
            Setiap industri memiliki kebutuhan ISO yang berbeda-beda. Pilih industri Anda untuk melihat standar yang relevan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#manufacturing" className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Manufaktur
            </Link>
            <Link href="#food" className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
              Pangan
            </Link>
            <Link href="#energy" className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
              Energi
            </Link>
            <Link href="#it" className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
              IT & Telekomunikasi
            </Link>
          </div>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {INDUSTRIES.map((industry) => (
            <div 
              key={industry.id} 
              id={industry.id}
              className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors"
            >
              <div className={`h-2 ${colorClasses[industry.color]}`}></div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 ${colorClasses[industry.color]} rounded-xl flex items-center justify-center text-2xl`}>
                    {industry.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{industry.nameId}</h3>
                    <p className="text-sm text-neutral-400">{industry.name}</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-400 mb-4">{industry.description}</p>

                <div className="mb-4">
                  <h4 className="text-xs font-medium text-neutral-500 uppercase mb-2">Standar ISO Wajib:</h4>
                  <div className="flex flex-wrap gap-2">
                    {industry.isoStandards.filter(s => s.mandatory).slice(0, 3).map((std) => (
                      <span 
                        key={std.isoCode}
                        className={`px-2 py-1 rounded text-xs border ${priorityColors[std.priority]}`}
                      >
                        {std.isoCode}
                      </span>
                    ))}
                    {industry.isoStandards.filter(s => s.mandatory).length > 3 && (
                      <span className="px-2 py-1 text-xs text-neutral-500">
                        +{industry.isoStandards.filter(s => s.mandatory).length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <Link 
                  href={`/industri/${industry.id}`}
                  className="block w-full text-center px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Comparison Table */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
          <div className="p-6 border-b border-neutral-700">
            <h2 className="text-xl font-semibold">Perbandingan Standar ISO per Industri</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">Industri</th>
                  <th className="p-4">ISO 9001</th>
                  <th className="p-4">ISO 14001</th>
                  <th className="p-4">ISO 45001</th>
                  <th className="p-4">ISO 27001</th>
                  <th className="p-4">Standar Spesifik</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRIES.map((industry) => {
                  const has9001 = industry.isoStandards.some(s => s.isoCode === "ISO 9001");
                  const has14001 = industry.isoStandards.some(s => s.isoCode === "ISO 14001");
                  const has45001 = industry.isoStandards.some(s => s.isoCode === "ISO 45001");
                  const has27001 = industry.isoStandards.some(s => s.isoCode === "ISO 27001");
                  const specific = industry.isoStandards.filter(s => 
                    !["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"].includes(s.isoCode)
                  ).map(s => s.isoCode);

                  return (
                    <tr key={industry.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{industry.icon}</span>
                          <span className="font-medium">{industry.nameId}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {has9001 && <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">✓</span>}
                      </td>
                      <td className="p-4">
                        {has14001 && <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">✓</span>}
                      </td>
                      <td className="p-4">
                        {has45001 && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">✓</span>}
                      </td>
                      <td className="p-4">
                        {has27001 && <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">✓</span>}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {specific.slice(0, 2).map(s => (
                            <span key={s} className="px-2 py-0.5 bg-neutral-700 rounded text-xs">{s}</span>
                          ))}
                          {specific.length > 2 && <span className="text-xs text-neutral-500">+{specific.length - 2}</span>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-900/30 border border-blue-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">🔧 Manufaktur & Otomotif</h3>
            <p className="text-sm text-neutral-400 mb-4">IATF 16949, ISO 9001, ISO 14001, ISO 45001</p>
            <Link href="/industri/manufacturing" className="text-blue-400 hover:underline text-sm">Lihat detail →</Link>
          </div>
          <div className="p-6 bg-green-900/30 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">🍔 Pangan & Minuman</h3>
            <p className="text-sm text-neutral-400 mb-4">ISO 22000, FSSC 22000, HACCP, HALAL</p>
            <Link href="/industri/food" className="text-green-400 hover:underline text-sm">Lihat detail →</Link>
          </div>
          <div className="p-6 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">⚡ Energi & Utilities</h3>
            <p className="text-sm text-neutral-400 mb-4">ISO 50001, ISO 9001, ISO 14001</p>
            <Link href="/industri/energy" className="text-yellow-400 hover:underline text-sm">Lihat detail →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

import { Link } from "wouter";

const riskCategories = [
  { name: "Strategis", color: "red", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", count: 12 },
  { name: "Operasional", color: "orange", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", count: 8 },
  { name: "Keuangan", color: "yellow", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", count: 5 },
  { name: "Kepatuhan", color: "blue", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", count: 3 },
  { name: "Reputasi", color: "purple", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", count: 2 },
];

const riskMatrix = [
  { level: "Sangat Tinggi", probability: 5, impact: 5, color: "bg-red-600", count: 2 },
  { level: "Tinggi", probability: 4, impact: 4, color: "bg-red-500", count: 3 },
  { level: "Sedang", probability: 3, impact: 3, color: "bg-yellow-500", count: 8 },
  { level: "Rendah", probability: 2, impact: 2, color: "bg-green-500", count: 12 },
  { level: "Sangat Rendah", probability: 1, impact: 1, "color": "bg-green-400", count: 5 },
];

const risks = [
  { id: "R001", name: "Ketidaksesuaian regulasi lingkungan", kategori: "Kepatuhan", level: "Sangat Tinggi", owner: "Dept. K3L", status: "Open", dueDate: "2026-04-15" },
  { id: "R002", name: "Keterlambatan sertifikasi ISO 9001", kategori: "Operasional", level: "Tinggi", owner: "Quality Assurance", status: "Mitigasi", dueDate: "2026-05-01" },
  { id: "R003", name: "Perubahan regulasi pajak", kategori: "Keuangan", level: "Sedang", owner: "Finance", status: "Monitoring", dueDate: "2026-06-30" },
  { id: "R004", name: "Risiko keamanan siber", kategori: "Strategis", level: "Tinggi", owner: "IT", status: "Mitigasi", dueDate: "2026-04-20" },
  { id: "R005", name: "Keterlibatan supplier dalam korupsi", kategori: "Reputasi", level: "Sedang", owner: "Procurement", status: "Open", dueDate: "2026-05-15" },
];

const levelColors: Record<string, string> = {
  "Sangat Tinggi": "bg-red-600",
  "Tinggi": "bg-red-500", 
  "Sedang": "bg-yellow-500",
  "Rendah": "bg-green-500",
  "Sangat Rendah": "bg-green-400",
};

const categoryColors: Record<string, string> = {
  "Strategis": "text-red-400",
  "Operasional": "text-orange-400",
  "Keuangan": "text-yellow-400",
  "Kepatuhan": "text-blue-400",
  "Reputasi": "text-purple-400",
};

export default function RiskManagementPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Manajemen Risiko ISO 31000</h1>
                <p className="text-sm text-neutral-400">Enterprise Risk Management Dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/risiko/identifikasi" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                + Identifikasi Risiko
              </Link>
              <Link href="/risiko/assessment" className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                Assessment
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Risk Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {riskCategories.map((cat) => (
            <div key={cat.name} className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg bg-${cat.color}-500/20 flex items-center justify-center`}>
                  <svg className={`w-5 h-5 text-${cat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                  </svg>
                </div>
                <span className="text-2xl font-bold">{cat.count}</span>
              </div>
              <p className="text-sm text-neutral-400">{cat.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Risk Matrix */}
          <div className="lg:col-span-2 bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Risk Matrix (ISO 31000)</h2>
            <div className="relative">
              <div className="flex">
                <div className="w-12 flex flex-col justify-center text-xs text-neutral-400 pr-2">
                  <span className="h-8 text-right">Sangat Tinggi</span>
                  <span className="h-8 text-right">Tinggi</span>
                  <span className="h-8 text-right">Sedang</span>
                  <span className="h-8 text-right">Rendah</span>
                  <span className="h-8 text-right">Sangat Rendah</span>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-5 gap-1 mb-1">
                    {[5, 4, 3, 2, 1].map((p) => (
                      <div key={p} className="h-8 bg-neutral-700 rounded flex items-center justify-center text-xs text-neutral-500">
                        {p}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {[
                      [1, 2, 3, 4, 5],
                      [1, 2, 3, 4, 4],
                      [1, 2, 3, 3, 3],
                      [1, 2, 2, 2, 2],
                      [1, 1, 1, 1, 1],
                    ].map((row, ri) => (
                      <div key={ri} className="flex flex-col gap-1">
                        {row.map((cell, ci) => {
                          const isHigh = (ri === 0 && ci >= 3) || (ri === 1 && ci === 4);
                          const isMedium = (ri === 0 && ci === 2) || (ri === 1 && ci >= 2) || (ri === 2 && ci >= 2);
                          return (
                            <div 
                              key={ci} 
                              className={`h-8 rounded flex items-center justify-center text-xs ${
                                isHigh ? "bg-red-500" : isMedium ? "bg-yellow-500" : "bg-green-500"
                              }`}
                            >
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2 text-xs text-neutral-500">
                <span>Probability / Likelihood →</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-xs">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-xs">Low Risk</span>
              </div>
            </div>
          </div>

          {/* Risk Appetite */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Risk Appetite</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Strategis</span>
                  <span className="text-red-400">Very Low</span>
                </div>
                <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Keuangan</span>
                  <span className="text-yellow-400">Low</span>
                </div>
                <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[25%] bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Operasional</span>
                  <span className="text-blue-400">Moderate</span>
                </div>
                <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[50%] bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Inovasi</span>
                  <span className="text-green-400">High</span>
                </div>
                <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-700">
              <h3 className="text-sm font-medium mb-3">KPI Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-neutral-700 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">5</div>
                  <div className="text-xs text-neutral-400">Open Risks</div>
                </div>
                <div className="text-center p-3 bg-neutral-700 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">20</div>
                  <div className="text-xs text-neutral-400">Mitigated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Register */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Risk Register</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search risks..." 
                className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm"
              />
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Categories</option>
                <option>Strategis</option>
                <option>Operasional</option>
                <option>Keuangan</option>
                <option>Kepatuhan</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Risk Description</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                    <td className="p-4 font-mono text-sm">{risk.id}</td>
                    <td className="p-4">{risk.name}</td>
                    <td className="p-4">
                      <span className={categoryColors[risk.kategori]}>{risk.kategori}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${levelColors[risk.level]}`}>
                        {risk.level}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{risk.owner}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        risk.status === "Open" ? "bg-red-500/20 text-red-400" :
                        risk.status === "Mitigasi" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {risk.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-neutral-400">{risk.dueDate}</td>
                    <td className="p-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ISO 31000 Process */}
        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">ISO 31000:2018 Process Framework</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
              <p className="text-sm font-medium">Communication & Consultation</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
              <p className="text-sm font-medium">Scope & Context</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
              <p className="text-sm font-medium">Risk Assessment</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
              <p className="text-sm font-medium">Risk Treatment</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">5</div>
              <p className="text-sm font-medium">Monitoring & Review</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

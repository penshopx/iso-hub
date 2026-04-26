import Link from "next/link";

const kpis = [
  { id: "KPI-001", name: "Customer Satisfaction Score", unit: "%", target: 85, actual: 87, status: "Above", trend: "+2%", category: "Customer" },
  { id: "KPI-002", name: "On-time Delivery Rate", unit: "%", target: 98, actual: 96.5, status: "Below", trend: "-1.5%", category: "Operation" },
  { id: "KPI-003", name: "Defect Rate (PPM)", unit: "ppm", target: 500, actual: 420, status: "Above", trend: "-80", category: "Quality" },
  { id: "KPI-004", name: "Employee Training Hours", unit: "hrs", target: 40, actual: 35, status: "Below", trend: "-5", category: "People" },
  { id: "KPI-005", name: "Incident Rate (LTIF)", unit: "", target: 0.5, actual: 0.42, status: "Above", trend: "-0.08", category: "Safety" },
  { id: "KPI-006", name: "Energy Consumption Reduction", unit: "%", target: 10, actual: 12, status: "Above", trend: "+2%", category: "Environment" },
  { id: "KPI-007", name: "Supplier Performance", unit: "%", target: 90, actual: 92, status: "Above", trend: "+2%", category: "Supply Chain" },
  { id: "KPI-008", name: "Audit Findings Closure", unit: "%", target: 100, actual: 67, status: "Below", trend: "-33%", category: "Compliance" },
];

const performanceByMonth = [
  { month: "Jan", quality: 85, safety: 90, delivery: 88, env: 82 },
  { month: "Feb", quality: 87, safety: 88, delivery: 90, env: 85 },
  { month: "Mar", quality: 89, safety: 92, delivery: 92, env: 88 },
];

const bscPerspectives = [
  { name: "Financial", score: 82, color: "bg-blue-500", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Customer", score: 87, color: "bg-green-500", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { name: "Internal Process", score: 78, color: "bg-yellow-500", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  { name: "Learning & Growth", score: 75, color: "bg-purple-500", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
];

export default function KPIDashboardPage() {
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
                <h1 className="text-xl font-semibold">KPI & Performance</h1>
                <p className="text-sm text-neutral-400">Key Performance Indicators Dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>Q1 2026</option>
                <option>Q4 2025</option>
                <option>Q3 2025</option>
              </select>
              <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* BSC Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {bscPerspectives.map((perspective) => (
            <div key={perspective.name} className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${perspective.color} rounded-lg flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={perspective.icon} />
                  </svg>
                </div>
                <span className={`text-2xl font-bold ${perspective.score >= 80 ? "text-green-400" : perspective.score >= 70 ? "text-yellow-400" : "text-red-400"}`}>
                  {perspective.score}%
                </span>
              </div>
              <p className="font-medium">{perspective.name}</p>
              <div className="mt-2 h-2 bg-neutral-700 rounded-full overflow-hidden">
                <div className={`h-full ${perspective.color} rounded-full`} style={{ width: `${perspective.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Trend */}
          <div className="lg:col-span-2 bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
            <div className="h-64 flex items-end gap-4">
              {performanceByMonth.map((month) => (
                <div key={month.month} className="flex-1 flex gap-2 items-end">
                  <div className="flex-1 bg-blue-500 rounded-t" style={{ height: `${month.quality}%` }}></div>
                  <div className="flex-1 bg-green-500 rounded-t" style={{ height: `${month.safety}%` }}></div>
                  <div className="flex-1 bg-yellow-500 rounded-t" style={{ height: `${month.delivery}%` }}></div>
                  <div className="flex-1 bg-purple-500 rounded-t" style={{ height: `${month.env}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs">Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs">Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-xs">Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-xs">Environment</span>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Overall Performance</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#374151" strokeWidth="12" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="439.8" strokeDashoffset="87.96" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">80%</span>
                  <span className="text-sm text-neutral-400">Target: 85%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Above Target</span>
                <span className="text-green-400">5 KPIs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Below Target</span>
                <span className="text-red-400">3 KPIs</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Table */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">KPI Performance</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search KPIs..." 
                className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm"
              />
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Categories</option>
                <option>Quality</option>
                <option>Safety</option>
                <option>Operation</option>
                <option>Customer</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">KPI ID</th>
                  <th className="p-4">KPI Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Actual</th>
                  <th className="p-4">Achievement</th>
                  <th className="p-4">Trend</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((kpi) => {
                  const achievement = (kpi.actual / kpi.target) * 100;
                  return (
                    <tr key={kpi.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                      <td className="p-4 font-mono text-sm">{kpi.id}</td>
                      <td className="p-4 font-medium">{kpi.name}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-neutral-700 rounded text-xs">{kpi.category}</span>
                      </td>
                      <td className="p-4">{kpi.target}{kpi.unit}</td>
                      <td className="p-4 font-semibold">{kpi.actual}{kpi.unit}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${achievement >= 100 ? "bg-green-500" : "bg-red-500"}`} style={{ width: `${Math.min(achievement, 100)}%` }}></div>
                          </div>
                          <span className="text-sm">{achievement.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-sm ${kpi.trend.startsWith("+") || kpi.trend.startsWith("-") && !kpi.trend.includes("0") ? (kpi.status === "Above" ? "text-green-400" : "text-red-400") : "text-neutral-400"}`}>
                          {kpi.trend}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${kpi.status === "Above" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {kpi.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-8 p-6 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Action Required</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">On-time Delivery</span>
              </div>
              <p className="text-sm text-neutral-400">Actual 96.5% vs Target 98%</p>
              <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">View Analysis →</button>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">Training Hours</span>
              </div>
              <p className="text-sm text-neutral-400">Actual 35 hrs vs Target 40 hrs</p>
              <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">View Analysis →</button>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">Audit Closure</span>
              </div>
              <p className="text-sm text-neutral-400">Actual 67% vs Target 100%</p>
              <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">View Analysis →</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

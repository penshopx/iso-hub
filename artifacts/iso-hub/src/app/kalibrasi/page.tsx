import { Link } from "wouter";

const equipment = [
  { id: "EQ-001", name: "Timbangan Analitik", type: "Measurement", location: "QC Lab", lastCal: "2026-02-15", nextCal: "2026-05-15", status: "Valid", result: "PASS", cert: "CAL-2026-0156" },
  { id: "EQ-002", name: "pH Meter", type: "Measurement", location: "QC Lab", lastCal: "2026-01-20", nextCal: "2026-04-20", status: "Valid", result: "PASS", cert: "CAL-2026-0089" },
  { id: "EQ-003", name: "Thermometer Digital", type: "Temperature", location: "Produksi", lastCal: "2026-03-01", nextCal: "2026-06-01", status: "Valid", result: "PASS", cert: "CAL-2026-0201" },
  { id: "EQ-004", name: "Pressure Gauge", type: "Pressure", location: "Boiler Room", lastCal: "2025-12-10", nextCal: "2026-03-10", status: "Expired", result: "FAIL", cert: "CAL-2025-0456" },
  { id: "EQ-005", name: "Spectrophotometer", type: "Measurement", location: "QC Lab", lastCal: "2026-02-28", nextCal: "2026-05-28", status: "Valid", result: "PASS", cert: "CAL-2026-0178" },
  { id: "EQ-006", name: "Balance", type: "Measurement", location: "Warehouse", lastCal: "2026-01-05", nextCal: "2026-04-05", status: "Due Soon", result: "PASS", cert: "CAL-2026-0034" },
];

const calibrationStats = [
  { label: "Total Equipment", value: 45, color: "text-blue-400" },
  { label: "Valid", value: 38, color: "text-green-400" },
  { label: "Due Soon", value: 4, color: "text-yellow-400" },
  { label: "Expired", value: 3, color: "text-red-400" },
];

const statusColors: Record<string, string> = {
  "Valid": "bg-green-500/20 text-green-400",
  "Expired": "bg-red-500/20 text-red-400",
  "Due Soon": "bg-yellow-500/20 text-yellow-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
};

export default function CalibrationPage() {
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
                <h1 className="text-xl font-semibold">Kalibrasi & Pengukuran</h1>
                <p className="text-sm text-neutral-400">Equipment Calibration Management (ISO 10012)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/kalibrasi/tambah" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                + Tambah Equipment
              </Link>
              <Link href="/kalibrasi/schedule" className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                Jadwal
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {calibrationStats.map((stat) => (
            <div key={stat.label} className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Calendar */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Kalibrasi Mendatang</h2>
            <div className="space-y-3">
              {[
                { month: "Maret 2026", items: [
                  { date: "2026-03-10", equipment: "Pressure Gauge", status: "Expired" },
                  { date: "2026-03-15", equipment: "Stopwatch", status: "Due Soon" },
                ]},
                { month: "April 2026", items: [
                  { date: "2026-04-05", equipment: "Balance", status: "Due Soon" },
                  { date: "2026-04-20", equipment: "pH Meter", status: "Valid" },
                ]},
                { month: "Mei 2026", items: [
                  { date: "2026-05-15", equipment: "Timbangan Analitik", status: "Valid" },
                  { date: "2026-05-28", equipment: "Spectrophotometer", status: "Valid" },
                ]},
              ].map((group) => (
                <div key={group.month}>
                  <h3 className="text-sm font-medium text-neutral-400 mb-2">{group.month}</h3>
                  {group.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-neutral-700/50 rounded mb-1">
                      <span className="text-sm">{item.equipment}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusColors[item.status]}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Equipment by Type */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Equipment by Type</h2>
            <div className="space-y-4">
              {[
                { type: "Measurement", count: 18, percent: "40%" },
                { type: "Temperature", count: 12, percent: "27%" },
                { type: "Pressure", count: 8, percent: "18%" },
                { type: "Electrical", count: 7, percent: "15%" },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.type}</span>
                    <span className="text-neutral-400">{item.count} ({item.percent})</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: item.percent }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traceability */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Traceability Chain</h2>
            <div className="space-y-4">
              <div className="p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-sm">Primary Standard</span>
                </div>
                <p className="text-xs text-neutral-400">NIST / KAN Traceable</p>
              </div>
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-sm">Working Standard</span>
                </div>
                <p className="text-xs text-neutral-400">Lab Reference Equipment</p>
              </div>
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-sm">Test Equipment</span>
                </div>
                <p className="text-xs text-neutral-400">Production / QC Equipment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Equipment Register</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search equipment..." 
                className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm"
              />
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Status</option>
                <option>Valid</option>
                <option>Due Soon</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Equipment Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Last Cal</th>
                  <th className="p-4">Next Cal</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Result</th>
                  <th className="p-4">Certificate</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((eq) => (
                  <tr key={eq.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                    <td className="p-4 font-mono text-sm">{eq.id}</td>
                    <td className="p-4 font-medium">{eq.name}</td>
                    <td className="p-4 text-sm">{eq.type}</td>
                    <td className="p-4 text-sm">{eq.location}</td>
                    <td className="p-4 text-sm">{eq.lastCal}</td>
                    <td className="p-4 text-sm">{eq.nextCal}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[eq.status]}`}>
                        {eq.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${eq.result === "PASS" ? "text-green-400" : "text-red-400"}`}>
                        {eq.result}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm">{eq.cert}</td>
                    <td className="p-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ISO Standards */}
        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Standar Kalibrasi Terkait</h2>
          <div className="flex flex-wrap gap-4">
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium">ISO 10012</h3>
              <p className="text-sm text-neutral-400">Measurement Management</p>
            </div>
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium">ISO/IEC 17025</h3>
              <p className="text-sm text-neutral-400">Testing & Calibration Labs</p>
            </div>
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium">ISO 9001:2015</h3>
              <p className="text-sm text-neutral-400">Clause 7.1.5 - Monitoring Resources</p>
            </div>
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium">ISO 14001:2015</h3>
              <p className="text-sm text-neutral-400">Clause 9.1 - Monitoring Measurement</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

const incidents = [
  { id: "INC-001", type: "Kecelakaan Kerja", severity: "Serious", location: "Plant 1 - Produksi", date: "2026-03-15", status: "Open", reporter: "Ahmad Pratama" },
  { id: "INC-002", type: "Near Miss", severity: "Medium", location: "Gudang", date: "2026-03-14", status: "Investigation", reporter: "Budi Santoso" },
  { id: "INC-003", type: "Pencemaran Limbah", severity: "Major", location: "Area Processing", date: "2026-03-12", status: "Closed", reporter: "Dept. K3L" },
  { id: "INC-004", type: "Kejadian Tidak Aman", severity: "Low", location: "Parking Area", date: "2026-03-10", status: "Closed", reporter: "Security" },
  { id: "INC-005", type: "Fire Incident", severity: "Major", location: "Storage Room", date: "2026-03-08", status: "Closed", reporter: "Dept. K3L" },
];

const severityColors: Record<string, string> = {
  "Serious": "bg-red-500",
  "Major": "bg-orange-500",
  "Medium": "bg-yellow-500",
  "Low": "bg-green-500",
};

const statusColors: Record<string, string> = {
  "Open": "bg-red-500/20 text-red-400",
  "Investigation": "bg-yellow-500/20 text-yellow-400",
  "Closed": "bg-green-500/20 text-green-400",
};

const incidentTypes = [
  { name: "Kecelakaan Kerja", count: 12, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { name: "Near Miss", count: 45, icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Pencemaran Lingkungan", count: 3, icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Property Damage", count: 5, icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  { name: "Fire Incident", count: 2, icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
];

export default function IncidentManagementPage() {
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
                <h1 className="text-xl font-semibold">Manajemen Insiden</h1>
                <p className="text-sm text-neutral-400">Incident Reporting & Investigation System</p>
              </div>
            </div>
            <Link href="/insiden/laporan" className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
              + Laporkan Insiden
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Total Insiden</p>
                <p className="text-2xl font-bold">67</p>
              </div>
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Bulan ini</p>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Open Cases</p>
                <p className="text-2xl font-bold text-red-400">5</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Perlu ditindaklanjuti</p>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Near Miss</p>
                <p className="text-2xl font-bold text-yellow-400">45</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Dicegah sebelum terjadi</p>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">LTIF</p>
                <p className="text-2xl font-bold text-green-400">0.42</p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Lost Time Injury Frequency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Incident Types */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Tipe Insiden</h2>
            <div className="space-y-4">
              {incidentTypes.map((type) => (
                <div key={type.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-neutral-700 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.icon} />
                      </svg>
                    </div>
                    <span className="text-sm">{type.name}</span>
                  </div>
                  <span className="font-semibold">{type.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Severity Distribution */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Distribusi Severity</h2>
            <div className="space-y-4">
              {[
                { label: "Serious", value: 12, color: "bg-red-500" },
                { label: "Major", value: 8, color: "bg-orange-500" },
                { label: "Medium", value: 25, color: "bg-yellow-500" },
                { label: "Low", value: 22, color: "bg-green-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investigation Status */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Status Investigasi</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Open</span>
                  <span className="text-red-400 font-bold">5</span>
                </div>
                <p className="text-xs text-neutral-400">Belum ditindaklanjuti</p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Investigation</span>
                  <span className="text-yellow-400 font-bold">3</span>
                </div>
                <p className="text-xs text-neutral-400">Sedang diinvestigasi</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Closed</span>
                  <span className="text-green-400 font-bold">59</span>
                </div>
                <p className="text-xs text-neutral-400">Selesai dengan CAPA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Table */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Incident Register</h2>
            <div className="flex gap-2">
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Status</option>
                <option>Open</option>
                <option>Investigation</option>
                <option>Closed</option>
              </select>
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Severity</option>
                <option>Serious</option>
                <option>Major</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Tipe</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Lokasi</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Pelapor</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                    <td className="p-4 font-mono text-sm">{incident.id}</td>
                    <td className="p-4">{incident.type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs text-white ${severityColors[incident.severity]}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{incident.location}</td>
                    <td className="p-4 text-sm">{incident.date}</td>
                    <td className="p-4 text-sm">{incident.reporter}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[incident.status]}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CAPA Info */}
        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Corrective Action & Preventive Action (CAPA)</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
              <p className="text-sm font-medium">Root Cause Analysis</p>
              <p className="text-xs text-neutral-400 mt-1">5 Why, Fishbone, FTA</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
              <p className="text-sm font-medium">Corrective Action</p>
              <p className="text-xs text-neutral-400 mt-1">Eliminate root cause</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
              <p className="text-sm font-medium">Preventive Action</p>
              <p className="text-xs text-neutral-400 mt-1">Prevent recurrence</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
              <p className="text-sm font-medium">Effectiveness</p>
              <p className="text-xs text-neutral-400 mt-1">Verify & close</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

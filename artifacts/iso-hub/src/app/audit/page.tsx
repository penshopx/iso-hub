import { Link } from "wouter";

const audits = [
  { id: "AUD-2026-012", type: "Internal", scope: "ISO 9001:2015", dept: "Produksi", status: "Completed", date: "2026-03-10", auditor: "Tim Audit Internal", findings: 5, major: 1, minor: 4, obs: 0 },
  { id: "AUD-2026-011", type: "Internal", scope: "ISO 14001:2015", dept: "K3L", status: "Completed", date: "2026-03-08", auditor: "Tim Audit Internal", findings: 3, major: 0, minor: 2, obs: 1 },
  { id: "AUD-2026-010", type: "External", scope: "Surveillance", dept: "All", status: "Scheduled", date: "2026-03-25", auditor: "Bureau Veritas", findings: 0, major: 0, minor: 0, obs: 0 },
  { id: "AUD-2026-009", type: "Internal", scope: "ISO 45001:2018", dept: "HRD", status: "Completed", date: "2026-02-28", auditor: "Tim Audit Internal", findings: 4, major: 2, minor: 2, obs: 0 },
  { id: "AUD-2026-008", type: "Internal", scope: "ISO 27001:2022", dept: "IT", status: "Draft Report", date: "2026-02-20", auditor: "Tim Audit Internal", findings: 6, major: 1, minor: 3, obs: 2 },
];

const upcomingAudits = [
  { id: 1, type: "Internal", scope: "ISO 9001", dept: "QC Lab", date: "2026-03-20", auditor: "Ahmad, Budi" },
  { id: 2, type: "External", scope: "Surveillance", dept: "All", date: "2026-03-25", auditor: "Bureau Veritas" },
  { id: 3, type: "Internal", scope: "ISO 14001", dept: "Produksi", date: "2026-04-05", auditor: "hmad, Siti" },
  { id: 4, type: "Internal", scope: "ISO 45001", dept: "Maintenance", date: "2026-04-12", auditor: "Budi, Joko" },
];

const findingsByDept = [
  { dept: "Produksi", major: 3, minor: 5, obs: 2 },
  { dept: "QC", major: 1, minor: 4, obs: 1 },
  { dept: "HRD", major: 2, minor: 3, obs: 0 },
  { dept: "IT", major: 1, minor: 3, obs: 2 },
  { dept: "K3L", major: 0, minor: 2, obs: 1 },
];

const statusColors: Record<string, string> = {
  "Completed": "bg-green-500/20 text-green-400",
  "Scheduled": "bg-blue-500/20 text-blue-400",
  "In Progress": "bg-yellow-500/20 text-yellow-400",
  "Draft Report": "bg-purple-500/20 text-purple-400",
  "Open": "bg-red-500/20 text-red-400",
};

export default function AuditManagementPage() {
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
                <h1 className="text-xl font-semibold">Manajemen Audit</h1>
                <p className="text-sm text-neutral-400">Audit Management System (ISO 19011)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/audit/rencana" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                + Rencana Audit
              </Link>
              <Link href="/audit/finding" className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                Findings
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Total Audit</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Open Findings</p>
                <p className="text-2xl font-bold text-red-400">8</p>
              </div>
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Closed</p>
                <p className="text-2xl font-bold text-green-400">16</p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Closure Rate</p>
                <p className="text-2xl font-bold text-yellow-400">67%</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Next Audit</p>
                <p className="text-2xl font-bold text-purple-400">7d</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Upcoming Audits */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Audits</h2>
            <div className="space-y-3">
              {upcomingAudits.map((audit) => (
                <div key={audit.id} className="p-3 bg-neutral-700/50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{audit.scope}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${audit.type === "External" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {audit.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>{audit.dept}</span>
                    <span>{audit.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Findings by Department */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Findings by Department</h2>
            <div className="space-y-3">
              {findingsByDept.map((item) => (
                <div key={item.dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.dept}</span>
                    <span className="text-neutral-400">{item.major + item.minor} findings</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 bg-red-500 rounded" style={{ width: `${(item.major / 10) * 100}%` }}></div>
                    <div className="h-2 bg-yellow-500 rounded" style={{ width: `${(item.minor / 10) * 100}%` }}></div>
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${(item.obs / 10) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded"></div>
                <span>Major</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                <span>Minor</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
                <span>Observation</span>
              </div>
            </div>
          </div>

          {/* Audit Program */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Audit Program 2026</h2>
            <div className="space-y-3">
              {[
                { month: "Q1", internal: 8, external: 1, target: 10 },
                { month: "Q2", internal: 6, external: 1, target: 8 },
                { month: "Q3", internal: 6, external: 1, target: 8 },
                { month: "Q4", internal: 4, external: 2, target: 6 },
              ].map((q) => (
                <div key={q.month}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{q.month}</span>
                    <span className="text-neutral-400">{q.internal + q.external} / {q.target}</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-blue-500" style={{ width: `${(q.internal / q.target) * 100}%` }}></div>
                      <div className="bg-red-500" style={{ width: `${(q.external / q.target) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
                <span>Internal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded"></div>
                <span>External</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit List */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Audit Register</h2>
            <div className="flex gap-2">
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Types</option>
                <option>Internal</option>
                <option>External</option>
              </select>
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Status</option>
                <option>Completed</option>
                <option>Scheduled</option>
                <option>In Progress</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">Audit ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Scope</th>
                  <th className="p-4">Dept</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Auditor</th>
                  <th className="p-4">Major</th>
                  <th className="p-4">Minor</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((audit) => (
                  <tr key={audit.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                    <td className="p-4 font-mono text-sm">{audit.id}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${audit.type === "External" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                        {audit.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{audit.scope}</td>
                    <td className="p-4 text-sm">{audit.dept}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[audit.status]}`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{audit.date}</td>
                    <td className="p-4 text-sm">{audit.auditor}</td>
                    <td className="p-4 text-sm">
                      <span className="text-red-400 font-medium">{audit.major}</span>
                    </td>
                    <td className="p-4 text-sm">
                      <span className="text-yellow-400 font-medium">{audit.minor}</span>
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

        {/* ISO 19011 Process */}
        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">ISO 19011:2018 Audit Process</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
              <p className="text-sm font-medium">Program Audit</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
              <p className="text-sm font-medium">Pelaksanaan Audit</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
              <p className="text-sm font-medium">Temu Finding</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
              <p className="text-sm font-medium">Corrective Action</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">5</div>
              <p className="text-sm font-medium">Tinjauan & Close</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

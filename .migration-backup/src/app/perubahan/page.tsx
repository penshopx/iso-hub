import Link from "next/link";

const changes = [
  { id: "CR-2026-015", title: "Revisi SOP Pengawasan Produksi", type: "Dokumen", scope: "Produksi", requestor: "Dept. Produksi", status: "Approved", date: "2026-03-15", impact: "Medium", approver: "Manager Produksi" },
  { id: "CR-2026-014", title: "Penambahan Mesin Filling Baru", type: "Fasilitas", scope: "Produksi", requestor: "Maintenance", status: "In Review", date: "2026-03-12", impact: "High", approver: "-" },
  { id: "CR-2026-013", title: "Update Form Checklist Audit", type: "Dokumen", scope: "Quality", requestor: "Quality Manager", status: "Pending", date: "2026-03-10", impact: "Low", approver: "-" },
  { id: "CR-2026-012", title: "Perubahan Supplier Bahan Baku", type: "Supplier", scope: "Procurement", requestor: "Purchasing", status: "Approved", date: "2026-03-08", impact: "High", approver: "Dir. Operasional" },
  { id: "CR-2026-011", title: "Revisi Kebijakan Mutu", type: "Dokumen", scope: "All", requestor: "Quality Manager", status: "Closed", date: "2026-02-28", impact: "Medium", approver: "CEO" },
];

const changeStats = [
  { label: "Total Request", value: 24, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "blue" },
  { label: "Pending", value: 3, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "yellow" },
  { label: "In Review", value: 2, icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z", color: "purple" },
  { label: "Approved", value: 16, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "green" },
  { label: "Rejected", value: 3, icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "red" },
];

const impactColors: Record<string, string> = {
  "High": "bg-red-500/20 text-red-400",
  "Medium": "bg-yellow-500/20 text-yellow-400",
  "Low": "bg-green-500/20 text-green-400",
};

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-500/20 text-yellow-400",
  "In Review": "bg-purple-500/20 text-purple-400",
  "Approved": "bg-green-500/20 text-green-400",
  "Rejected": "bg-red-500/20 text-red-400",
  "Closed": "bg-blue-500/20 text-blue-400",
};

export default function ChangeManagementPage() {
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
                <h1 className="text-xl font-semibold">Manajemen Perubahan</h1>
                <p className="text-sm text-neutral-400">Change Control Management (ISO 9001:2015 Cl. 6.3 & 8.1)</p>
              </div>
            </div>
            <Link href="/perubahan/baru" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Ajukan Perubahan
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {changeStats.map((stat) => (
            <div key={stat.label} className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
              <div className="w-10 h-10 bg-neutral-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className={`w-5 h-5 text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Process Flow */}
          <div className="lg:col-span-2 bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Change Control Process</h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
                <p className="text-sm font-medium">Request</p>
                <p className="text-xs text-neutral-400 mt-1">Pengajuan perubahan</p>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
                <p className="text-sm font-medium">Review</p>
                <p className="text-xs text-neutral-400 mt-1">Evaluasi dampak</p>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
                <p className="text-sm font-medium">Approval</p>
                <p className="text-xs text-neutral-400 mt-1">Persetujuan manajemen</p>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
                <p className="text-sm font-medium">Implementation</p>
                <p className="text-xs text-neutral-400 mt-1">Implementasi & verifikasi</p>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">5</div>
                <p className="text-sm font-medium">Close</p>
                <p className="text-xs text-neutral-400 mt-1">Evaluasi efektifitas</p>
              </div>
            </div>
          </div>

          {/* Impact Analysis */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Change Impact</h2>
            <div className="space-y-3">
              {[
                { type: "High Impact", count: 4, desc: "Perlu persetujuan Direksi" },
                { type: "Medium Impact", count: 12, desc: "Perlu persetujuan Manager" },
                { type: "Low Impact", count: 8, desc: "Perlu persetujuan Supervisor" },
              ].map((item) => (
                <div key={item.type} className="p-3 bg-neutral-700/50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-xl font-bold">{item.count}</span>
                  </div>
                  <p className="text-xs text-neutral-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Change Request Table */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Change Request Register</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm"
              />
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Review</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Types</option>
                <option>Dokumen</option>
                <option>Fasilitas</option>
                <option>Supplier</option>
                <option>Process</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">CR No</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Scope</th>
                  <th className="p-4">Impact</th>
                  <th className="p-4">Requestor</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {changes.map((change) => (
                  <tr key={change.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                    <td className="p-4 font-mono text-sm">{change.id}</td>
                    <td className="p-4 font-medium">{change.title}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-neutral-700 rounded text-xs">{change.type}</span>
                    </td>
                    <td className="p-4 text-sm">{change.scope}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${impactColors[change.impact]}`}>
                        {change.impact}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{change.requestor}</td>
                    <td className="p-4 text-sm">{change.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[change.status]}`}>
                        {change.status}
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

        {/* Related ISO Clauses */}
        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">ISO Requirements - Change Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium text-blue-400">ISO 9001:2015</h3>
              <p className="text-sm text-neutral-400 mt-1">Cl. 6.3 - Planning of Changes</p>
              <p className="text-sm text-neutral-400 mt-1">Cl. 8.1 - Operational Planning & Control</p>
            </div>
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium text-green-400">ISO 14001:2015</h3>
              <p className="text-sm text-neutral-400 mt-1">Cl. 6.1 - Actions to Address Risks</p>
              <p className="text-sm text-neutral-400 mt-1">Cl. 8.1 - Operational Control</p>
            </div>
            <div className="p-4 bg-neutral-700/50 rounded-lg">
              <h3 className="font-medium text-yellow-400">ISO 45001:2018</h3>
              <p className="text-sm text-neutral-400 mt-1">Cl. 6.1 - Actions to Address Risks</p>
              <p className="text-sm text-neutral-400 mt-1">Cl. 8.1 - Operational Control</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

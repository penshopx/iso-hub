import Link from "next/link";

const vendors = [
  { id: "V001", name: "PT Sumber Makmur Sejatera", category: "Bahan Baku", rating: 4.8, status: "Approved", certs: ["ISO 9001", "ISO 14001"], lastAudit: "2026-01-15", spend: "2.5M" },
  { id: "V002", name: "CV Jaya Abadi", category: "Peralatan", rating: 4.2, status: "Approved", certs: ["ISO 9001"], lastAudit: "2025-12-10", spend: "850K" },
  { id: "V003", name: "PT Logistik Nusantara", category: "Jasa Pengiriman", rating: 4.5, status: "Approved", certs: ["ISO 9001", "ISO 28000"], lastAudit: "2026-02-20", spend: "1.2M" },
  { id: "V004", name: "PT Chemical Indo", category: "Bahan Kimia", rating: 3.8, status: "Conditional", certs: ["ISO 9001"], lastAudit: "2025-11-05", spend: "620K" },
  { id: "V005", name: "CV Security Protect", category: "Jasa Keamanan", rating: 4.0, status: "Under Review", certs: ["ISO 45001"], lastAudit: "2026-03-01", spend: "340K" },
  { id: "V006", name: "PT Packaging Utama", category: "Packaging", rating: 4.6, status: "Approved", certs: ["ISO 9001", "FSC"], lastAudit: "2026-01-25", spend: "780K" },
];

const statusColors: Record<string, string> = {
  "Approved": "bg-green-500/20 text-green-400",
  "Conditional": "bg-yellow-500/20 text-yellow-400",
  "Under Review": "bg-blue-500/20 text-blue-400",
  "Suspended": "bg-red-500/20 text-red-400",
};

const categories = [
  { name: "Bahan Baku", count: 45, spend: "45%" },
  { name: "Jasa", count: 28, spend: "25%" },
  { name: "Peralatan", count: 18, spend: "15%" },
  { name: "Packaging", count: 12, spend: "10%" },
  { name: "Lainnya", count: 7, spend: "5%" },
];

export default function VendorManagementPage() {
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
                <h1 className="text-xl font-semibold">Manajemen Vendor</h1>
                <p className="text-sm text-neutral-400">Vendor Management System (ISO 28000)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/vendor/tambah" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                + Tambah Vendor
              </Link>
              <Link href="/vendor/evaluasi" className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                Evaluasi
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">110</div>
            <div className="text-sm text-neutral-400">Total Vendor</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-green-400">85</div>
            <div className="text-sm text-neutral-400">Approved</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">12</div>
            <div className="text-sm text-neutral-400">Conditional</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-orange-400">8</div>
            <div className="text-sm text-neutral-400">Due for Audit</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">5</div>
            <div className="text-sm text-neutral-400">New Request</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Category Distribution */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Kategori Vendor</h2>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{cat.name}</span>
                    <span className="text-neutral-400">{cat.count} vendor • {cat.spend}</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: cat.spend }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Risk Assessment</h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">High Risk</span>
                  <span className="text-red-400 font-bold">8</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">Critical suppliers - perlu audit reguler</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Medium Risk</span>
                  <span className="text-yellow-400 font-bold">22</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">Annual verification required</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Low Risk</span>
                  <span className="text-green-400 font-bold">80</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">Periodic self-assessment</p>
              </div>
            </div>
          </div>

          {/* Upcoming Audits */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Vendor Audits</h2>
            <div className="space-y-3">
              {[
                { vendor: "PT Chemical Indo", date: "2026-03-25", type: "Second Party" },
                { vendor: "CV Jaya Abadi", date: "2026-04-10", type: "Second Party" },
                { vendor: "PT Logistik Nusantara", date: "2026-04-20", type: "Process Audit" },
              ].map((audit, idx) => (
                <div key={idx} className="p-3 bg-neutral-700/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{audit.vendor}</span>
                    <span className="text-xs text-neutral-400">{audit.date}</span>
                  </div>
                  <span className="text-xs text-blue-400">{audit.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vendor List */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Vendor Directory</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search vendors..." 
                className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm"
              />
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Status</option>
                <option>Approved</option>
                <option>Conditional</option>
                <option>Under Review</option>
              </select>
              <select className="px-3 py-1.5 bg-neutral-700 border border-neutral-600 rounded-lg text-sm">
                <option>All Categories</option>
                <option>Bahan Baku</option>
                <option>Peralatan</option>
                <option>Jasa</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-750">
                <tr className="text-left text-sm text-neutral-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Nama Vendor</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Sertifikasi</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Audit</th>
                  <th className="p-4">Spend</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-t border-neutral-700 hover:bg-neutral-750">
                    <td className="p-4 font-mono text-sm">{vendor.id}</td>
                    <td className="p-4 font-medium">{vendor.name}</td>
                    <td className="p-4 text-sm">{vendor.category}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {vendor.certs.map((cert) => (
                          <span key={cert} className="px-2 py-0.5 bg-neutral-700 rounded text-xs">{cert}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[vendor.status]}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-neutral-400">{vendor.lastAudit}</td>
                    <td className="p-4 text-sm">${vendor.spend}</td>
                    <td className="p-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ISO 28000 Framework */}
        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">ISO 28000:2022 - Supply Chain Security</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
              <p className="text-sm font-medium">Risk Assessment</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
              <p className="text-sm font-medium">Security Plan</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
              <p className="text-sm font-medium">Vendor Evaluation</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
              <p className="text-sm font-medium">Continuous Improvement</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

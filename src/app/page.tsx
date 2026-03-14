import Link from "next/link";

const menuItems = [
  {
    title: "ISO 45001",
    description: "Sistem Manajemen K3 (Keselamatan dan Kesehatan Kerja)",
    href: "/iso/iso45001",
    color: "bg-red-500",
  },
  {
    title: "ISO 14001",
    description: "Sistem Manajemen Lingkungan",
    href: "/iso/iso14001",
    color: "bg-green-500",
  },
  {
    title: "Pelatihan",
    description: "Modul pelatihan BIMTEK",
    href: "/iso/pelatihan",
    color: "bg-blue-500",
  },
  {
    title: "Audit Internal",
    description: "Kelola audit internal",
    href: "/audit-internal",
    color: "bg-purple-500",
  },
  {
    title: "Audit Eksternal",
    description: "Kelola audit eksternal",
    href: "/audit-eksternal",
    color: "bg-orange-500",
  },
  {
    title: "ISO Generator",
    description: "Generator dokumen ISO",
    href: "/iso-generator",
    color: "bg-cyan-500",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold">Sistem Manajemen ISO</h1>
          <p className="text-sm text-neutral-400">Dashboard Pengelolaan ISO</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg mb-4 flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h2>
              <p className="text-sm text-neutral-400">{item.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Sistem</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-red-400">0</div>
              <div className="text-sm text-neutral-400">Dokumen ISO 45001</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-sm text-neutral-400">Dokumen ISO 14001</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">0</div>
              <div className="text-sm text-neutral-400">Pelatihan BIMTEK</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <div className="text-sm text-neutral-400">Audit Terjadwal</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

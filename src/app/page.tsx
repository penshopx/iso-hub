import Link from "next/link";
import { db } from "@/db";
import { facilitators, knowledgeArticles, services, bookings } from "@/db/schema";

async function getStats() {
  const facs = await db.select().from(facilitators);
  const articles = await db.select().from(knowledgeArticles);
  const servs = await db.select().from(services);
  const book = await db.select().from(bookings);

  return {
    facilitators: facs.length,
    articles: articles.length,
    services: servs.length,
    bookings: book.length,
  };
}

const menuItems = [
  {
    title: "Learning",
    description: "E-course, E-book & Chatbot AI",
    href: "/learning",
    color: "bg-yellow-500",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Produktivitas",
    description: "Mini apps & tools ISO",
    href: "/produktivitas",
    color: "bg-teal-500",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    title: "Risiko",
    description: "Manajemen Risiko ISO 31000",
    href: "/risiko",
    color: "bg-red-500",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    title: "Insiden",
    description: "Pelaporan & Investigasi Insiden",
    href: "/insiden",
    color: "bg-orange-500",
    icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Vendor",
    description: "Manajemen vendor & supplier",
    href: "/vendor",
    color: "bg-emerald-500",
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  },
  {
    title: "Cari Fasilitator",
    description: "Temukan konsultan ISO terpercaya",
    href: "/fasilitator",
    color: "bg-blue-500",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    title: "Badan Sertifikasi",
    description: "Direktori lembaga sertifikasi",
    href: "/sertifikasi-badan",
    color: "bg-indigo-500",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Perpustakaan",
    description: "Artikel & panduan ISO gratis",
    href: "/perpustakaan",
    color: "bg-green-500",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Layanan",
    description: "Pesan konsultasi & pelatihan",
    href: "/layanan",
    color: "bg-purple-500",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "Kalender",
    description: "Kalender kepatuhan & events",
    href: "/kalender-kepatuhan",
    color: "bg-pink-500",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Proyek",
    description: "Kelola proyek konsultansi",
    href: "/proyek",
    color: "bg-cyan-500",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    title: "Dokumen",
    description: "Manajemen dokumen ISO",
    href: "/dokumen",
    color: "bg-gray-500",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Agents",
    description: "AI Agent Control Center",
    href: "/agents",
    color: "bg-rose-500",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "OPC CLAW",
    description: "Multi-agent task orchestration",
    href: "/opc",
    color: "bg-violet-500",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    title: "Audit",
    description: "Manajemen audit internal & eksternal",
    href: "/audit",
    color: "bg-amber-500",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "KPI",
    description: "Key Performance Indicators dashboard",
    href: "/kpi",
    color: "bg-cyan-500",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Kalibrasi",
    description: "Equipment calibration management",
    href: "/kalibrasi",
    color: "bg-lime-500",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Perubahan",
    description: "Change control management",
    href: "/perubahan",
    color: "bg-emerald-500",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

export default async function Home() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold">ISO Hub</h1>
          <p className="text-sm text-neutral-400">Platform conhecimento & layanan ISO Indonesia</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl">
          <h2 className="text-3xl font-bold mb-2">Selamat Datang di ISO Hub</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Platform terbesar Indonesia untuk menemukan fasilitator ISO dan belajar tentang sistem manajemen
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/fasilitator" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Cari Fasilitator
            </Link>
            <Link href="/perpustakaan" className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
              Pelajari ISO
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg mb-4 flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
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
          <h2 className="text-lg font-semibold mb-4">Statistik Platform</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.facilitators || 0}</div>
              <div className="text-sm text-neutral-400">Fasilitator</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">{stats.articles || 6}</div>
              <div className="text-sm text-neutral-400">Artikel</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400">{stats.services || 0}</div>
              <div className="text-sm text-neutral-400">Layanan</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-400">{stats.bookings || 0}</div>
              <div className="text-sm text-neutral-400">Booking</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-green-900 to-blue-900 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Ingin menjadi fasilitator?</h3>
              <p className="text-green-200">
                Daftar dan mulai menerima klien - seperti GoJek/Grab untuk konsultasi ISO!
              </p>
            </div>
            <Link href="/fasilitator/daftar" className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors">
              Daftar Sekarang
            </Link>
          </div>
        </div>

        <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Standar Populer</h2>
          <div className="flex flex-wrap gap-3">
            {["ISO 9001 (Mutu)", "ISO 14001 (Lingkungan)", "ISO 45001 (K3)", "ISO 27001 (Keamanan)", "ISO 37001 (Anti Penyuapan)", "PANCEK (Anti Korupsi)", "ISO 31000 (Risiko)", "IATF 16949 (Manufaktur)", "ISO 22000 (Pangan)", "ISO 50001 (Energi)", "ISO 19443 (Pertambangan)"].map((iso) => (
              <Link 
                key={iso}
                href={`/perpustakaan?iso=${iso}`}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm transition-colors"
              >
                {iso}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";

const menuItems = [
  { title: "Learning", description: "E-course, E-book & Chatbot AI", href: "/learning", color: "bg-yellow-500", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { title: "Produktivitas", description: "Mini apps & tools ISO", href: "/produktivitas", color: "bg-teal-500", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  { title: "Risiko", description: "Manajemen Risiko ISO 31000", href: "/risiko", color: "bg-red-500", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { title: "Insiden", description: "Pelaporan & Investigasi Insiden", href: "/insiden", color: "bg-orange-500", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Vendor", description: "Manajemen vendor & supplier", href: "/vendor", color: "bg-emerald-500", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" },
  { title: "Cari Fasilitator", description: "Temukan konsultan ISO terpercaya", href: "/fasilitator", color: "bg-blue-500", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { title: "Badan Sertifikasi", description: "Direktori lembaga sertifikasi", href: "/sertifikasi-badan", color: "bg-indigo-500", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Perpustakaan", description: "Artikel & panduan ISO gratis", href: "/perpustakaan", color: "bg-green-500", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { title: "Layanan", description: "Pesan konsultasi & pelatihan", href: "/layanan", color: "bg-purple-500", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
  { title: "Kalender", description: "Kalender kepatuhan & events", href: "/kalender-kepatuhan", color: "bg-pink-500", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { title: "Proyek", description: "Kelola proyek konsultansi", href: "/proyek", color: "bg-cyan-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { title: "Dokumen", description: "Manajemen dokumen ISO", href: "/dokumen", color: "bg-slate-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { title: "Audit", description: "Manajemen audit ISO", href: "/audit", color: "bg-violet-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { title: "Sertifikasi", description: "Roadmap & gap analysis", href: "/sertifikasi", color: "bg-amber-500", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { title: "Kalibrasi", description: "Manajemen peralatan & kalibrasi", href: "/kalibrasi", color: "bg-lime-500", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
  { title: "KPI", description: "Key performance indicators", href: "/kpi", color: "bg-sky-500", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "Perubahan", description: "Manajemen perubahan", href: "/perubahan", color: "bg-rose-500", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { title: "Industri", description: "Solusi per industri", href: "/industri", color: "bg-fuchsia-500", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "AI Agents", description: "Agen AI untuk ISO", href: "/agents", color: "bg-blue-600", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "ISO Generator", description: "Generate dokumen ISO dengan AI", href: "/iso-generator", color: "bg-violet-600", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "OPC CLAW", description: "Multi-agent orchestration", href: "/opc", color: "bg-emerald-600", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
];

export default function Home() {
  const [stats, setStats] = useState({ facilitators: 0, articles: 6, services: 0, bookings: 0 });

  useEffect(() => {
    fetch("/api/v1/dashboard")
      .then(r => r.json())
      .then(d => { if (d.stats) setStats(d.stats); })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">ISO Hub</h1>
                <p className="text-xs text-neutral-400">Platform ISO Indonesia</p>
              </div>
            </div>
            <div className="text-xs text-neutral-500">Platform terbesar Indonesia</div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang di ISO Hub</h2>
          <p className="text-neutral-400">Platform lengkap untuk konsultasi, sertifikasi, dan pembelajaran ISO di Indonesia</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer block"
            >
              <div className={`w-10 h-10 ${item.color} rounded-lg mb-3 flex items-center justify-center`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h2 className="font-semibold text-sm mb-1">{item.title}</h2>
              <p className="text-xs text-neutral-400">{item.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Statistik Platform</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.facilitators}</div>
              <div className="text-sm text-neutral-400">Fasilitator</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">{stats.articles}</div>
              <div className="text-sm text-neutral-400">Artikel</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400">{stats.services}</div>
              <div className="text-sm text-neutral-400">Layanan</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-400">{stats.bookings}</div>
              <div className="text-sm text-neutral-400">Booking</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-green-900 to-blue-900 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Ingin menjadi fasilitator?</h3>
              <p className="text-green-200">Daftar dan mulai menerima klien - seperti GoJek/Grab untuk konsultasi ISO!</p>
            </div>
            <Link href="/fasilitator" className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors">
              Daftar Sekarang
            </Link>
          </div>
        </div>

        <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Standar Populer</h2>
          <div className="flex flex-wrap gap-3">
            {["ISO 9001 (Mutu)", "ISO 14001 (Lingkungan)", "ISO 45001 (K3)", "ISO 27001 (Keamanan)", "ISO 37001 (Anti Penyuapan)", "ISO 31000 (Risiko)", "IATF 16949 (Manufaktur)", "ISO 22000 (Pangan)", "ISO 50001 (Energi)"].map((iso) => (
              <Link
                key={iso}
                href="/perpustakaan"
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

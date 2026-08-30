"use client";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// ─── data ────────────────────────────────────────────────────────────────────

const standards = [
  { code: "ISO 9001", label: "Manajemen Mutu", color: "from-blue-500 to-blue-600" },
  { code: "ISO 14001", label: "Lingkungan", color: "from-green-500 to-green-600" },
  { code: "ISO 45001", label: "K3 & Keselamatan", color: "from-orange-500 to-orange-600" },
  { code: "ISO 27001", label: "Keamanan Informasi", color: "from-purple-500 to-purple-600" },
  { code: "ISO 37001", label: "Anti Penyuapan", color: "from-red-500 to-red-600" },
  { code: "ISO 31000", label: "Manajemen Risiko", color: "from-yellow-500 to-yellow-600" },
  { code: "IATF 16949", label: "Manufaktur Otomotif", color: "from-teal-500 to-teal-600" },
  { code: "ISO 22000", label: "Keamanan Pangan", color: "from-lime-500 to-lime-600" },
  { code: "ISO 50001", label: "Manajemen Energi", color: "from-cyan-500 to-cyan-600" },
];

const painPoints = [
  {
    icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    problem: "Proses sertifikasi ISO memakan waktu bertahun-tahun",
    solution: "Dipercepat dengan AI & panduan langkah demi langkah",
  },
  {
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    problem: "Konsultan ISO mahal & sulit ditemukan",
    solution: "Ratusan fasilitator terverifikasi, transparan, & terjangkau",
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    problem: "Dokumen ISO dibuat manual & rawan kesalahan",
    solution: "Generator AI yang menghasilkan dokumen standar dalam hitungan menit",
  },
];

const features = [
  { title: "AI Agents", description: "Agen cerdas yang memandu sertifikasi, gap analysis, dan pembuatan dokumen ISO secara otomatis", href: "/agents", color: "bg-blue-600", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "ISO Generator", description: "Generate dokumen ISO — manual mutu, prosedur, instruksi kerja — siap pakai dalam menit", href: "/iso-generator", color: "bg-violet-600", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Manajemen Risiko", description: "Identifikasi, evaluasi, dan mitigasi risiko sesuai ISO 31000 dengan risk matrix interaktif", href: "/risiko", color: "bg-red-500", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { title: "Audit & Sertifikasi", description: "Kelola jadwal audit internal/eksternal, temuan, dan tindakan korektif dalam satu platform", href: "/audit", color: "bg-violet-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { title: "OPC CLAW", description: "Orkestrasi multi-agent canggih untuk eksekusi tugas ISO secara paralel & cerdas", href: "/opc", color: "bg-emerald-600", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { title: "Learning Center", description: "E-course, e-book, dan sesi mentoring langsung dengan pakar ISO berpengalaman", href: "/learning", color: "bg-yellow-500", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
];

const allMenuItems = [
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

// ─── animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 40);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [stats, setStats] = useState({ facilitators: 0, articles: 6, services: 0, bookings: 0 });

  useEffect(() => {
    fetch("/api/v1/dashboard")
      .then(r => r.json())
      .then(d => { if (d.stats) setStats(d.stats); })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="border-b border-white/5 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">ISO Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
            <Link href="/perpustakaan" className="hover:text-white transition-colors">Perpustakaan</Link>
            <Link href="/fasilitator" className="hover:text-white transition-colors">Fasilitator</Link>
            <Link href="/layanan" className="hover:text-white transition-colors">Layanan</Link>
            <Link href="/agents" className="hover:text-white transition-colors">AI Agents</Link>
          </nav>
          <Link href="/layanan" className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20">
            Mulai Sekarang
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════
          A — ATTENTION: Hero
      ══════════════════════════════════════ */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Platform Tata Kelola ISO #1 di Indonesia
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Operating System
            </span>
            <br />
            Untuk Manajemen ISO Anda
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Lebih dari sekadar AI pembuat dokumen. ISO Hub adalah platform yang menghubungkan{" "}
            <span className="text-white font-medium">kontrol operasional</span>,{" "}
            <span className="text-white font-medium">fasilitator terverifikasi</span>, dan{" "}
            <span className="text-white font-medium">metrik kepatuhan</span>{" "}
            lintas standar dan industri dalam satu ekosistem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/layanan" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-all shadow-xl shadow-blue-500/25 text-base">
              Mulai Konsultasi Gratis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/iso-generator" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all text-base">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Coba ISO Generator
            </Link>
          </div>

          {/* trust bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Gratis untuk mulai
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              9+ standar ISO didukung
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              AI + Konsultan manusia
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          C — COMPARISON: OS vs Document Generator
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-neutral-800 bg-neutral-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Diferensiasi Produk</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bukan Sekadar <span className="text-red-400">AI Pembuat Dokumen</span>
            </h2>
            <p className="text-neutral-400 text-base max-w-2xl mx-auto">
              Pembuatan dokumen otomatis hanyalah langkah awal. Kepatuhan nyata membutuhkan tata kelola insiden, manajemen risiko aktif, serta bimbingan dari ahli yang terverifikasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Document generator category */}
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-300 mb-2">Generator Dokumen ISO</h3>
                <p className="text-sm text-neutral-500">Fokus pada dokumentasi untuk standar atau kebutuhan tertentu</p>
              </div>
              <ul className="space-y-4">
                {[
                  "Mengubah kebutuhan menjadi draf dan template dokumen",
                  "Paling tepat saat kebutuhan utama Anda adalah menyiapkan dokumentasi",
                  "Nilai utamanya ada pada output dokumen yang siap ditinjau",
                  "Ruang lingkup layanan mengikuti standar atau paket yang dipilih",
                  "Belum mencakup seluruh siklus pengelolaan kepatuhan operasional"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500/70 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    <span className="text-sm text-neutral-400 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ISO Hub OS */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-violet-900/20 border border-blue-500/30 shadow-2xl shadow-blue-500/10">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-bl-2xl rounded-tr-xl">
                ISO Hub
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">The ISO Operating System</h3>
                <p className="text-sm text-blue-200">Ekosistem lengkap untuk membangun, menjalankan, & mengukur kepatuhan</p>
              </div>
              <ul className="space-y-4">
                {[
                  "Generator AI terintegrasi dengan tata kelola dokumen end-to-end",
                  "Mendukung berbagai standar (ISO 9001, 14001, 27001, dll) & industri",
                  "Manajemen operasional berkelanjutan (Audit, KPI, Insiden, Risiko)",
                  "Marketplace fasilitator dan direktori badan sertifikasi",
                  "Sistem aktif dengan orkestrasi multi-agent (OPC CLAW) & kalender kepatuhan"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-sm text-white font-medium leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          I — INTEREST: Pain → Solution
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Mengapa ISO Hub?</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Tantangan nyata yang kami <span className="text-blue-400">selesaikan</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-neutral-800/60 border border-neutral-700/50 hover:border-blue-500/30 hover:bg-neutral-800 transition-all">
                <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <p className="text-neutral-400 text-sm mb-3 line-through decoration-red-400/50">{item.problem}</p>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-white text-sm font-medium">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          D — DESIRE: Video Demo
      ══════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">Lihat Langsung</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ISO Hub dalam{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                60 detik
              </span>
            </h2>
            <p className="text-neutral-400 text-base max-w-xl mx-auto">
              Dari dashboard AI hingga manajemen audit — semua yang bisa Anda lakukan di platform kami.
            </p>
          </div>

          {/* video embed */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-700/50 shadow-2xl shadow-black/50 bg-neutral-900">
            {/* decorative top bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-800/80 border-b border-neutral-700/50">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-neutral-500 font-medium">ISO Hub — Platform Showcase</span>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="/iso-hub-promo/"
                className="w-full h-full border-0"
                title="ISO Hub Promo Video"
                allow="autoplay"
              />
            </div>
          </div>

          <p className="text-center text-xs text-neutral-600 mt-4">
            Video animasi — tidak perlu suara untuk memahami fitur utama
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          D — DESIRE: Features + Social Proof
      ══════════════════════════════════════ */}

      {/* Stats */}
      <section className="py-16 px-6 border-y border-neutral-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: stats.facilitators || 50, suffix: "+", label: "Fasilitator Terverifikasi", color: "text-blue-400" },
            { value: 9, suffix: "+", label: "Standar ISO Didukung", color: "text-violet-400" },
            { value: stats.articles || 100, suffix: "+", label: "Artikel & Panduan Gratis", color: "text-green-400" },
            { value: stats.services || 20, suffix: "+", label: "Layanan Tersedia", color: "text-orange-400" },
          ].map((s, i) => (
            <div key={i} className="group">
              <div className={`text-4xl md:text-5xl font-extrabold ${s.color} tabular-nums`}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-neutral-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Fitur Unggulan</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Semua yang Anda butuhkan,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">dalam satu platform</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/80 transition-all cursor-pointer block"
              >
                <div className={`w-12 h-12 ${f.color} rounded-xl mb-4 flex items-center justify-center shadow-lg`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{f.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Lihat selengkapnya
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 px-6 bg-neutral-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">Standar yang Didukung</p>
            <h2 className="text-2xl md:text-3xl font-bold">Mencakup seluruh standar ISO utama</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {standards.map((s) => (
              <Link key={s.code} href="/perpustakaan" className="group flex flex-col items-center p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/50 hover:border-neutral-500 transition-all text-center cursor-pointer">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} mb-2 flex-shrink-0`} />
                <span className="text-xs font-bold text-white">{s.code}</span>
                <span className="text-[10px] text-neutral-500 leading-tight mt-0.5">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          A — ACTION: CTAs
      ══════════════════════════════════════ */}

      {/* Fasilitator CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-violet-700 p-10 md:p-14">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium mb-4">
                  Untuk Konsultan & Perusahaan
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  Bergabung sebagai Fasilitator ISO
                </h3>
                <p className="text-blue-100 text-sm md:text-base max-w-lg leading-relaxed">
                  Jangkau ratusan klien yang butuh konsultasi ISO. Profil terverifikasi, manajemen proyek terintegrasi, dan pembayaran langsung.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/fasilitator" className="px-7 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-xl text-center whitespace-nowrap">
                  Daftar Fasilitator
                </Link>
                <Link href="/sertifikasi-badan" className="px-7 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-sm text-center whitespace-nowrap">
                  Lihat Direktori
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-16 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Jelajahi Semua Modul</h2>
            <p className="text-neutral-400 text-sm mt-2">20+ modul terintegrasi untuk kelola kepatuhan ISO end-to-end</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 bg-neutral-800/60 rounded-xl border border-neutral-700/50 hover:border-neutral-500 hover:bg-neutral-800 transition-all cursor-pointer block group"
              >
                <div className={`w-9 h-9 ${item.color} rounded-lg mb-3 flex items-center justify-center`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm text-white mb-0.5 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-xs text-neutral-500">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Siap raih sertifikasi ISO Anda?
          </h2>
          <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
            Mulai gratis hari ini. Tidak perlu kartu kredit. Konsultan siap membantu dalam 24 jam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/layanan" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-2xl shadow-blue-500/30 text-base">
              Mulai Konsultasi Gratis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/learning" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold rounded-xl transition-all text-base">
              Pelajari ISO Dulu
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-semibold text-neutral-400">ISO Hub</span>
            <span>— Platform ISO #1 Indonesia</span>
          </div>
          <div className="flex gap-5">
            <Link href="/perpustakaan" className="hover:text-neutral-400 transition-colors">Perpustakaan</Link>
            <Link href="/fasilitator" className="hover:text-neutral-400 transition-colors">Fasilitator</Link>
            <Link href="/layanan" className="hover:text-neutral-400 transition-colors">Layanan</Link>
            <Link href="/agents" className="hover:text-neutral-400 transition-colors">AI Agents</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

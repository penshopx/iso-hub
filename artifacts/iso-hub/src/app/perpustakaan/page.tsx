"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";


const categoryColors: Record<string, string> = {
  "Panduan": "bg-blue-500",
  "Template": "bg-green-500",
  "Artikel": "bg-purple-500",
  "FAQ": "bg-yellow-500",
  "Video": "bg-red-500",
};

function getCategoryColor(category: string | null): string {
  return categoryColors[category || "Artikel"] || "bg-gray-500";
}

const sampleArticles = [
  {
    id: 1,
    title: "Apa itu ISO 9001:2015?",
    excerpt: "Panduan lengkap memahami ISO 9001:2015 Sistem Manajemen Mutu",
    category: "Panduan",
    isoStandard: "ISO 9001",
    viewCount: 1250,
    slug: "apa-itu-iso-9001-2015",
  },
  {
    id: 2,
    title: "Langkah Implementasi ISO 14001",
    excerpt: "Tutorial langkah demi langkah implementasi Sistem Manajemen Lingkungan",
    category: "Panduan",
    isoStandard: "ISO 14001",
    viewCount: 980,
    slug: "langkah-implementasi-iso-14001",
  },
  {
    id: 3,
    title: "Template Dokumen ISO 45001",
    excerpt: "Kumpulan template dokumen yang diperlukan untuk sertifikasi ISO 45001",
    category: "Template",
    isoStandard: "ISO 45001",
    viewCount: 756,
    slug: "template-dokumen-iso-45001",
  },
  {
    id: 4,
    title: "Perbedaan ISO 9001:2008 vs 2015",
    excerpt: "Mengetahui perubahan utama antara revisi 2008 dan 2015",
    category: "Artikel",
    isoStandard: "ISO 9001",
    viewCount: 620,
    slug: "perbedaan-iso-9001-2008-2015",
  },
  {
    id: 5,
    title: "FAQ Sertifikasi ISO",
    excerpt: "Jawaban untuk pertanyaan yang sering ditanyakan tentang sertifikasi ISO",
    category: "FAQ",
    isoStandard: null,
    viewCount: 890,
    slug: "faq-sertifikasi-iso",
  },
  {
    id: 6,
    title: "Apa itu KLAUSUL ISO?",
    excerpt: "Memahami struktur klausul dalam standar ISO",
    category: "Panduan",
    isoStandard: null,
    viewCount: 450,
    slug: "apa-itu-klausul-iso",
  },
  {
    id: 7,
    title: "ISO 9001:2015 - Sistem Manajemen Mutu",
    excerpt: "Panduan lengkap ISO 9001:2015 untuk meningkatkan kualitas produk dan layanan",
    category: "Panduan",
    isoStandard: "ISO 9001",
    viewCount: 2100,
    slug: "iso-9001-sistem-manajemen-mutu",
  },
  {
    id: 8,
    title: "7 Prinsip ISO 9001:2015",
    excerpt: "Memahami 7 prinsip manajemen mutu yang menjadi dasar ISO 9001",
    category: "Panduan",
    isoStandard: "ISO 9001",
    viewCount: 890,
    slug: "7-prinsip-iso-9001-2015",
  },
  {
    id: 9,
    title: "ISO 37001:2016 - Sistem Manajemen Anti Penyuapan",
    excerpt: "Panduan lengkap ISO 37001 untuk mencegah dan mendeteksi penyuapan",
    category: "Panduan",
    isoStandard: "ISO 37001",
    viewCount: 650,
    slug: "iso-37001-sistem-manajemen-anti-penyuapan",
  },
  {
    id: 10,
    title: "Langkah Mendapatkan Sertifikasi ISO 9001",
    excerpt: "Tutorial step-by-step untuk mendapatkan sertifikasi ISO 9001",
    category: "Panduan",
    isoStandard: "ISO 9001",
    viewCount: 1100,
    slug: "langkah-mendapatkan-sertifikasi-iso-9001",
  },
  {
    id: 11,
    title: "ISO 37001 vs ISO 37003 - Apa Bedanya?",
    excerpt: "Membandingkan standar ISO 37001 dan ISO 37003 untuk management sertifikasi",
    category: "Artikel",
    isoStandard: "ISO 37001",
    viewCount: 320,
    slug: "iso-37001-vs-iso-37003",
  },
  {
    id: 12,
    title: "Template Dokumen ISO 9001",
    excerpt: "Download template dokumen ISO 9001 siap pakai",
    category: "Template",
    isoStandard: "ISO 9001",
    viewCount: 950,
    slug: "template-dokumen-iso-9001",
  },
  {
    id: 13,
    title: "PANCEK - Panduan Cegah Korupsi",
    excerpt: "Panduan nasional Indonesia untuk sistem manajemen anti korupsi berbasiskan kinerja",
    category: "Panduan",
    isoStandard: "PANCEK",
    viewCount: 580,
    slug: "pancek-panduan-cegah-korupsi",
  },
  {
    id: 14,
    title: "Perbedaan ISO 37001 dan PANCEK",
    excerpt: "Membandingkan standar internasional ISO 37001 dengan standar nasional PANCEK",
    category: "Artikel",
    isoStandard: "PANCEK",
    viewCount: 420,
    slug: "perbedaan-iso-37001-dan-pancek",
  },
  {
    id: 15,
    title: "Langkah Implementasi PANCEK",
    excerpt: "Tutorial implementasi Panduan Cegah Korupsi untuk organisasi di Indonesia",
    category: "Panduan",
    isoStandard: "PANCEK",
    viewCount: 350,
    slug: "langkah-implementasi-pancek",
  },
  // Manufaktur
  {
    id: 16,
    title: "IATF 16949 - Sistem Manajemen Mutu Otomotif",
    excerpt: "Panduan implementasi IATF 16949 untuk industri manufaktur otomotive",
    category: "Panduan",
    isoStandard: "IATF 16949",
    viewCount: 680,
    slug: "iatf-16949-sistem-manajemen-mutu-otomotif",
  },
  {
    id: 17,
    title: "ISO 13485 - Perangkat Medis",
    excerpt: "Sistem manajemen mutu untuk industri perangkat medis sesuai regulasi",
    category: "Panduan",
    isoStandard: "ISO 13485",
    viewCount: 520,
    slug: "iso-13485-perangkat-medis",
  },
  {
    id: 18,
    title: "ISO 22000 - Keamanan Pangan",
    excerpt: "Implementasi Sistem Manajemen Keamanan Pangan untuk industri makanan",
    category: "Panduan",
    isoStandard: "ISO 22000",
    viewCount: 450,
    slug: "iso-22000-keamanan-pangan",
  },
  // Energi
  {
    id: 19,
    title: "ISO 50001 - Sistem Manajemen Energi",
    excerpt: "Panduan implementasi ISO 50001 untuk efisiensi energi perusahaan",
    category: "Panduan",
    isoStandard: "ISO 50001",
    viewCount: 380,
    slug: "iso-50001-sistem-manajemen-energi",
  },
  {
    id: 20,
    title: "ISO 50015 - Energi Listrik",
    excerpt: "Standar pengukuran dan verifikasi kinerja energi",
    category: "Artikel",
    isoStandard: "ISO 50001",
    viewCount: 220,
    slug: "iso-50015-energi-listrik",
  },
  // Pertambangan
  {
    id: 21,
    title: "ISO 19443 - Sistem Manajemen Mutu Pertambangan",
    excerpt: "Panduan implementasi ISO 19443 untuk industri pertambangan",
    category: "Panduan",
    isoStandard: "ISO 19443",
    viewCount: 290,
    slug: "iso-19443-pertambangan",
  },
  {
    id: 22,
    title: "ISO 31000 - Manajemen Risiko",
    excerpt: "Panduan manajemen risiko untuk semua industri termasuk pertambangan",
    category: "Panduan",
    isoStandard: "ISO 31000",
    viewCount: 560,
    slug: "iso-31000-manajemen-risiko",
  },
];

export default function PerpustakaanPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/iso/documents')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setArticles(d); })
      .catch(() => {});
  }, []);

  const displayArticles = articles.length > 0 ? articles : sampleArticles;

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Perpustakaan ISO</h1>
                <p className="text-sm text-neutral-400">Pengetahuan sistem manajemen ISO</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              +Tulis Artikel
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang di Perpustakaan ISO</h2>
          <p className="text-blue-200 mb-4">
            Pusat pengetahuan lengkap tentang sistem manajemen ISO. Pelajari,download template, dan raih sertifikasi!
          </p>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Cari artikel, template, atau panduan..." 
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 flex-1"
            />
            <button className="px-6 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50">
              Cari
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">Semua</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Panduan</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Template</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Artikel</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">FAQ</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Video</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/perpustakaan/${article.slug || article.id}`}
              className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)} text-white`}>
                    {article.category}
                  </span>
                  {article.isoStandard && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-neutral-700 text-neutral-300">
                      {article.isoStandard}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{article.viewCount} dilihat</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold">Panduan Lengkap</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Tutorial langkah demi langkah implementasi ISO dari awal hingga sertifikasi.
            </p>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold">Template Dokumen</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Download template dokumen ISO siap pakai untuk perusahaan Anda.
            </p>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold"> Tanya Jawab</h3>
            </div>
            <p className="text-sm text-neutral-400">
              FAQ dan jawaban dari pertanyaan umum tentang sertifikasi ISO.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h3 className="font-semibold mb-4">Kategori Standar</h3>
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

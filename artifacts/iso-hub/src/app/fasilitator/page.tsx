"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";



const isoBadges: Record<string, string> = {
  "ISO 9001": "bg-blue-500",
  "ISO 14001": "bg-green-500",
  "ISO 45001": "bg-red-500",
  "ISO 27001": "bg-purple-500",
  "ISO 37001": "bg-yellow-600",
  "PANCEK": "bg-orange-600",
  "IATF 16949": "bg-indigo-600",
  "ISO 22000": "bg-teal-600",
  "ISO 50001": "bg-amber-600",
  "ISO 19443": "bg-slate-600",
  "ISO 31000": "bg-pink-600",
};

function getIsoBadge(iso: string | null): string {
  return isoBadges[iso || "ISO 9001"] || "bg-gray-500";
}

export default function FasilitatorPage() {
  const [facilitatorsList, setFacilitatorsList] = useState([]);

  useEffect(() => {
    fetch('/api/certifications')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setFacilitatorsList(d); })
      .catch(() => {});
  }, []);


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
                <h1 className="text-xl font-semibold">Direktori Fasilitator</h1>
                <p className="text-sm text-neutral-400">Temukan konsultan ISO terpercaya</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Daftar Jadi Fasilitator
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Cari fasilitator..." 
            className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 flex-1 min-w-64"
          />
          <select className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
            <option>Semua ISO</option>
            <option>ISO 9001</option>
            <option>ISO 14001</option>
            <option>ISO 45001</option>
            <option>ISO 27001</option>
            <option>ISO 37001</option>
            <option>PANCEK</option>
            <option>IATF 16949 (Manufaktur)</option>
            <option>ISO 22000 (Pangan)</option>
            <option>ISO 50001 (Energi)</option>
            <option>ISO 19443 (Pertambangan)</option>
          </select>
          <select className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
            <option>Semua Lokasi</option>
            <option>Jakarta</option>
            <option>Surabaya</option>
            <option>Bandung</option>
            <option>Online</option>
          </select>
        </div>

        <div className="mb-8 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-300">Ingin menjadi fasilitator?</h3>
              <p className="text-sm text-blue-200">Daftar dan mulai menerima klien - seperti GoJek untuk konsultasi ISO!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilitatorsList.length === 0 ? (
            <div className="col-span-full p-12 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Belum Ada Fasilitator</h3>
              <p className="text-neutral-400 mb-4">Jadilah fasilitator pertama di platform ini</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">
                Daftar Sekarang
              </button>
            </div>
          ) : (
            facilitatorsList.map((facilitator) => {
              const certs = facilitator.isoCertifications ? facilitator.isoCertifications.split(",") : [];
              
              return (
                <div key={facilitator.id} className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center text-2xl font-bold">
                        {facilitator.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{facilitator.name}</h3>
                        <p className="text-sm text-neutral-400">{facilitator.location || "Indonesia"}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium">{facilitator.rating || 0}</span>
                          <span className="text-sm text-neutral-500">({facilitator.reviewCount || 0} review)</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                      {facilitator.bio || "Fasilitator ISO profesional dengan pengalaman bertahun-tahun."}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {certs.map((cert) => (
                        <span key={cert} className={`px-2 py-1 rounded text-xs font-medium ${getIsoBadge(cert)} text-white`}>
                          {cert.trim()}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-400">
                        {facilitator.experience || 0} tahun pengalaman
                      </span>
                      <Link 
                        href={`/fasilitator/${facilitator.id}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Lihat Profil
                      </Link>
                    </div>
                  </div>
                
                </div>
              );
            })
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Bagaimana Cara Kerjanya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Cari</h3>
              <p className="text-sm text-neutral-400">Temukan fasilitator sesuai kebutuhan ISO Anda</p>
            </div>
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Pilih</h3>
              <p className="text-sm text-neutral-400">Pilih layanan dan hubungi fasilitator</p>
            </div>
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Booking</h3>
              <p className="text-sm text-neutral-400">Jadwalkan konsultasi atau pelatihan</p>
            </div>
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Sertifikasi</h3>
              <p className="text-sm text-neutral-400">Dapatkan sertifikasi ISO bersama kami</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

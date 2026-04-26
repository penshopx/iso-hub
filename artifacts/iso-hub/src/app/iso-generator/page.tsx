"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";


export default function IsoGeneratorPage() {
  const [data, setData] = useState({"generated":0,"templates":0});

  useEffect(() => {
    fetch('/api/iso/documents')
      .then(r => r.json())
      .then(d => {
        if (d && typeof d === 'object' && !Array.isArray(d)) setData(prev => ({...prev, ...d}));
      })
      .catch(() => {});
  }, []);


  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">ISO Generator</h1>
              <p className="text-sm text-neutral-400">Generator dokumen ISO</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Kebijakan ISO</h3>
            <p className="text-sm text-neutral-400 mb-4">Generate kebijakan mutu dan lingkungan</p>
            <button className="text-sm text-blue-400 hover:text-blue-300">Buat Dokumen</button>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-sky-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Prosedur</h3>
            <p className="text-sm text-neutral-400 mb-4">Generate prosedur operasional</p>
            <button className="text-sm text-blue-400 hover:text-blue-300">Buat Prosedur</button>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-teal-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Formulir</h3>
            <p className="text-sm text-neutral-400 mb-4">Generate formulir dokumen</p>
            <button className="text-sm text-blue-400 hover:text-blue-300">Buat Formulir</button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h3 className="font-semibold mb-4">Dokumen yang Telah Dibuat</h3>
          <div className="text-3xl font-bold text-cyan-400">{data.generated}</div>
          <div className="text-sm text-neutral-500">dokumen dihasilkan</div>
        </div>
      </div>
    </main>
  );
}

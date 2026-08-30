"use client";
import { useState, useEffect } from "react";
import { Link } from "wouter";


export default function Iso14001Page() {
  const [data, setData] = useState({ documents: 0, aspects: 0, monitoring: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/iso/documents').then(r => r.json()).catch(() => []),
      fetch('/api/iso/hazards').then(r => r.json()).catch(() => []),
    ]).then(([docs, hazards]) => {
      const documents = Array.isArray(docs) ? docs : docs?.data;
      setData({
        documents: Array.isArray(documents) ? documents.length : 0,
        aspects: Array.isArray(hazards) ? hazards.length : 0,
        monitoring: Array.isArray(documents) ? documents.filter(d => d.status === 'approved').length : 0,
      });
    });
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
              <h1 className="text-xl font-semibold">ISO 14001 - Sistem Manajemen Lingkungan</h1>
              <p className="text-sm text-neutral-400">Environmental Management System</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Dokumen Lingkungan</h3>
            <p className="text-sm text-neutral-400 mb-4">Kelola dokumen kebijakan dan prosedur lingkungan</p>
            <div className="text-2xl font-bold text-green-400">{data.documents}</div>
            <div className="text-xs text-neutral-500">dokumen</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-teal-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Aspek Dampak Lingkungan</h3>
            <p className="text-sm text-neutral-400 mb-4">Identifikasi dan evaluasi aspek lingkungan</p>
            <div className="text-2xl font-bold text-teal-400">{data.aspects}</div>
            <div className="text-xs text-neutral-500">aspek lingkungan</div>
          </div>

          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Pemantauan Lingkungan</h3>
            <p className="text-sm text-neutral-400 mb-4">Monitoring dan pengukuran parameter lingkungan</p>
            <div className="text-2xl font-bold text-emerald-400">{data.monitoring}</div>
            <div className="text-xs text-neutral-500">data monitoring</div>
          </div>
        </div>
      </div>
    </main>
  );
}

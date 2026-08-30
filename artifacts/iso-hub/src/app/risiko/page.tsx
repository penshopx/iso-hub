"use client";
import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { classifyRisk, normalizeRiskStatus, type RiskStatus } from "@workspace/api-zod";

type Risk = {
  id: string | number;
  code: string;
  name: string;
  description: string;
  context: string;
  standard: string;
  category: string;
  probability: number;
  impact: number;
  riskLevel: string;
  controls: string;
  owner: string;
  status: string;
  mitigation: string;
  dueDate: string;
  residualProbability?: number;
  residualImpact?: number;
  residualRiskLevel?: string;
  updatedAt?: string;
};

const SlideOver = ({ isOpen, onClose, title, children, width = "max-w-md" }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`relative w-full ${width} bg-[#0a0a0a] border-l border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#111]">
          <h3 className="font-semibold text-sm tracking-wide text-white uppercase">{title}</h3>
          <button onClick={onClose} className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-700">
          {children}
        </div>
      </div>
    </div>
  );
};

function getScoreColor(score: number) {
  if (score >= 16) return "bg-red-950/60 text-red-500 border border-red-900/50";
  if (score >= 10) return "bg-orange-950/60 text-orange-500 border border-orange-900/50";
  if (score >= 5) return "bg-yellow-950/40 text-yellow-500 border border-yellow-900/30";
  return "bg-emerald-950/40 text-emerald-500 border border-emerald-900/30";
}

function getMatrixCellColor(score: number) {
  if (score >= 16) return "bg-red-900/60 text-red-100 border-red-800";
  if (score >= 10) return "bg-orange-900/60 text-orange-100 border-orange-800";
  if (score >= 5) return "bg-yellow-900/40 text-yellow-100 border-yellow-800/50";
  return "bg-emerald-900/40 text-emerald-100 border-emerald-800/50";
}

const riskStatusLabels: Record<RiskStatus, string> = {
  open: "Open",
  mitigating: "Mitigasi",
  closed: "Closed",
};

function getRiskStatusClass(status: unknown): string {
  const normalized = normalizeRiskStatus(status);
  if (normalized === "open") return "bg-red-900/20 text-red-500 border-red-900/50";
  if (normalized === "mitigating") return "bg-blue-900/20 text-blue-400 border-blue-900/50";
  return "bg-emerald-900/20 text-emerald-500 border-emerald-900/50";
}

export default function RisikoPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Risk>>({});
  const [saving, setSaving] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const fetchRisks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/qms/risks');
      if (res.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (!res.ok) throw new Error('Gagal memuat daftar risiko');
      const json = await res.json();
      setRisks(json.data || (Array.isArray(json) ? json : []));
    } catch(err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRisks(); }, []);

  const handleSaveRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `/api/qms/risks/${formData.id}` : '/api/qms/risks';
      const method = isEdit ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Gagal menyimpan risiko');
      }

      await fetchRisks();
      setFormOpen(false);
      setFormData({});
      if (selectedRisk && isEdit) {
        setSelectedRisk(null);
      }
    } catch (err: any) {
      if (err.status === 401) setError(err as Error);
      else alert(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setSaving(false);
    }
  };

  const getRiskMatrixCounts = () => {
    const matrix = Array(5).fill(0).map(() => Array(5).fill(0));
    risks.forEach(r => {
      const p = Math.max(1, Math.min(5, Math.round(r.probability || 1)));
      const i = Math.max(1, Math.min(5, Math.round(r.impact || 1)));
      matrix[5 - p][i - 1] += 1;
    });
    return matrix;
  };

  if (error && (error as any).status === 401) {
    const returnTo = typeof window !== 'undefined' ? encodeURIComponent(window.location.pathname) : '';
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
        <div className="max-w-sm w-full bg-[#111] border border-neutral-800 rounded-xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold mb-2">Akses Terbatas</h1>
          <p className="text-sm text-neutral-400 mb-8">Sesi Anda telah berakhir atau Anda belum login. Silakan masuk untuk melanjutkan.</p>
          <a href={`/api/login?returnTo=${returnTo}`} className="block w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded transition-colors">
            Masuk ke Akun
          </a>
        </div>
      </main>
    );
  }

  const matrixData = getRiskMatrixCounts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-neutral-800 bg-[#111]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold tracking-wide">Register Risiko</h1>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">ISO 31000 Risk Management</p>
            </div>
          </div>
          <button onClick={() => { setFormData({ status: "open" }); setFormOpen(true); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-bold tracking-wide transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            + Identifikasi Risiko
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {error && (error as any).status !== 401 && (
          <div className="mb-6 p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-red-400 text-sm flex items-start justify-between">
            <div>
              <div className="font-bold mb-1">Gagal memuat data</div>
              <div className="text-red-400/80">{error.message}</div>
            </div>
            <button onClick={fetchRisks} className="text-xs font-medium bg-red-900/40 hover:bg-red-900/60 px-3 py-1.5 rounded transition-colors">Coba Lagi</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Heatmap Matrix */}
          <div className="lg:col-span-1 bg-[#111] border border-neutral-800 rounded-xl p-5 shadow-2xl">
            <h2 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Risk Heatmap</h2>
            <div className="flex items-end">
              <div className="flex flex-col gap-1 items-center justify-center mr-2">
                <span className="text-[10px] text-neutral-600 uppercase tracking-widest writing-vertical -rotate-180 mb-2">Probabilitas</span>
              </div>
              <div className="flex flex-col gap-1">
                {matrixData.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1">
                    <div className="w-5 flex items-center justify-center text-[10px] font-mono text-neutral-600 mr-1">
                      {5 - rowIndex}
                    </div>
                    {row.map((count, colIndex) => {
                      const score = (5 - rowIndex) * (colIndex + 1);
                      const bg = getMatrixCellColor(score);
                      return (
                        <div key={colIndex} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs font-bold rounded ${bg} border border-black/50 transition-transform hover:scale-105`}>
                          {count > 0 ? count : ''}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="flex gap-1 mt-1">
                  <div className="w-5 mr-1"></div>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 sm:w-12 flex items-center justify-center text-[10px] font-mono text-neutral-600">{i}</div>
                  ))}
                </div>
                <div className="text-center text-[10px] text-neutral-600 uppercase tracking-widest mt-2 ml-6">
                  Dampak
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Sangat Tinggi", count: risks.filter(r => classifyRisk(r.probability, r.impact) === "critical").length, color: "text-red-500", border: "border-red-900/30" },
              { label: "Tinggi", count: risks.filter(r => classifyRisk(r.probability, r.impact) === "high").length, color: "text-orange-500", border: "border-orange-900/30" },
              { label: "Sedang", count: risks.filter(r => classifyRisk(r.probability, r.impact) === "medium").length, color: "text-yellow-500", border: "border-yellow-900/30" },
              { label: "Rendah", count: risks.filter(r => classifyRisk(r.probability, r.impact) === "low").length, color: "text-emerald-500", border: "border-emerald-900/30" },
            ].map((stat, i) => (
              <div key={i} className={`bg-[#111] border ${stat.border} rounded-xl p-5 flex flex-col justify-between`}>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">{stat.label}</div>
                <div className={`text-4xl font-light tracking-tight ${stat.color}`}>{stat.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-sm">
            <thead className="bg-[#161616] border-b border-neutral-800">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest w-16">ID</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Risiko</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Inherent &rarr; Residual</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Kategori / Owner</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-8"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-3/4"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-24"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-20"></div></td>
                    <td className="px-5 py-4 flex justify-end"><div className="h-4 bg-neutral-800 rounded w-16"></div></td>
                  </tr>
                ))
              ) : risks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-neutral-500">
                    <div className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <p className="text-sm">Tidak ada data risiko yang ditemukan.</p>
                  </td>
                </tr>
              ) : (
                risks.map((risk) => {
                  const inherent = (risk.probability || 1) * (risk.impact || 1);
                  const residual = (risk.residualProbability || risk.probability || 1) * (risk.residualImpact || risk.impact || 1);
                  return (
                    <tr key={risk.id} onClick={() => setSelectedRisk(risk)} className="group hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                      <td className="px-5 py-3 align-middle font-mono text-[10px] text-neutral-500">
                        {risk.code || String(risk.id).slice(0,6)}
                      </td>
                      <td className="px-5 py-3 align-middle max-w-sm">
                        <div className="font-medium text-neutral-200 group-hover:text-blue-400 transition-colors mb-0.5 truncate">{risk.name}</div>
                        <div className="text-[10px] text-neutral-500 truncate">{risk.description}</div>
                      </td>
                      <td className="px-5 py-3 align-middle">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest ${getScoreColor(inherent)}`}>
                            {inherent}
                          </span>
                          <span className="text-neutral-600">&rarr;</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest ${getScoreColor(residual)}`}>
                            {residual}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 align-middle">
                        <div className="text-neutral-300">{risk.category}</div>
                        <div className="text-[10px] text-neutral-500">{risk.owner}</div>
                      </td>
                      <td className="px-5 py-3 align-middle text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${getRiskStatusClass(risk.status)}`}>
                          {riskStatusLabels[normalizeRiskStatus(risk.status)]}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form / Edit Modal */}
      <SlideOver isOpen={formOpen} onClose={() => setFormOpen(false)} title={formData.id ? "Edit Risiko" : "Identifikasi Risiko"} width="max-w-xl">
        <form onSubmit={handleSaveRisk} className="flex flex-col h-full">
          <div className="space-y-6 flex-1">
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Nama Risiko</label>
                <input required type="text" value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Deskripsi</label>
                <textarea required rows={2} value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all leading-relaxed" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Konteks</label>
                  <input required value={formData.context || ""} onChange={e => setFormData({...formData, context: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" placeholder="Proyek, proses, atau lokasi" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Standar</label>
                  <select required value={formData.standard || ""} onChange={e => setFormData({...formData, standard: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none">
                    <option value="">Pilih...</option>
                    <option value="ISO 9001">ISO 9001</option>
                    <option value="ISO 14001">ISO 14001</option>
                    <option value="ISO 45001">ISO 45001</option>
                    <option value="ISO 39001">ISO 39001</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Kategori</label>
                  <select required value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all">
                    <option value="">Pilih...</option>
                    <option value="Strategis">Strategis</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Kepatuhan">Kepatuhan</option>
                    <option value="Reputasi">Reputasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Owner</label>
                  <input required type="text" value={formData.owner || ""} onChange={e => setFormData({...formData, owner: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#111] border border-neutral-800 rounded-xl space-y-4">
              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Inherent Risk (Skala 1-5)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Probabilitas</label>
                  <input required type="number" min="1" max="5" value={formData.probability || ""} onChange={e => setFormData({...formData, probability: parseInt(e.target.value)})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Dampak</label>
                  <input required type="number" min="1" max="5" value={formData.impact || ""} onChange={e => setFormData({...formData, impact: parseInt(e.target.value)})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none font-mono" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-neutral-800">
              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Mitigasi & Status</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Status</label>
                  <select required value={normalizeRiskStatus(formData.status)} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none">
                    <option value="open">Open</option>
                    <option value="mitigating">Mitigasi</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Target Selesai</label>
                  <input type="date" value={formData.dueDate ? formData.dueDate.split('T')[0] : ""} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" style={{ colorScheme: 'dark' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Kontrol Berjalan</label>
                <textarea rows={2} value={formData.controls || ""} onChange={e => setFormData({...formData, controls: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Langkah Mitigasi</label>
                <textarea rows={2} value={formData.mitigation || ""} onChange={e => setFormData({...formData, mitigation: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none leading-relaxed" />
              </div>
            </div>

            <div className="p-4 bg-[#111] border border-neutral-800 rounded-xl space-y-4">
              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Residual Risk (Opsional)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Residual Probabilitas</label>
                  <input type="number" min="1" max="5" value={formData.residualProbability || ""} onChange={e => setFormData({...formData, residualProbability: parseInt(e.target.value)})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Residual Dampak</label>
                  <input type="number" min="1" max="5" value={formData.residualImpact || ""} onChange={e => setFormData({...formData, residualImpact: parseInt(e.target.value)})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none font-mono" />
                </div>
              </div>
            </div>

          </div>
          <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-end gap-3">
            <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider">Batal</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider">
              {saving && <span className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>}
              {formData.id ? 'Simpan' : 'Buat Risiko'}
            </button>
          </div>
        </form>
      </SlideOver>

      {/* Detail View */}
      <SlideOver isOpen={!!selectedRisk && !formOpen} onClose={() => setSelectedRisk(null)} title="Detail Risiko" width="max-w-lg">
        {selectedRisk && (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-6">
              
              <div className="bg-[#161616] border border-neutral-800 p-5 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-bold text-white leading-tight">{selectedRisk.name}</h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${getRiskStatusClass(selectedRisk.status)}`}>
                    {riskStatusLabels[normalizeRiskStatus(selectedRisk.status)]}
                  </span>
                </div>
                <div className="text-xs text-neutral-400 font-mono mb-4">ID: {selectedRisk.code || selectedRisk.id}</div>
                <p className="text-sm text-neutral-300 leading-relaxed">{selectedRisk.description}</p>
                <p className="text-xs text-neutral-500 mt-3">{selectedRisk.context} &bull; {selectedRisk.standard}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111] border border-neutral-800 p-4 rounded-xl">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Inherent Risk</div>
                  <div className="text-2xl font-mono text-white mb-1">
                    {(selectedRisk.probability||1) * (selectedRisk.impact||1)}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    P{selectedRisk.probability||1} &times; I{selectedRisk.impact||1}
                  </div>
                </div>
                <div className="bg-[#111] border border-neutral-800 p-4 rounded-xl">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Residual Risk</div>
                  <div className="text-2xl font-mono text-white mb-1">
                    {(selectedRisk.residualProbability || selectedRisk.probability || 1) * (selectedRisk.residualImpact || selectedRisk.impact || 1)}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    P{selectedRisk.residualProbability || selectedRisk.probability || 1} &times; I{selectedRisk.residualImpact || selectedRisk.impact || 1}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-neutral-800 overflow-hidden rounded-xl border border-neutral-800">
                <div className="bg-[#0a0a0a] p-4">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Kategori</div>
                  <div className="text-sm text-neutral-200">{selectedRisk.category}</div>
                </div>
                <div className="bg-[#0a0a0a] p-4">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Owner</div>
                  <div className="text-sm text-neutral-200">{selectedRisk.owner}</div>
                </div>
                <div className="bg-[#0a0a0a] p-4 col-span-2">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Target Selesai</div>
                  <div className="text-sm text-neutral-200 font-mono">{selectedRisk.dueDate ? new Date(selectedRisk.dueDate).toLocaleDateString('id-ID') : '-'}</div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Kontrol Berjalan</h4>
                <div className="p-4 bg-[#111] border border-neutral-800 rounded-xl text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {selectedRisk.controls || 'Belum ada kontrol tercatat.'}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Langkah Mitigasi</h4>
                <div className="p-4 bg-[#111] border border-neutral-800 rounded-xl text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {selectedRisk.mitigation || 'Belum ada mitigasi tercatat.'}
                </div>
              </div>

            </div>
            
            <div className="mt-8 pt-4 border-t border-neutral-800">
              <button onClick={() => { setFormData(selectedRisk); setFormOpen(true); }} className="w-full px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] text-white text-xs font-bold rounded-lg transition-colors border border-neutral-800 uppercase tracking-wider flex justify-center items-center gap-2">
                Edit Risiko
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
            </div>
          </div>
        )}
      </SlideOver>

    </main>
  );
}

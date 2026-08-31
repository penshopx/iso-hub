"use client";
import React, { useState, useEffect } from "react";
import { Link } from "wouter";

type Document = {
  id: string | number;
  title: string;
  type: string;
  category: string;
  isoStandard: string;
  content: string;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  version: string;
  authorId?: string;
  authorName?: string;
  reviewerId?: string | null;
  approverId?: string | null;
  reviewerName?: string | null;
  approverName?: string | null;
  reviewer?: string;
  approver?: string;
  reviewDueDate?: string;
  reviewedAt?: string;
  approvedAt?: string;
  distributedAt?: string;
  changeSummary?: string;
  updatedAt: string;
  createdAt: string;
};

type Revision = {
  id: string | number;
  documentId: string | number;
  version: string;
  changeSummary: string;
  status: string;
  actorId?: string | null;
  actorName?: string | null;
  createdAt: string;
};

type TeamMember = {
  userId: string;
  name: string;
  email?: string | null;
  role: 'author' | 'reviewer' | 'approver';
  status: string;
};

const statusColors: Record<string, string> = {
  draft: "bg-neutral-800 text-neutral-300 border-neutral-700",
  review: "bg-blue-900/40 text-blue-400 border-blue-800/50",
  approved: "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
  rejected: "bg-red-900/40 text-red-400 border-red-800/50",
};

const stageLabels: Record<string, string> = {
  draft: "Draft",
  review: "Dalam Tinjauan",
  approved: "Disetujui",
  rejected: "Ditolak",
};

function getStatusBadge(status: string | null) {
  const safeStatus = status || "draft";
  const colorClass = statusColors[safeStatus] || statusColors.draft;
  return `inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${colorClass}`;
}

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

export default function DokumenPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Document>>({});
  const [saving, setSaving] = useState(false);

  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [history, setHistory] = useState<Revision[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [workflowError, setWorkflowError] = useState<string | null>(null);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState<"reviewer" | "approver">("reviewer");
  const [memberSaving, setMemberSaving] = useState(false);
  const [memberMessage, setMemberMessage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/iso/documents');
      if (res.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (!res.ok) throw new Error('Gagal memuat data dokumen');
      const json = await res.json();
      setDocuments(json.data || (Array.isArray(json) ? json : []));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('/api/iso/team-members');
      if (res.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (!res.ok) throw new Error('Gagal memuat anggota tim');
      const json = await res.json();
      setTeamMembers(json.data || []);
    } catch (err: any) {
      if (err.status === 401) setError(err as Error);
      else console.error(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/user');
      if (!res.ok) return;
      const json = await res.json();
      setCurrentUserId(json.user?.id || null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMember = async () => {
    if (!memberEmail.trim()) return;
    setMemberSaving(true);
    setMemberMessage(null);
    try {
      const res = await fetch('/api/iso/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: memberEmail.trim(), role: memberRole }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Gagal menambahkan anggota tim');
      await fetchTeamMembers();
      setMemberEmail("");
      setMemberMessage(`${json.data?.name || 'Anggota'} ditambahkan sebagai ${memberRole}.`);
    } catch (err: any) {
      setMemberMessage(err.message || 'Gagal menambahkan anggota tim');
    } finally {
      setMemberSaving(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchTeamMembers();
    fetchCurrentUser();
  }, []);

  const loadHistory = async (id: string | number) => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/iso/documents/${id}/history`);
      if (res.ok) {
        const json = await res.json();
        setHistory(json.data || (Array.isArray(json) ? json : []));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `/api/iso/documents/${formData.id}` : '/api/iso/documents';
      const method = isEdit ? 'PATCH' : 'POST';
      
      const payload = {
        title: formData.title,
        type: formData.type,
        category: formData.category,
        isoStandard: formData.isoStandard,
        content: formData.content,
        reviewerId: formData.reviewerId || null,
        approverId: formData.approverId || null,
        reviewDueDate: formData.reviewDueDate || undefined,
        changeSummary: formData.changeSummary || undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const error = new Error(errData.error || errData.message || 'Gagal menyimpan dokumen') as Error & { code?: string };
        error.code = errData.code;
        throw error;
      }

      await fetchDocuments();
      setFormOpen(false);
      setFormData({});
    } catch (err: any) {
      if (err.status === 401) setError(err as Error);
      else alert(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id: string | number, newStatus: string, changeSummary?: string) => {
    setWorkflowError(null);
    try {
      const res = await fetch(`/api/iso/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, changeSummary: changeSummary || `Status diubah menjadi ${newStatus}` })
      });
      if (res.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const error = new Error(errData.error || errData.message || 'Gagal memproses perubahan status') as Error & { code?: string };
        error.code = errData.code;
        throw error;
      }
      
      const json = await res.json();
      await fetchDocuments();
      if (selectedDoc && selectedDoc.id === id) {
        setSelectedDoc(json.data || { ...selectedDoc, status: newStatus as any });
        loadHistory(id);
      }
    } catch (err: any) {
      if (err.status === 401) setError(err as Error);
      else setWorkflowError(err.message || 'Terjadi kesalahan sistem');
    }
  };

  const membersForRole = (role: TeamMember["role"]) => {
    const seen = new Set<string>();
    return teamMembers.filter((member) => {
      if (member.role !== role || seen.has(member.userId)) return false;
      seen.add(member.userId);
      return true;
    });
  };

  const openDetail = (doc: Document) => {
    setWorkflowError(null);
    setSelectedDoc(doc);
    loadHistory(doc.id);
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

  const filteredDocs = activeFilter === "Semua" ? documents : documents.filter(d => stageLabels[d.status || 'draft'] === activeFilter);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-neutral-800 bg-[#111]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold tracking-wide">Pusat Dokumen ISO</h1>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">Control & Distribution / v2.4</p>
            </div>
          </div>
          <button onClick={() => { setFormData({}); setFormOpen(true); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-bold tracking-wide transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            + Dokumen Baru
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Error Banner */}
        {error && (error as any).status !== 401 && (
          <div className="mb-6 p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-red-400 text-sm flex items-start justify-between">
            <div>
              <div className="font-bold mb-1">Gagal memuat data</div>
              <div className="text-red-400/80">{error.message}</div>
            </div>
            <button onClick={fetchDocuments} className="text-xs font-medium bg-red-900/40 hover:bg-red-900/60 px-3 py-1.5 rounded transition-colors">Coba Lagi</button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: documents.length, color: 'text-white' },
            { label: 'Draft', value: documents.filter(d => d.status === 'draft').length, color: 'text-neutral-400' },
            { label: 'Review', value: documents.filter(d => d.status === 'review').length, color: 'text-blue-400' },
            { label: 'Disetujui', value: documents.filter(d => d.status === 'approved').length, color: 'text-emerald-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#111] border border-neutral-800 p-4 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">{stat.label}</span>
              <span className={`text-3xl font-light tracking-tight ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {["Semua", "Draft", "Dalam Tinjauan", "Disetujui", "Ditolak"].map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-sm">
            <thead className="bg-[#161616] border-b border-neutral-800">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Judul Dokumen</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Tipe / Kategori</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Versi</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-right text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-3/4"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-1/2"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-8"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-neutral-800 rounded w-16"></div></td>
                    <td className="px-5 py-4 flex justify-end"><div className="h-4 bg-neutral-800 rounded w-20"></div></td>
                  </tr>
                ))
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-neutral-500">
                    <div className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-sm">Tidak ada dokumen yang ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} onClick={() => openDetail(doc)} className="group hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                    <td className="px-5 py-3 align-middle">
                      <div className="font-medium text-neutral-200 group-hover:text-blue-400 transition-colors mb-0.5">{doc.title}</div>
                      <div className="text-[10px] text-neutral-500 font-mono tracking-wide">{doc.isoStandard || "-"}</div>
                    </td>
                    <td className="px-5 py-3 align-middle">
                      <div className="text-neutral-300">{doc.type}</div>
                      <div className="text-[10px] text-neutral-500">{doc.category}</div>
                    </td>
                    <td className="px-5 py-3 align-middle">
                      <span className="font-mono text-xs text-neutral-400">v{doc.version || '1.0'}</span>
                    </td>
                    <td className="px-5 py-3 align-middle">
                      <span className={getStatusBadge(doc.status)}>{stageLabels[doc.status]}</span>
                    </td>
                    <td className="px-5 py-3 align-middle text-right text-xs text-neutral-500 font-mono">
                      {doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString("id-ID") : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form SlideOver */}
      <SlideOver isOpen={formOpen} onClose={() => setFormOpen(false)} title={formData.id ? "Edit Dokumen" : "Buat Dokumen Baru"} width="max-w-lg">
        <form onSubmit={handleSave} className="flex flex-col h-full">
          <div className="space-y-5 flex-1">
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Judul Dokumen</label>
              <input required type="text" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder-neutral-700" placeholder="Misal: SOP Audit Internal" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Tipe</label>
                <select required value={formData.type || ""} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all">
                  <option value="">Pilih Tipe</option>
                  <option value="Manual">Manual</option>
                  <option value="Prosedur">Prosedur</option>
                  <option value="Instruksi Kerja">Instruksi Kerja</option>
                  <option value="Form">Form</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Kategori</label>
                <input required type="text" value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder-neutral-700" placeholder="Ops, HR, IT..." />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Standar ISO</label>
              <select required value={formData.isoStandard || ""} onChange={e => setFormData({...formData, isoStandard: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all">
                <option value="">Pilih Standar</option>
                <option value="ISO 9001:2015">ISO 9001:2015</option>
                <option value="ISO 14001:2015">ISO 14001:2015</option>
                <option value="ISO 45001:2018">ISO 45001:2018</option>
                <option value="ISO 27001:2022">ISO 27001:2022</option>
              </select>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-[#111] p-4">
              <div className="mb-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Tambahkan Anggota Tim</div>
                <p className="mt-1 text-xs text-neutral-500">Gunakan email akun ISO Hub yang sudah pernah masuk.</p>
              </div>
              <div className="grid grid-cols-[1fr_120px_auto] gap-2">
                <input
                  type="email"
                  value={memberEmail}
                  onChange={e => setMemberEmail(e.target.value)}
                  className="min-w-0 bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
                  placeholder="anggota@perusahaan.com"
                />
                <select
                  value={memberRole}
                  onChange={e => setMemberRole(e.target.value as "reviewer" | "approver")}
                  className="bg-[#0a0a0a] border border-neutral-800 rounded-lg px-2 py-2 text-sm text-white focus:border-blue-500 outline-none"
                >
                  <option value="reviewer">Reviewer</option>
                  <option value="approver">Approver</option>
                </select>
                <button
                  type="button"
                  disabled={memberSaving || !memberEmail.trim()}
                  onClick={handleAddMember}
                  className="rounded-lg bg-neutral-800 px-3 py-2 text-xs font-bold text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {memberSaving ? '...' : 'Tambah'}
                </button>
              </div>
              {memberMessage && <p className="mt-2 text-xs text-blue-300">{memberMessage}</p>}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Reviewer</label>
              <select value={formData.reviewerId || ""} onChange={e => setFormData({...formData, reviewerId: e.target.value || null})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all">
                <option value="">Pilih reviewer sebelum mengajukan review</option>
                {membersForRole("reviewer").map(member => (
                  <option key={member.userId} value={member.userId}>{member.name}{member.email ? ` — ${member.email}` : ''}</option>
                ))}
              </select>
              {membersForRole("reviewer").length === 0 && (
                <p className="mt-2 text-xs text-amber-400">Belum ada anggota tim dengan role reviewer aktif.</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Approver</label>
                <select value={formData.approverId || ""} onChange={e => setFormData({...formData, approverId: e.target.value || null})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all">
                  <option value="">Pilih approver</option>
                  {membersForRole("approver")
                    .filter(member => member.userId !== (formData.authorId || currentUserId))
                    .map(member => (
                      <option key={member.userId} value={member.userId}>{member.name}{member.email ? ` — ${member.email}` : ''}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Batas Review</label>
                <input type="date" value={formData.reviewDueDate ? formData.reviewDueDate.split("T")[0] : ""} onChange={e => setFormData({...formData, reviewDueDate: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>
            {formData.id && (
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Ringkasan Perubahan</label>
                <input type="text" value={formData.changeSummary || ""} onChange={e => setFormData({...formData, changeSummary: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all" placeholder="Apa yang berubah pada revisi ini?" />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Konten / Ringkasan</label>
              <textarea required rows={5} value={formData.content || ""} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder-neutral-700 font-mono leading-relaxed" placeholder="Isi detail dokumen di sini..." />
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-end gap-3">
            <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider">Batal</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider">
              {saving && <span className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>}
              {formData.id ? 'Simpan' : 'Buat'}
            </button>
          </div>
        </form>
      </SlideOver>

      {/* Detail SlideOver */}
      <SlideOver isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)} title="Detail & Workflow" width="max-w-2xl">
        {selectedDoc && (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
              
              <div className="bg-[#161616] border border-neutral-800 p-5 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1 leading-tight">{selectedDoc.title}</h2>
                    <p className="text-xs text-neutral-400 font-mono">ID: {String(selectedDoc.id).split('-')[0]} &bull; v{selectedDoc.version || '1.0'} &bull; {selectedDoc.isoStandard}</p>
                  </div>
                  <span className={getStatusBadge(selectedDoc.status)}>{stageLabels[selectedDoc.status]}</span>
                </div>
                <div className="grid grid-cols-2 gap-px bg-neutral-800 overflow-hidden rounded-lg">
                  <div className="bg-[#0a0a0a] p-3">
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Pembuat</div>
                    <div className="text-sm text-neutral-200">{selectedDoc.authorName || selectedDoc.authorId || '-'}</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3">
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Reviewer</div>
                    <div className="text-sm text-neutral-200">{selectedDoc.reviewerName || selectedDoc.reviewer || 'Belum ditugaskan'}</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3">
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Approver</div>
                    <div className="text-sm text-neutral-200">{selectedDoc.approverName || selectedDoc.approver || 'Belum ditugaskan'}</div>
                  </div>
                  <div className="bg-[#0a0a0a] p-3">
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Tipe / Kategori</div>
                    <div className="text-sm text-neutral-200">{selectedDoc.type} &mdash; {selectedDoc.category}</div>
                  </div>
                </div>
                {(!selectedDoc.reviewerId || !selectedDoc.approverId) && (
                  <div className="mt-3 rounded-lg border border-amber-900/60 bg-amber-950/30 px-3 py-2 text-xs text-amber-300">
                    Dokumen belum dapat diajukan: reviewer dan approver berbasis identitas user harus ditugaskan terlebih dahulu.
                  </div>
                )}
                {selectedDoc.status === 'rejected' && selectedDoc.changeSummary && (
                  <div className="mt-3 rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-400">Alasan Penolakan</div>
                    <p className="mt-1 text-sm text-red-200">{selectedDoc.changeSummary}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Konten Dokumen</h4>
                <div className="p-4 bg-[#111] border border-neutral-800 rounded-xl text-sm text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {selectedDoc.content || 'Tidak ada konten tercatat.'}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Riwayat Revisi
                  {historyLoading && <span className="w-3 h-3 border border-neutral-500 border-t-transparent rounded-full animate-spin"></span>}
                </h4>
                <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-neutral-800 ml-1">
                  {history.length === 0 && !historyLoading ? (
                    <div className="pl-8 text-xs text-neutral-500 py-2">Belum ada riwayat tercatat.</div>
                  ) : (
                    history.map((rev, i) => (
                      <div key={rev.id} className="relative pl-8 py-3">
                        <div className={`absolute left-0 top-4 w-[23px] h-[23px] rounded-full border-4 border-[#0a0a0a] flex items-center justify-center ${i===0 ? 'bg-blue-500' : 'bg-neutral-600'}`}></div>
                        <div className="bg-[#111] border border-neutral-800 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-white">v{rev.version} &bull; <span className="font-normal text-neutral-400">{rev.status.toUpperCase()}</span></span>
                            <span className="text-[10px] text-neutral-500 font-mono">{new Date(rev.createdAt).toLocaleDateString('id-ID')}</span>
                          </div>
                          <p className="text-xs text-neutral-400">{rev.changeSummary}</p>
                           <p className="mt-1 text-[10px] text-neutral-500">Pelaku: {rev.actorName || rev.actorId || 'Tidak diketahui'}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Workflow Actions */}
            <div className="mt-8 pt-4 border-t border-neutral-800">
              {workflowError && (
                <div role="alert" className="mb-3 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-300">
                  <div className="font-bold text-red-400">Tindakan ditolak</div>
                  <div className="mt-0.5">{workflowError}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {selectedDoc.status === 'draft' && selectedDoc.authorId === currentUserId && (
                  <>
                    <button onClick={() => { setFormData(selectedDoc); setFormOpen(true); }} className="px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider border border-neutral-800">Edit Draft</button>
                    <button disabled={!selectedDoc.reviewerId || !selectedDoc.approverId} onClick={() => handleStatusChange(selectedDoc.id, 'review')} className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-40">Ajukan Review</button>
                  </>
                )}
                {selectedDoc.status === 'review' && selectedDoc.reviewerId === currentUserId && (
                  <button onClick={() => {
                    const reason = prompt("Alasan penolakan:");
                    if (reason?.trim()) handleStatusChange(selectedDoc.id, 'rejected', reason.trim());
                  }} className="px-4 py-3 bg-red-950 hover:bg-red-900 text-red-400 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider border border-red-900/50">Tolak</button>
                )}
                {selectedDoc.status === 'review' && selectedDoc.approverId === currentUserId && (
                  <button onClick={() => handleStatusChange(selectedDoc.id, 'approved')} className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)]">Setujui</button>
                )}
                {(selectedDoc.status === 'approved' || selectedDoc.status === 'rejected') && selectedDoc.authorId === currentUserId && (
                  <button onClick={() => {
                    const summary = prompt("Alasan revisi:");
                    if (summary !== null) handleStatusChange(selectedDoc.id, 'draft', summary || 'Revisi dokumen');
                  }} className="col-span-2 px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] text-white text-xs font-bold rounded-lg transition-colors border border-neutral-800 flex items-center justify-between uppercase tracking-wider">
                    <span>Revisi (Kembali ke Draft)</span>
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                  </button>
                )}
                {selectedDoc.status === 'review' && selectedDoc.reviewerId !== currentUserId && selectedDoc.approverId !== currentUserId && (
                  <div className="col-span-2 rounded-lg border border-neutral-800 bg-[#111] px-3 py-3 text-xs text-neutral-400">
                    Menunggu tindakan reviewer atau approver yang ditugaskan.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </main>
  );
}

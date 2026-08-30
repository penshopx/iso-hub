import { useMemo, useState } from "react";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Info, 
  ShieldCheck, 
  FileText, 
  Activity, 
  ExternalLink,
  Target,
  AlertTriangle,
  FolderOpen,
  PieChart,
  BookOpen,
  Building2,
  Users,
  ArrowRight,
  RefreshCw
} from "lucide-react";

type NeedType = "tender" | "proyek" | "audit";
type ChecklistItem = {
  id: string;
  standardId: string;
  label: string;
  module: string;
  needTypes: NeedType[];
};

const NEED_TYPES: Array<{id: NeedType; label: string; description: string}> = [
  { 
    id: "tender", 
    label: "Tender Baru", 
    description: "Persiapan dokumen kepatuhan untuk pengajuan tender." 
  },
  { 
    id: "proyek", 
    label: "Proyek Berjalan", 
    description: "Pemenuhan syarat operasional proyek konstruksi aktif." 
  },
  { 
    id: "audit", 
    label: "Persiapan Audit", 
    description: "Pengecekan kesiapan sebelum audit eksternal/sertifikasi." 
  }
];

const STANDARDS = [
  { id: "iso9001", label: "ISO 9001 (Mutu)" },
  { id: "iso14001", label: "ISO 14001 (Lingkungan)" },
  { id: "iso45001", label: "ISO 45001 (K3)" },
  { id: "iso39001", label: "ISO 39001 (Lalu Lintas)" }
];

const ALL_NEEDS: NeedType[] = ["tender", "proyek", "audit"];

const MODULE_LABELS: Record<string, string> = {
  "/audit": "Audit",
  "/dokumen": "Dokumen",
  "/insiden": "Insiden",
  "/kpi": "KPI",
  "/layanan": "Layanan",
  "/perpustakaan": "Regulasi",
  "/proyek": "Proyek",
  "/risiko": "Risiko",
};

const MANAGEMENT_FLOW = [
  {
    title: "Kesiapan",
    description: "Nilai konteks, standar, dan gap awal.",
    links: [
      { href: "/kesiapan-proyek", label: "Penilaian" },
      { href: "/proyek", label: "Proyek" },
    ],
  },
  {
    title: "Implementasi",
    description: "Kelola bukti, kontrol, dan pihak terkait.",
    links: [
      { href: "/dokumen", label: "Dokumen" },
      { href: "/vendor", label: "Vendor" },
    ],
  },
  {
    title: "Audit",
    description: "Uji penerapan dan tindak lanjuti temuan.",
    links: [
      { href: "/audit", label: "Audit & CAPA" },
    ],
  },
  {
    title: "Perbaikan berkelanjutan",
    description: "Pantau kinerja dan kelola perubahan.",
    links: [
      { href: "/kpi", label: "KPI" },
      { href: "/perubahan", label: "Perubahan" },
    ],
  },
];

const CHECKLIST_DB: ChecklistItem[] = [
  { id: "c1", standardId: "iso9001", label: "Manual Mutu & Kebijakan Mutu telah tersedia dan disahkan manajemen puncak", module: "/dokumen", needTypes: ALL_NEEDS },
  { id: "c2", standardId: "iso9001", label: "Sasaran Mutu (KPI) spesifik proyek telah ditetapkan dan diukur pencapaiannya", module: "/kpi", needTypes: ALL_NEEDS },
  { id: "c3", standardId: "iso9001", label: "Prosedur Pengendalian Dokumen & Rekaman (termasuk drawing proyek) diimplementasikan", module: "/dokumen", needTypes: ALL_NEEDS },
  { id: "c4", standardId: "iso14001", label: "Dokumen Identifikasi Aspek & Dampak Lingkungan (IADL) proyek telah diperbarui", module: "/risiko", needTypes: ALL_NEEDS },
  { id: "c5", standardId: "iso14001", label: "Prosedur Tanggap Darurat Tumpahan Limbah/B3 telah disosialisasikan", module: "/insiden", needTypes: ["proyek", "audit"] },
  { id: "c6", standardId: "iso45001", label: "Identifikasi Bahaya & Penilaian Risiko (HIRADC/JSA) mencakup seluruh pekerjaan", module: "/risiko", needTypes: ALL_NEEDS },
  { id: "c7", standardId: "iso45001", label: "Struktur Organisasi Tanggap Darurat & P2K3 disahkan secara resmi", module: "/layanan", needTypes: ALL_NEEDS },
  { id: "c8", standardId: "iso45001", label: "Laporan insiden, near-miss, dan investigasi K3 terdokumentasi dengan baik", module: "/insiden", needTypes: ["proyek", "audit"] },
  { id: "c9", standardId: "iso39001", label: "Kebijakan Keselamatan Lalu Lintas Jalan (RTS) untuk armada pengangkut material", module: "/dokumen", needTypes: ALL_NEEDS },
  { id: "c10", standardId: "iso39001", label: "Daftar periksa kelaikan kendaraan berat sebelum beroperasi harian didokumentasikan", module: "/proyek", needTypes: ["tender", "proyek"] },
  { id: "c11", standardId: "all", label: "Tinjauan Manajemen telah dilaksanakan sesuai dengan jadwal yang direncanakan", module: "/audit", needTypes: ALL_NEEDS },
  { id: "c12", standardId: "all", label: "Laporan Audit Internal dan status tindakan perbaikannya (CAPA) lengkap", module: "/audit", needTypes: ALL_NEEDS },
  { id: "c13", standardId: "all", label: "Daftar pemenuhan regulasi perundang-undangan (Legal Compliance) relevan", module: "/perpustakaan", needTypes: ALL_NEEDS }
];

export default function KesiapanProyekPage() {
  const [needType, setNeedType] = useState<NeedType>("proyek");
  const [selectedStandards, setSelectedStandards] = useState<string[]>([
    "iso9001", "iso14001", "iso45001", "iso39001"
  ]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleStandard = (id: string) => {
    setSelectedStandards(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filteredChecklist = useMemo(() => {
    if (selectedStandards.length === 0) return [];

    return CHECKLIST_DB.filter(item => {
      const matchesNeed = item.needTypes.includes(needType);
      const matchesStandard = item.standardId === "all" || selectedStandards.includes(item.standardId);
      return matchesNeed && matchesStandard;
    });
  }, [needType, selectedStandards]);

  const selectedNeed = NEED_TYPES.find(type => type.id === needType) ?? NEED_TYPES[1];

  const completedCount = filteredChecklist.filter(item => checkedItems.includes(item.id)).length;
  const percentage = filteredChecklist.length 
    ? Math.round((completedCount / filteredChecklist.length) * 100) 
    : 0;

  const gaps = useMemo(() => {
    return filteredChecklist.filter(item => !checkedItems.includes(item.id));
  }, [filteredChecklist, checkedItems]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-sans pb-16">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-neutral-400 hover:text-white transition-colors p-1" data-testid="link-back-home">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white" data-testid="text-page-title">
              Penilaian Kesiapan Proyek
            </h1>
            <p className="text-sm text-neutral-400" data-testid="text-page-subtitle">
              Cockpit tata kelola & compliance sistem ISO konstruksi
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6" data-testid="section-management-flow">
            <div className="flex items-center gap-2 mb-5">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <h2 className="text-base font-medium text-white">Alur Sistem Manajemen</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {MANAGEMENT_FLOW.map((stage, index) => (
                <div key={stage.title} className="relative p-4 rounded-xl border border-neutral-800 bg-neutral-950">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-300 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-100">{stage.title}</h3>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed min-h-10 mb-3">{stage.description}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {stage.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-medium text-blue-400 hover:text-blue-300"
                        data-testid={`link-flow-${link.label.toLowerCase().replaceAll(" ", "-").replace("&", "dan")}`}
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                  {index < MANAGEMENT_FLOW.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 z-10" />
                  )}
                </div>
              ))}
            </div>
          </section>
          
          {/* Setup Section */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6" data-testid="section-setup">
            <div className="mb-8">
              <h2 className="text-base font-medium text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                Konteks Kebutuhan Penilaian
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {NEED_TYPES.map(type => (
                    <button
                    key={type.id}
                    onClick={() => setNeedType(type.id)}
                      aria-pressed={needType === type.id}
                    className={`p-4 text-left border rounded-xl transition-all duration-200 ${
                      needType === type.id 
                        ? "bg-blue-500/10 border-blue-500/50 text-blue-100" 
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900"
                    }`}
                    data-testid={`button-need-${type.id}`}
                  >
                    <div className="font-semibold mb-1.5 text-sm text-neutral-200">{type.label}</div>
                    <div className="text-xs opacity-80 leading-relaxed">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-medium text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Standar Manajemen Terkait (Fokus Konstruksi)
              </h2>
              <div className="flex flex-wrap gap-3">
                {STANDARDS.map(std => {
                  const isSelected = selectedStandards.includes(std.id);
                  return (
                    <button
                      key={std.id}
                      onClick={() => toggleStandard(std.id)}
                      aria-pressed={isSelected}
                      className={`flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm font-medium transition-colors ${
                        isSelected 
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900"
                      }`}
                      data-testid={`button-standard-${std.id}`}
                    >
                      {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      <span>{std.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden" data-testid="section-checklist">
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
              <h2 className="text-lg font-semibold text-white">Daftar Periksa Persyaratan</h2>
              <span className="text-sm font-medium px-3 py-1 bg-neutral-800 rounded-full text-neutral-400 border border-neutral-700">
                 {completedCount} / {filteredChecklist.length} Selesai
              </span>
            </div>
            <div className="divide-y divide-neutral-800/50">
              {filteredChecklist.length === 0 ? (
                <div className="p-12 text-center text-neutral-500" data-testid="text-empty-checklist">
                  Pilih minimal satu standar untuk melihat daftar periksa.
                </div>
              ) : (
                filteredChecklist.map(item => {
                  const isChecked = checkedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`w-full flex items-start gap-4 p-5 hover:bg-neutral-800/50 transition-colors text-left group ${isChecked ? 'bg-emerald-950/10' : ''}`}
                      data-testid={`checklist-${item.id}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleChecklist(item.id)}
                        aria-pressed={isChecked}
                        aria-label={`${isChecked ? "Tandai belum selesai" : "Tandai selesai"}: ${item.label}`}
                        className="pt-0.5 shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        data-testid={`button-checklist-${item.id}`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <button
                          type="button"
                          onClick={() => toggleChecklist(item.id)}
                          className={`w-full text-left text-sm md:text-base leading-relaxed mb-2 transition-colors ${isChecked ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}
                        >
                          {item.label}
                        </button>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                            isChecked 
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-600' 
                              : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                          }`}>
                            {item.standardId === 'all' ? 'UMUM / MULTI-STANDAR' : item.standardId}
                          </span>
                          <Link
                            href={item.module}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                            data-testid={`link-checklist-module-${item.id}`}
                          >
                            Buka {MODULE_LABELS[item.module] ?? "modul"} <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Summary Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm" data-testid="card-summary">
            <div className="p-6 border-b border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-6" data-testid="text-readiness-context">
                Status Kesiapan {selectedNeed.label}
              </h3>
              <div className="flex items-baseline gap-3 mb-2">
                <div className={`text-6xl font-light tracking-tighter ${percentage === 100 ? 'text-emerald-400' : 'text-white'}`} data-testid="text-percentage">
                  {percentage}%
                </div>
                <div className="text-sm font-medium text-neutral-500 mb-2">Terpenuhi</div>
              </div>
              <div className="w-full bg-neutral-950 h-3 rounded-full overflow-hidden mt-6 border border-neutral-800">
                <div 
                  className={`h-full transition-all duration-700 ease-out rounded-full ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            
            {gaps.length > 0 && (
              <div className="p-6 bg-neutral-900/40">
                <h4 className="text-sm font-medium text-neutral-300 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Gap Kepatuhan ({gaps.length})
                </h4>
                <ul className="space-y-3.5">
                  {gaps.slice(0, 4).map(gap => (
                    <li key={gap.id} className="text-sm text-neutral-400 flex items-start gap-2.5" data-testid={`text-gap-${gap.id}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 mt-1.5 shrink-0" />
                      <span className="leading-snug">{gap.label}</span>
                    </li>
                  ))}
                  {gaps.length > 4 && (
                    <li className="text-xs text-neutral-500 pl-4 font-medium italic pt-2">
                      + {gaps.length - 4} persyaratan lainnya...
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {percentage === 100 && filteredChecklist.length > 0 && (
              <div className="p-6 bg-emerald-950/20 text-center border-t border-emerald-900/30">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-emerald-400 font-medium">Sistem manajemen siap beroperasi.</p>
              </div>
            )}
          </div>

          {/* Quick Module Links */}
          <div className="grid grid-cols-2 gap-3" data-testid="grid-quick-links">
            <Link href="/dokumen" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-dokumen">
              <FileText className="w-5 h-5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Dokumen</span>
            </Link>
            <Link href="/risiko" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-risiko">
              <AlertTriangle className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Risiko & JSA</span>
            </Link>
            <Link href="/insiden" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-insiden">
              <Activity className="w-5 h-5 text-neutral-500 group-hover:text-rose-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Insiden (K3)</span>
            </Link>
            <Link href="/audit" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-audit">
              <ShieldCheck className="w-5 h-5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Audit & CAPA</span>
            </Link>
            <Link href="/kpi" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-kpi">
              <PieChart className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">KPI Proyek</span>
            </Link>
            <Link href="/proyek" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-proyek">
              <FolderOpen className="w-5 h-5 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Data Proyek</span>
            </Link>
            <Link href="/vendor" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-vendor">
              <Users className="w-5 h-5 text-neutral-500 group-hover:text-teal-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Vendor</span>
            </Link>
            <Link href="/perpustakaan" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-perpustakaan">
              <BookOpen className="w-5 h-5 text-neutral-500 group-hover:text-orange-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Regulasi</span>
            </Link>
             <Link href="/industri#construction" className="flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all group" data-testid="link-module-industri">
              <Building2 className="w-5 h-5 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
              <span className="text-sm font-semibold text-neutral-300">Standar Industri</span>
            </Link>
          </div>

          {/* Role Boundary Card */}
          <div className="bg-blue-950/20 border border-blue-900/50 rounded-2xl p-5" data-testid="card-role-boundary">
            <div className="flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Batasan Ruang Lingkup Sistem</h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                  ISO Hub adalah alat kerja internal untuk <strong className="text-neutral-300">Tata Kelola Sistem Manajemen Mutu, K3, Lingkungan, dan Audit</strong>. 
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  <strong className="text-neutral-300">Gustafta</strong> menjadi rujukan ekosistem konstruksi untuk kebutuhan legalitas, kesiapan SBU/SKK, dan peluang tender. Penerbitan serta validasi resminya tetap mengikuti instansi berwenang; tidak ada sinkronisasi data otomatis dengan ISO Hub.
                </p>
                <a 
                  href="https://gustafta.my.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium border-b border-transparent hover:border-blue-400/50 pb-0.5"
                  data-testid="link-gustafta-external"
                >
                  Buka Gustafta untuk kebutuhan konstruksi <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export type NeedType = "tender" | "proyek" | "audit";

export type ChecklistItem = {
  id: string;
  standardId: string;
  label: string;
  module: string;
  needTypes: NeedType[];
};

export const NEED_TYPES: Array<{
  id: NeedType;
  label: string;
  description: string;
}> = [
  {
    id: "tender",
    label: "Tender Baru",
    description: "Persiapan dokumen kepatuhan untuk pengajuan tender.",
  },
  {
    id: "proyek",
    label: "Proyek Berjalan",
    description: "Pemenuhan syarat operasional proyek konstruksi aktif.",
  },
  {
    id: "audit",
    label: "Persiapan Audit",
    description: "Pengecekan kesiapan sebelum audit eksternal/sertifikasi.",
  },
];

export const STANDARDS = [
  { id: "iso9001", label: "ISO 9001 (Mutu)" },
  { id: "iso14001", label: "ISO 14001 (Lingkungan)" },
  { id: "iso45001", label: "ISO 45001 (K3)" },
  { id: "iso39001", label: "ISO 39001 (Lalu Lintas)" },
];

const ALL_NEEDS: NeedType[] = ["tender", "proyek", "audit"];

export const CHECKLIST_DB: ChecklistItem[] = [
  {
    id: "c1",
    standardId: "iso9001",
    label:
      "Manual Mutu & Kebijakan Mutu telah tersedia dan disahkan manajemen puncak",
    module: "/dokumen",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c2",
    standardId: "iso9001",
    label:
      "Sasaran Mutu (KPI) spesifik proyek telah ditetapkan dan diukur pencapaiannya",
    module: "/kpi",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c3",
    standardId: "iso9001",
    label:
      "Prosedur Pengendalian Dokumen & Rekaman (termasuk drawing proyek) diimplementasikan",
    module: "/dokumen",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c4",
    standardId: "iso14001",
    label:
      "Dokumen Identifikasi Aspek & Dampak Lingkungan (IADL) proyek telah diperbarui",
    module: "/risiko",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c5",
    standardId: "iso14001",
    label:
      "Prosedur Tanggap Darurat Tumpahan Limbah/B3 telah disosialisasikan",
    module: "/insiden",
    needTypes: ["proyek", "audit"],
  },
  {
    id: "c6",
    standardId: "iso45001",
    label:
      "Identifikasi Bahaya & Penilaian Risiko (HIRADC/JSA) mencakup seluruh pekerjaan",
    module: "/risiko",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c7",
    standardId: "iso45001",
    label:
      "Struktur Organisasi Tanggap Darurat & P2K3 disahkan secara resmi",
    module: "/layanan",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c8",
    standardId: "iso45001",
    label:
      "Laporan insiden, near-miss, dan investigasi K3 terdokumentasi dengan baik",
    module: "/insiden",
    needTypes: ["proyek", "audit"],
  },
  {
    id: "c9",
    standardId: "iso39001",
    label:
      "Kebijakan Keselamatan Lalu Lintas Jalan (RTS) untuk armada pengangkut material",
    module: "/dokumen",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c10",
    standardId: "iso39001",
    label:
      "Daftar periksa kelaikan kendaraan berat sebelum beroperasi harian didokumentasikan",
    module: "/proyek",
    needTypes: ["tender", "proyek"],
  },
  {
    id: "c11",
    standardId: "all",
    label:
      "Tinjauan Manajemen telah dilaksanakan sesuai dengan jadwal yang direncanakan",
    module: "/audit",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c12",
    standardId: "all",
    label:
      "Laporan Audit Internal dan status tindakan perbaikannya (CAPA) lengkap",
    module: "/audit",
    needTypes: ALL_NEEDS,
  },
  {
    id: "c13",
    standardId: "all",
    label:
      "Daftar pemenuhan regulasi perundang-undangan (Legal Compliance) relevan",
    module: "/perpustakaan",
    needTypes: ALL_NEEDS,
  },
];

export function getFilteredChecklist(
  needType: NeedType,
  selectedStandards: string[],
): ChecklistItem[] {
  return CHECKLIST_DB.filter(
    (item) =>
      item.needTypes.includes(needType) &&
      (item.standardId === "all" || selectedStandards.includes(item.standardId)),
  );
}

export function getReadinessSummary(
  needType: NeedType,
  selectedStandards: string[],
  checkedItems: string[],
) {
  const checklist = getFilteredChecklist(needType, selectedStandards);
  const completedCount = checklist.filter((item) =>
    checkedItems.includes(item.id),
  ).length;
  const percentage = checklist.length
    ? Math.round((completedCount / checklist.length) * 100)
    : 0;
  return {
    completedCount,
    totalCount: checklist.length,
    percentage,
    gapCount: checklist.length - completedCount,
  };
}
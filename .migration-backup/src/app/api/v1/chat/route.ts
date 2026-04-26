import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql, eq } from "drizzle-orm";

export const chatSessions = sqliteTable("chat_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull().unique(),
  userId: integer("user_id"),
  messages: text("messages"), // JSON string
  context: text("context"), // JSON string for conversation context
  state: text("state").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const chatTasks = sqliteTable("chat_tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  taskType: text("task_type").notNull(), // create_risk, generate_document, book_service, etc.
  taskData: text("task_data"), // JSON string
  status: text("status").default("pending"), // pending, in_progress, completed, failed
  result: text("result"), // JSON string
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export type ChatSession = typeof chatSessions.$inferSelect;
export type ChatTask = typeof chatTasks.$inferSelect;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

interface ChatContext {
  currentTask?: string;
  taskProgress?: number;
  suggestedActions?: string[];
  userIntent?: string;
}

const isoKnowledge: Record<string, { content: string; nextSteps?: string[] }> = {
  "iso 9001": {
    content: "ISO 9001:2015 adalah standar internasional untuk Sistem Manajemen Mutu (QMS). Prinsip utama:\n\n✅ Fokus pada pelanggan\n✅ Kepemimpinan\n✅ Keterlibatan people\n✅ Pendekatan proses\n✅ Perbaikan berkelanjutan\n✅ Pengambilan keputusan berbasis bukti\n✅ Manajemen hubungan\n\n📋 Klausul ISO 9001:2015:\n1. Ruang Lingkup\n2. Referensi Normatif\n3. Istilah & Definisi\n4. Konteks Organisasi\n5. Kepemimpinan\n6. Perencanaan\n7. Dukungan\n8. Operasi\n9. Evaluasi Kinerja\n10. Perbaikan\n\nApakah Anda ingin:\n- 📝 Membuat dokumen ISO 9001?\n- 🎯 Mulai sertifikasi ISO 9001?\n- 📊 Risk assessment untuk ISO 9001?",
    nextSteps: ["Buat Manual Mutu", "Mulai Gap Analysis", "Buat Prosedur"]
  },
  "iso 14001": {
    content: "ISO 14001:2015 adalah standar Sistem Manajemen Lingkungan (EMS). \n\n🎯 Tujuan:\n- Identifikasi aspek lingkungan\n- Pemenuhan compliance\n- Peningkatan kinerja lingkungan\n\n🔄 PDCA Cycle:\n- Plan: Perencanaan lingkungan\n- Do: Implementasi & operasi\n- Check: Pemantauan & evaluasi\n- Act: Perbaikan berkelanjutan\n\n📋 Klausul Utama:\n4. Konteks Organisasi\n5. Kepemimpinan\n6. Perencanaan\n7. Dukungan\n8. Operasi\n9. Evaluasi Kinerja\n10. Perbaikan\n\nApakah Anda ingin membuat dokumen lingkungan?",
    nextSteps: ["Buat Kebijakan Lingkungan", "Identifikasi Aspek Dampak", "Buat Prosedur Lingkungan"]
  },
  "iso 45001": {
    content: "ISO 45001:2018 adalah standar Sistem Manajemen K3 (OHS). Menggantikan OHSAS 18001.\n\n⚠️ Fokus Utama:\n- Identifikasi bahaya\n- Penilaian risiko\n- Participative consultation\n- Legal compliance\n\n📋 Klausul ISO 45001:2018:\n1-3. Dasar & Istilah\n4. Konteks Organisasi\n5. Kepemimpinan & Partisipasi\n6. Perencanaan\n7. Dukungan\n8. Operasi\n9. Evaluasi Kinerja\n10. Perbaikan\n\nApakah Anda ingin:\n- 🛡️ Buat prosedur K3?\n- 📋 Identifikasi bahaya kerja?\n- 📊 Risk matrix K3?",
    nextSteps: ["Identifikasi Hazard", "Buat Prosedur K3", "Buat Risk Matrix"]
  },
  "iso 27001": {
    content: "ISO 27001:2022 adalah standar Sistem Manajemen Keamanan Informasi (ISMS).\n\n🔐 Lingkup:\n- Risk assessment\n- Keamanan aset\n- Akses control\n- Cryptography\n- Continuity\n\n📋 Annex A (57 controls):\n- A.5 Organizational controls\n- A.6 People controls\n- A.7 Physical controls\n- A.8 Technological controls\n\nApakah Anda membutuhkan:\n- 🛡️ Risk assessment keamanan info?\n- 📝 Dokumen ISMS?\n- 🔒 Kebijakan keamanan?",
    nextSteps: ["Buat Risk Assessment", "Buat Kebijakan Keamanan", "Buat SOP Keamanan"]
  },
  "iso 37001": {
    content: "ISO 37001:2016 adalah standar Sistem Manajemen Anti Penyuapan.\n\n🤝 Komponen Utama:\n- Due diligence\n- Whistleblowing mechanism\n- Anti-corruption policy\n- Training & awareness\n\n🇮🇩 Di Indonesia: PANCEK (UU 20/2001) complement ISO 37001\n\nApakah Anda membutuhkan:\n- 📋 Kebijakan anti-suap?\n- 🤝 Prosedur due diligence?\n- 📢 Sistem whistleblowing?",
    nextSteps: ["Buat Kebijakan Anti-Suap", "Buat Prosedur Due Diligence", "Siapkan Whistleblowing"]
  },
  "iso 31000": {
    content: "ISO 31000:2018 adalah panduan manajemen risiko.\n\n🎯 Prinsip:\n- Integrasi\n- Strukturisasi\n- Budaya\n- Value creation\n- Human factors\n\n🔄 Proses:\n1. Communication & Consultation\n2. Context Establishment\n3. Risk Assessment (ID → Analysis → Evaluation)\n4. Risk Treatment\n5. Monitoring & Review\n\n📊 Risk Matrix: Probability × Impact\n- Low (1-4)\n- Medium (5-9)\n- High (10-16)\n- Critical (17-25)\n\nApakah Anda ingin:\n- 📊 Buat risk register?\n- 🎯 Risk assessment?\n- 🛡️ Risk treatment plan?",
    nextSteps: ["Buat Risk Register", "Lakukan Risk Assessment", "Buat Risk Treatment Plan"]
  },
  "iso 22000": {
    content: "ISO 22000:2018 adalah standar Sistem Manajemen Keamanan Pangan.\n\n🍔 Komponen:\n- HACCP plan\n- Prerequisite programs (PRP)\n- Food safety culture\n- Traceability\n\n📋 10 Klausul:\n1. Ruang Lingkup\n2. Referensi\n3. Istilah\n4. Sistem MSMKP\n5. Perencanaan & Prerequisite\n6. Penerapan\n7. Validasi & Verifikasi\n8. Pengendalian Tidak Sesuai\n9. improvement\n10. FSMS Management\n\nApakah Anda membutuhkan:\n- 🍴 HACCP plan?\n- 📋 Dokumentasi keamanan pangan?\n- 🔬 Analisis bahaya?",
    nextSteps: ["Buat HACCP Plan", "Identifikasi Bahaya", "Buat Prosedur Keamanan Pangan"]
  },
  "iso 50001": {
    content: "ISO 50001:2018 adalah standar Sistem Manajemen Energi.\n\n⚡ Tujuan:\n- Peningkatan energy performance\n- Efisiensi energi\n- Pengurangan konsumsi\n\n🔄 PDCA:\n- Plan: Use energy baseline, EnPIs\n- Do: Implementation\n- Check: Monitoring\n- Act: Improvement\n\n📊 Metrics:\n- EnPIs (Energy Performance Indicators)\n- Baseline\n- Energy review\n\nApakah Anda membutuhkan:\n- ⚡ Audit energi?\n- 📊 Energy baseline?\n- 📋 Rencana penghematan?",
    nextSteps: ["Buat Energy Review", "Tentukan Baseline", "Buat EnPI"]
  },
  "iatf 16949": {
    content: "IATF 16949 adalah standar otomotif untuk QMS.\n\n🚗 Fokus:\n- Defect prevention\n- Reduction of variation\n- Automotive supply chain\n\n📋 Core Tools:\n- APQP (Advanced Product Quality Planning)\n- PPAP (Production Part Approval Process)\n- FMEA (Failure Mode & Effects Analysis)\n- SPC (Statistical Process Control)\n- MSA (Measurement System Analysis)\n\n📋 10 Klausul IATF 16949:\n1-10. Sama dengan ISO 9001 + Automotive\n\nApakah Anda membutuhkan:\n- 🔧 APQP document?\n- 📊 FMEA analysis?\n- 📈 SPC control chart?",
    nextSteps: ["Buat APQP", "Buat FMEA", "Buat Control Plan"]
  },
  "sertifikasi": {
    content: "Proses Sertifikasi ISO:\n\n📋 Tahap 1: Gap Analysis\n- Evaluasi kondisi saat ini\n- Identifikasi gap dengan standar\n- Rencana implementasi\n\n📋 Tahap 2: Implementasi\n- Pembuatan dokumen\n- Implementasi sistem\n- Training awareness\n\n📋 Tahap 3: Audit Internal\n- Audit by qualified auditor\n- Closure of findings\n\n📋 Tahap 4: Audit Sertifikasi\n- Stage 1: Dokumentasi\n- Stage 2: Implementasi\n- Certification Decision\n\n📋 Tahap 5: Surveillance\n- Audit tahunan\n- Renewal setiap 3 tahun\n\nDi mana posisi Anda saat ini?",
    nextSteps: ["Mulai Gap Analysis", "Buat Rencana Implementasi", "Siapkan Audit Internal"]
  },
  "dokumen": {
    content: "Dokumen ISO Wajib:\n\n📄 Tingkat Dokumen:\n1. Manual Mutu\n2. Kebijakan Mutu\n3. Sasaran Mutu\n4. Prosedur (6-10)\n5. Instruksi Kerja\n6. Formulir\n7. Record\n\n📋 Dokumen Terkontrol:\n- Document Control Procedure\n- Master List Dokumen\n- Approval & Distribution\n- Version Control\n\n📋 Dokumen Luar:\n- Standar ISO\n- Regulation\n- Customer requirements\n\nApakah Anda ingin:\n- 📝 Buat dokumen baru?\n- 📋 Lihat template dokumen?\n- 🔍 Cari dokumen spesifik?",
    nextSteps: ["Buat Manual Mutu", "Buat Prosedur", "Buat Formulir"]
  },
  "capa": {
    content: "Corrective Action & Preventive Action (CAPA):\n\n🔧 Tahapan CAPA:\n\n1️⃣ Identifikasi Masalah\n- Root cause analysis\n- Data collection\n\n2️⃣ Analisis Akar Masalah\n- 5 Why Analysis\n- Fishbone Diagram (Ishikawa)\n- Pareto Analysis\n\n3️⃣ Perbaikan/Tindakan\n- Corrective action\n- Preventive action\n- Immediate containment\n\n4️⃣ Verifikasi Efektifitas\n- Effectiveness check\n- Monitoring\n\n5️⃣ Dokumentasi\n- CAPA log\n- Closure\n\n📊 Prioritas:\n- Critical: 24 jam\n- Major: 7 hari\n- Minor: 30 hari\n\nApakah Anda ingin:\n- 📝 Buat CAPA form?\n- 🔍 Analisis akar masalah?\n- 📊 CAPA tracking?",
    nextSteps: ["Buat CAPA Form", "Lakukan Root Cause Analysis", "Buat CAPA Log"]
  },
  "audit": {
    content: "Audit ISO adalah proses sistematis untuk menilai conformance.\n\n🎯 Jenis Audit:\n\n1️⃣ Internal Audit (First Party)\n- Dilakukan sendiri\n- Self-assessment\n- Pra-sertifikasi\n\n2️⃣ External Audit - Certification (Third Party)\n- Oleh lembaga sertifikasi\n- Untuk sertifikasi\n\n3️⃣ Surveillance Audit\n- Setelah sertifikasi\n- Tahunan\n\n📋 Temuan Audit:\n- Major Nonconformity\n- Minor Nonconformity\n- Observation\n- Opportunity for Improvement\n\n📊 Audit Process:\n1. Planning\n2. Preparation\n3. Execution\n4. Reporting\n5. Follow-up\n\nApakah Anda ingin:\n- 📋 Buat audit schedule?\n- 📝 Buat audit checklist?\n- 📊 Buat audit report?",
    nextSteps: ["Buat Audit Schedule", "Buat Checklist Audit", "Buat Audit Report"]
  },
  "risk": {
    content: "Manajemen Risiko ISO 31000:\n\n🎯 Proses:\n\n1️⃣ Risk Identification\n- Brainstorming\n- Checklist\n- Historical data\n\n2️⃣ Risk Analysis\n- Probability: 1-5\n- Impact: 1-5\n- Risk Score = P × I\n\n3️⃣ Risk Evaluation\n- Low: 1-4\n- Medium: 5-9\n- High: 10-16\n- Critical: 17-25\n\n4️⃣ Risk Treatment\n- Avoid\n- Mitigate\n- Transfer\n- Accept\n\n5️⃣ Monitoring & Review\n\n📊 Risk Register Columns:\n| ID | Risk | P | I | Score | Treatment | Owner | Due |\n\nApakah Anda ingin:\n- 📊 Buat risk register?\n- 🎯 Risk assessment?\n- 🛡️ Risk treatment plan?",
    nextSteps: ["Buat Risk Register", "Lakukan Risk Assessment", "Buat Risk Treatment Plan"]
  }
};

const commandPatterns: Record<string, { action: string; extract: (input: string) => Record<string, string> }> = {
  "buat": { action: "create", extract: (i) => ({ object: extractDocumentType(i) }) },
  "buatkan": { action: "create", extract: (i) => ({ object: extractDocumentType(i) }) },
  "generate": { action: "create", extract: (i) => ({ object: extractDocumentType(i) }) },
  "tolong": { action: "create", extract: (i) => ({ object: extractDocumentType(i) }) },
  "bisa": { action: "help", extract: () => ({}) },
  "bantu": { action: "help", extract: () => ({}) },
  "jadwalkan": { action: "schedule", extract: (i) => ({ object: extractEventType(i) }) },
  "booking": { action: "book", extract: (i) => ({ service: extractServiceType(i) }) },
  "cari": { action: "search", extract: (i) => ({ query: i }) },
  "pandu": { action: "mentor", extract: () => ({}) },
};

function extractDocumentType(input: string): string {
  const docTypes: Record<string, string[]> = {
    "manual": ["manual mutu", "manual mutu", "quality manual"],
    "prosedur": ["prosedur", "procedure", "sop"],
    "formulir": ["formulir", "form", "blanko"],
    "kebijakan": ["kebijakan", "policy"],
    "risk register": ["risk register", "register risiko"],
    "capa": ["capa", "corrective action"],
    "audit": ["audit", "checklist"],
    "haccp": ["haccp", "food safety"],
    "fmea": ["fmea", "failure mode"],
    "apqp": ["apqp", "advanced product"],
  };
  
  const lower = input.toLowerCase();
  for (const [type, keywords] of Object.entries(docTypes)) {
    if (keywords.some(k => lower.includes(k))) return type;
  }
  return "dokumen";
}

function extractEventType(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("audit")) return "audit";
  if (lower.includes("training") || lower.includes("pelatihan")) return "training";
  if (lower.includes("meeting") || lower.includes("rapat")) return "meeting";
  return "event";
}

function extractServiceType(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("konsultasi")) return "konsultasi";
  if (lower.includes("training") || lower.includes("pelatihan")) return "training";
  if (lower.includes("audit")) return "audit";
  return "service";
}

function analyzeIntent(input: string): { intent: string; entities: Record<string, string>; confidence: number } {
  const lower = input.toLowerCase();
  
  // Knowledge query
  for (const [key] of Object.entries(isoKnowledge)) {
    if (lower.includes(key)) {
      return { intent: "knowledge", entities: { topic: key }, confidence: 0.9 };
    }
  }
  
  // Command patterns
  for (const [pattern, { action }] of Object.entries(commandPatterns)) {
    if (lower.includes(pattern)) {
      return { intent: action, entities: commandPatterns[pattern].extract(input), confidence: 0.8 };
    }
  }
  
  // Help intent
  if (lower.includes("bantu") || lower.includes("help") || lower.includes("apa yang bisa")) {
    return { intent: "help", entities: {}, confidence: 0.9 };
  }
  
  // Greeting
  if (lower.includes("halo") || lower.includes("hai") || lower.includes("hello") || lower.includes("hi")) {
    return { intent: "greeting", entities: {}, confidence: 0.95 };
  }
  
  // Gratitude
  if (lower.includes("terima kasih") || lower.includes("thanks") || lower.includes("thank you")) {
    return { intent: "gratitude", entities: {}, confidence: 0.95 };
  }
  
  // Mentor intent
  if (lower.includes("pandu") || lower.includes("mentor") || lower.includes("ajar") || lower.includes("belajar")) {
    return { intent: "mentor", entities: {}, confidence: 0.9 };
  }
  
  // Guide/step-by-step
  if (lower.includes("langkah") || lower.includes("step") || lower.includes("tutorial") || lower.includes("cara")) {
    return { intent: "guide", entities: extractGuideTopic(lower), confidence: 0.85 };
  }
  
  return { intent: "general", entities: {}, confidence: 0.5 };
}

function extractGuideTopic(input: string): Record<string, string> {
  if (input.includes("sertifikasi")) return { topic: "sertifikasi" };
  if (input.includes("audit")) return { topic: "audit" };
  if (input.includes("dokumen")) return { topic: "dokumen" };
  if (input.includes("risk") || input.includes("risiko")) return { topic: "risk" };
  if (input.includes("capa")) return { topic: "capa" };
  if (input.includes("9001")) return { topic: "iso9001" };
  if (input.includes("14001")) return { topic: "iso14001" };
  if (input.includes("45001")) return { topic: "iso45001" };
  return { topic: "general" };
}

function generateResponse(input: string, intent: ReturnType<typeof analyzeIntent>): { content: string; actions?: string[]; taskData?: Record<string, string> } {
  const { intent: intentType, entities } = intent;
  
  // Knowledge query
  if (intentType === "knowledge" && entities.topic) {
    const knowledge = isoKnowledge[entities.topic];
    if (knowledge) {
      return { content: knowledge.content, actions: knowledge.nextSteps };
    }
  }
  
  // Create/document command
  if (intentType === "create") {
    const docType = entities.object || "dokumen";
    return {
      content: `Baik! Saya akan membantu membuat ${docType}. 

Untuk memulai, saya butuh informasi berikut:
1. 📝 Nama dokumen apa?
2. 📋 Ruang lingkup/area apa?
3. 👤 Siapa penanggung jawab?

Atau saya bisa langsung generate template ${docType} untuk Anda?`,
      actions: ["Generate Template", "Lihat Daftar Dokumen", "Bantuan Lebih Lanjut"],
      taskData: { type: "create_document", documentType: docType }
    };
  }
  
  // Help command
  if (intentType === "help") {
    return {
      content: `Saya ISO Hub Assistant 🤖 - Helpdesk Agentic Anda!

🎯 Saya bisa membantu:

📚 **Informasi ISO**
- Penjelasan standar (9001, 14001, 45001, dll)
- Klausul & persyaratan
- Best practices

📝 **Pembuatan Dokumen**
- "Buat Manual Mutu"
- "Generate SOP"
- "Buat Risk Register"

📅 **Jadwal & Booking**
- "Jadwalkan audit"
- "Booking konsultasi"

🔍 **Pencarian**
- "Cari dokumen ISO 9001"
- "Cari template"

⚙️ **Eksekusi Tugas**
- "Buatkan CAPA untuk insiden X"
- "Buat risk assessment untuk area produksi"

🎓 **Mentoring**
- Panduan step-by-step
- Konsultasi implementasi

Coba ketik perintah atau pertanyaan!`,
      actions: ["Buat Dokumen", "Cari Informasi", "Booking Layanan"]
    };
  }
  
  // Greeting
  if (intentType === "greeting") {
    return {
      content: `Halo! 👋

Selamat datang di ISO Hub! 

Saya adalah asisten digital Anda yang siap membantu:
- 📚 Informasi ISO lengkap
- 📝 Pembuatan dokumen
- 📅 Booking layanan
- 🔍 Pencarian
- 🎓 Mentoring implementasi

Ada yang bisa saya bantu hari ini?

Contoh:
- "Apa itu ISO 9001?"
- "Buat Manual Mutu"
- "Jadwalkan audit"`,
      actions: ["Pelajari ISO", "Buat Dokumen", "Booking Layanan"]
    };
  }
  
  // Gratitude
  if (intentType === "gratitude") {
    return {
      content: `Sama-sama! 😊 

Senang bisa membantu! Jangan ragu untuk bertanya lagi jika butuh:
- 📚 Info ISO
- 📝 Pembuatan dokumen
- 💡 Konsultasi

Selamat mengelola sistem ISO Anda! 🌟`,
      actions: ["Tanya Lagi", "Buat Dokumen", "Keluar"]
    };
  }
  
  // Mentor intent
  if (intentType === "mentor") {
    const mentorTopics: Record<string, string> = {
      iso9001: `🎓 **Mentoring ISO 9001:2015**

Mari kita mulai perjalanan sertifikasi ISO 9001!

**Tahap 1: Pemahaman (Minggu 1-2)**
📖 Pahami 10 klausul ISO 9001:2015
📋 Review kualitas saat ini
🎯 Identifikasi gap

**Tahap 2: Perencanaan (Minggu 3-4)**
📝 Buat Manual Mutu
🎯 Tentukan kebijakan & sasaran
📋 Susun prosedur wajib

**Tahap 3: Implementasi (Minggu 5-8)**
⚙️ Implementasi sistem
👥 Training awareness
📝 Pembuatan dokumen

**Tahap 4: Audit Internal (Minggu 9-10)**
🔍 Lakukan audit internal
📝 Tutup temuan

**Tahap 5: Sertifikasi (Minggu 11-12)**
🏆 Audit sertifikasi

Di tahap mana Anda sekarang?`,
      iso14001: `🎓 **Mentoring ISO 14001:2015**

Mari mulai implementasi Sistem Manajemen Lingkungan!

**Tahap 1: Konteks Organisasi**
🏢 Identifikasi stakeholder
🌍 Pahami aspek lingkungan
📋 Baseline lingkungan

**Tahap 2: Kepemimpinan**
👤 Komitmen manajemen
🌱 Kebijakan lingkungan
📝 Peran & tanggung jawab

**Tahap 3: Perencanaan**
⚠️ Identifikasi risiko & peluang
🎯 Sasaran lingkungan
📋 Rencana pencapaian

**Tahap 4: Dukungan & Operasi**
📚 Kompetensi & awareness
🛠️ Sumber daya
🔄 Komunikasi
📝 Kontrol operasional

**Tahap 5: Evaluasi & Perbaikan**
📊 Pemantauan & pengukuran
📝 Audit internal
🔍 Tinjauan manajemen

Dimana posisi Anda?`,
      iso45001: `🎓 **Mentoring ISO 45001:2018**

Mari kita bangun sistem K3 yang efektif!

**Tahap 1: Konteks**
🔒 Identifikasi hazard
⚠️ Penilaian risiko K3
👥 Konsultasi pekerja

**Tahap 2: Kepemimpinan**
👤 Komitmen manajemen
🛡️ Kebijakan K3
📝 Struktur organisasi

**Tahap 3: Perencanaan**
🎯 Identifikasi risiko
📋 Tujuan K3
📝 Rencana pencapaian

**Tahap 4: Dukungan**
👥 Kompetensi
📢 Komunikasi
📚 Dokumentasi

**Tahap 5: Operasi**
🛠️ Kontrol operasional
🚑 Tanggap darurat
📝 Procurement

**Tahap 6: Evaluasi**
📊 Pemantauan
🔍 Audit
📈 Tinjauan manajemen

Siap mulai dari mana?`,
      sertifikasi: `🎓 **Panduan Sertifikasi ISO**

Step-by-step menuju sertifikasi:

**Step 1: Gap Analysis** 
🔍 Evaluasi kondisi saat ini
📋 Identifikasi gap
📝 Rencana implementasi

**Step 2: Implementasi**
📝 Buat dokumen sistem
⚙️ Implementasi proses
👥 Training tim

**Step 3: Audit Internal**
🔍 Lakukan audit internal
📝 Tutup temuan
📋 Review manajemen

**Step 4: Audit Sertifikasi**
🏢 Stage 1 (Dokumentasi)
🏢 Stage 2 (Implementasi)
✅ Certification Decision

**Step 5: Maintenance**
📊 Surveillance audit
🔄 Continuous improvement
📝 Renewal

Di step mana Anda sekarang?`,
      default: `🎓 **ISO Hub Mentoring**

Saya siap membimbing Anda! 

Pilih topik yang ingin dipelajari:
1. 📚 **ISO 9001** - Sistem Manajemen Mutu
2. 🌿 **ISO 14001** - Sistem Manajemen Lingkungan  
3. 🛡️ **ISO 45001** - Sistem Manajemen K3
4. 📊 **ISO 31000** - Manajemen Risiko
5. 🔒 **ISO 27001** - Keamanan Informasi
6. 🍔 **ISO 22000** - Keamanan Pangan

Atau pilih proses:
- 📋 **Sertifikasi** - Cara lulus sertifikasi
- 📝 **Dokumentasi** - Membuat dokumen ISO
- 🔍 **Audit** - Persiapan audit
- ⚠️ **Risiko** - Manajemen risiko

Klik salah satu atau ketik pertanyaan spesifik!`
    };
    
    const topic = entities.topic || "default";
    return {
      content: mentorTopics[topic] || mentorTopics.default,
      actions: ["ISO 9001", "ISO 14001", "ISO 45001", "Sertifikasi", "Dokumen"],
      taskData: { type: "mentor", topic }
    };
  }
  
  // Guide intent
  if (intentType === "guide") {
    const guideContent: Record<string, string> = {
      sertifikasi: `📋 **Cara Lulus Sertifikasi ISO**

1️⃣ **Persiapan**
- Pahami standar ISO
- evaluasi kondisi awal
- Bentuk tim projekt

2️⃣ **Implementasi**
- Buat sistem dokumen
- Implementasi ke proses
- Training semua karyawan

3️⃣ **Validasi**
- Audit internal
- Tutup semua temuan
- Management review

4️⃣ **Sertifikasi**
- Pilih lembaga sertifikasi
- Stage 1 & 2 audit
- Peroleh sertifikat

5️⃣ **Maintenance**
- Surveillance tahunan
- Continuous improvement
- Renewal 3 tahun

Butuh detail untuk salah satu tahap?`,
      audit: `📋 **Persiapan Audit ISO**

**Sebelum Audit:**
✅ Review dokumen
✅ Training auditor internal
✅ Simulasi audit
✅ Siapkan bukti

**Saat Audit:**
✅ Hadapi auditor dengan tenang
✅ Siapkan bukti objektif
✅ Catat semua temuan
✅ Jawab pertanyaan jelas

**Setelah Audit:**
✅ Review laporan
✅ Buat CAPA
✅ Tutup temuan tepat waktu
✅ Improve terus

Butuh checklist audit?`,
      dokumen: `📋 **Membuat Dokumen ISO**

**Struktur Dokumen:**
1. 🏷️ Header (logo, no dokumen, rev)
2. 📝 Tujuan
3. 📋 Ruang lingkup
4. 📖 Referensi
5. 📚 Istilah
6. ⚙️ Prosedur
7. 📝 Formulir terkait

**Prinsip:**
- Simple & clear
- Dapat diverifikasi
- Sesuai standar
- Consistent

Mau buat dokumen apa?`,
      risk: `📋 **Cara Risk Assessment ISO 31000**

**Step 1: Identifikasi**
- Brainstorming
- Checklist
- Historical data

**Step 2: Analisis**
- Probability: 1-5
- Impact: 1-5
- Risk Score = P × I

**Step 3: Evaluasi**
- Low: 1-4
- Medium: 5-9
- High: 10-16
- Critical: 17-25

**Step 4: Treatment**
- Avoid
- Mitigate
- Transfer
- Accept

Mau buat risk register?`
    };
    
    const topic = entities.topic || "sertifikasi";
    return {
      content: guideContent[topic] || guideContent.sertifikasi,
      actions: ["Risk Assessment", "Audit Checklist", "Dokumen Template", "Mulai Sekarang"]
    };
  }
  
  // Search intent
  if (intentType === "search") {
    return {
      content: `Baik! Saya akan mencari "${entities.query || input}"` + `

Hasil pencarian:
🔍 Loading...`,
      taskData: { type: "search", query: entities.query || input }
    };
  }
  
  // Schedule intent  
  if (intentType === "schedule") {
    return {
      content: `Baik! Saya akan menjadwalkan ${entities.object || "event"}.

Mohon berikan:
1. 📅 Tanggal & waktu
2. 👥 Participant
3. 📍 Lokasi/meeting link
4. 📝 Agenda

Atau saya cek jadwal yang tersedia dulu?`,
      actions: ["Cek Jadwal", "Lihat Kalender", "Booking Langsung"]
    };
  }
  
  // Booking intent
  if (intentType === "book") {
    return {
      content: `Baik! Saya akan membantu booking layanan.

Silakan pilih layanan:
1. 🎓 Training ISO
2. 💼 Konsultasi
3. 🔍 Audit
4. 📝 Dokumentasi

Atau langsung ke halaman booking?`,
      actions: ["Lihat Layanan", "Booking Sekarang", "Hubungi Konsultan"]
    };
  }
  
  // Default - progressive response
  return {
    content: `Saya memahami pertanyaan Anda tentang "${input}".

Untuk memberikan jawaban yang lebih tepat, mohon pilih:

📚 **Informasi** - Penjelasan lengkap ISO
📝 **Pembuatan Dokumen** - Generate template
📅 **Jadwal/Booking** - Buat appointment
🔍 **Pencarian** - Cari di database

Atau langsung tanyakan secara spesifik!`,
    actions: [" Tanya ISO", "Buat Dokumen", "Booking"]
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;
    
    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }
    
    const intent = analyzeIntent(message);
    const response = generateResponse(message, intent);
    
    // Save to database if sessionId provided
    if (sessionId) {
      const existingSession = await db
        .select()
        .from(chatSessions)
        .where(sql`${chatSessions.sessionId} = ${sessionId}`)
        .limit(1);
      
      if (existingSession.length > 0) {
        const existingMessages = existingSession[0].messages ? JSON.parse(existingSession[0].messages) : [];
        const newMessages = [
          ...existingMessages,
          { role: "user", content: message, timestamp: new Date().toISOString() },
          { role: "assistant", content: response.content, timestamp: new Date().toISOString() }
        ];
        
        await db
          .update(chatSessions)
          .set({ 
            messages: JSON.stringify(newMessages),
            updatedAt: new Date()
          })
          .where(sql`${chatSessions.sessionId} = ${sessionId}`);
      } else {
        await db.insert(chatSessions).values({
          sessionId,
          messages: JSON.stringify([
            { role: "assistant", content: response.content, timestamp: new Date().toISOString() },
            { role: "user", content: message, timestamp: new Date().toISOString() },
            { role: "assistant", content: response.content, timestamp: new Date().toISOString() }
          ]),
          context: JSON.stringify({ intent }),
          state: "active"
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        response: response.content,
        actions: response.actions,
        taskData: response.taskData,
        intent: intent.intent,
        sessionId: sessionId || crypto.randomUUID()
      }
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ success: false, error: "Chat processing failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    
    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Session ID required" }, { status: 400 });
    }
    
    const session = await db
      .select()
      .from(chatSessions)
      .where(sql`${chatSessions.sessionId} = ${sessionId}`)
      .limit(1);
    
    if (session.length === 0) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    }
    
    const messages = session[0].messages ? JSON.parse(session[0].messages) : [];
    const context = session[0].context ? JSON.parse(session[0].context) : {};
    
    return NextResponse.json({
      success: true,
      data: {
        sessionId: session[0].sessionId,
        messages,
        context,
        createdAt: session[0].createdAt,
        updatedAt: session[0].updatedAt
      }
    });
  } catch (error) {
    console.error("Get session error:", error);
    return NextResponse.json({ success: false, error: "Failed to get session" }, { status: 500 });
  }
}

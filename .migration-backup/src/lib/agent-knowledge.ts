import type { AgentType, TaskStep } from "./agents";

export const AGENT_KNOWLEDGE: Record<AgentType, Record<string, string>> = {
  orchestrator: {
    default: "Saya adalah Orchestrator Agent. Saya akan menguraikan tugas Anda ke specialist agents yang tepat dan mengkoordinasikan execution.",
    complex: "Tugas ini kompleks dan memerlukan koordinasi multiple specialist agents. Saya akan decompose menjadi sub-tugas.",
    route: "Saya telah mengarahkan tugas ke specialist agent yang sesuai berdasarkan keyword detection.",
  },
  iso: {
    "iso 9001": `📋 **ISO 9001:2015 - Sistem Manajemen Mutu**

**7 Prinsip Utama:**
1. Fokus pada pelanggan
2. Kepemimpinan
3. Keterlibatan people
4. Pendekatan proses
5. Perbaikan berkelanjutan
6. Pengambilan keputusan berbasis bukti
7. Manajemen hubungan

**10 Klausul:**
4. Konteks Organisasi
5. Kepemimpinan
6. Perencanaan
7. Dukungan
8. Operasi
9. Evaluasi Kinerja
10. Perbaikan

**Benefits:**
- Peningkatan kualitas produk/jasa
- Efisiensi operasional
- Kepuasan pelanggan
- Kompetensi kompetitif`,
    "iso 14001": `🌿 **ISO 14001:2015 - Sistem Manajemen Lingkungan**

**Prinsip Utama:**
1. Perlindungan lingkungan
2. Pencegahan polusi
3. Pemantauan lingkungan
4. Kepatuhan regulasi
5. Perbaikan berkelanjutan

**PDCA Cycle:**
- **Plan**: Environmental aspects, legal compliance, objectives
- **Do**: Resources, training, operational control
- **Check**: Monitoring, measurement, evaluation
- **Act**: Corrective action, management review

**Aspek Lingkungan:**
- Emisi ke udara
- Pembuangan limbah
- Penggunaan sumber daya
- Contamination tanah`,
    "iso 45001": `🛡️ **ISO 45001:2018 - Sistem Manajemen K3**

**Prinsip Utama:**
1. Kesehatan & keselamatan pekerja
2. Hazard identification
3. Risk assessment
4. Consultation & participation
5. Continual improvement

**Perbedaan dengan OHSAS 18001:**
- Lebih fokus pada worker participation
- Context of organization
- Leadership commitment
- Risk-based thinking
- PDCA integration

**Elemen Kunci:**
- Hazard identification
- Risk assessment
- Legal compliance
- Emergency preparedness`,
    "iso 27001": `🔐 **ISO 27001:2022 - Keamanan Informasi**

**Struktur Annex SL:**
4-10 + Annex A (93 controls)

**Kategori Kontrol:**
A.5 Organizational controls
A.6 People controls
A.7 Physical controls
A.8 Technological controls

**Klausul Utama:**
4. Context of organization
5. Leadership
6. Planning
7. Support
8. Operation
9. Performance evaluation
10. Improvement`,
    "iso 37001": `🎯 **ISO 37001:2016 - Anti-Bribery**

**Prinsip:**
1. Due diligence
2. Communication & training
3. Reporting & investigation
4. Monitoring & review
5. Corrective action

**Measures:**
- Anti-bribery policy
- Due diligence
- Financial controls
- Non-financial controls
- Reporting mechanism
- Investigation procedure`,
    "gap analysis": `📊 **Gap Analysis ISO**

**Langkah-langkah:**
1. **Assessment** - Evaluasi current system
2. **Identifikasi** - Find gaps vs standar
3. **Rencana** - Develop improvement plan
4. **Implementasi** - Execute improvements
5. **Verifikasi** - Confirm gap closure

**Tools:**
- Checklist conformance
- Process mapping
- Risk assessment
- Documentation review`,
    "default": `📋 **ISO Agent Ready to Help!**

Saya dapat membantu Anda dengan:
• Penjelasan standar ISO (9001, 14001, 45001, 27001, 37001)
• Gap analysis dan assessment
• Klausul dan requirements
• Implementasi dan guidance
• Proses sertifikasi

Silakan tanyakan topik ISO yang ingin Anda ketahui!`,
  },
  legal: {
    "uu 20": `📜 **UU No. 20 Tahun 2001**

**Tentang:** Perubahan atas UU No. 31 Tahun 1999 tentang Tindak Pidana Korupsi

**Ketentuan Utama:**
- Penjara maksimal: 20 tahun
- Denda maksimal: Rp 1.000.000.000 (1 Miliar)
- Uang pengganti: sequestrated assets

**Korupsi yang Dicegah:**
- Penyuapan (bribery)
- Penggelapan (embezzlement)
- Pemerasan (extortion)
- Kecurangan (fraud)
- Nepotisme (nepotism)
- Lobby ilegal (illegal lobbying)`,
    "uu 13": `⚠️ **UU No. 13 Tahun 2003 - Ketenagakerjaan**

**K3 Provisions:**
- Pasal 86: Hak pekerja atas keselamatan
- Pasal 87: Pengamanan alat kerja
- Pasal 88: Jaminan sosial K3
- Pasal 89: Norma K3

**Kewajiban Employer:**
- APAR (Alat Pemadam Api Ringan)
- Helm safety
- Pelatihan K3 berkala
- P3K
- BPJS Kesehatan & TK`,
    "k3": `🔧 **Peraturan K3 Indonesia**

**Regulasi Utama:**
1. UU 13/2003 - Ketenagakerjaan
2. PP 50/2012 - Penerapan SMK3
3. Permenaker 05/2018 - Mesin dan Permesinan
4. Permenaker 03/2018 - APAR

**Implementasi:**
- Safety policy
- Risk assessment
- SOP K3
- Pelatihan
- Inspection
- Reporting`,
    "pancek": `🇮🇩 **PANCEK - Standar Anti Korupsi**

**Tentang:** Sistem Manajemen Anti Penyuapan

**Prinsip:**
1. Due diligence
2. Internal control
3. Monitoring
4. Investigation
5. Remediation

**Komplementer dengan ISO 37001**`,
    "compliance": `✅ **Compliance Check**

**Langkah Compliance:**
1. Identifikasi regulasi
2. Assessment kepatuhan
3. Gap analysis
4. Remediation plan
5. Monitoring & reporting

**Regulasi ISO-Related:**
- ISO 9001: Quality
- ISO 14001: Environment  
- ISO 45001: K3
- ISO 27001: Security
- ISO 37001: Anti-bribery`,
    "default": `⚖️ **Legal Agent Ready to Help!**

Saya dapat membantu dengan:
• UU 20/2001 Anti Korupsi
• UU 13/2003 Ketenagakerjaan
• Peraturan K3
• Compliance check
• PANCEK dan ISO 37001

Silakan tanyakan regulasi yang ingin Anda ketahui!`,
  },
  technical: {
    "sop": `📝 **Template SOP ISO**

**Struktur SOP:**
1. **Tujuan** - Purpose
2. **Ruang Lingkup** - Scope
3. **Referensi** - References
4. **Definisi** - Definitions
5. **Prosedur** - Procedure (Langkah-langkah)
6. **Rekaman** - Records
7. **Lampiran** - Attachments

**Format:**
- Nomor dokumen
- Revisi
- Tanggal efektif
- Penanggung jawab
- Tanda tangan approval`,
    "kebijakan": `📃 **Template Kebijakan Mutu**

**ISO 9001:2015 Requirements:**

1. **Komitmen** terhadap QMS
2. **Fokus** pada pelanggan
3. **Quality Policy** yang sesuai
4. **Sasaran Mutu** yang terukur
5. **Mekanisme** tinjauan berkala

**Elemen Wajib:**
- Kebijakan harus appropriate
- Commitment to comply
- Framework for objectives
- Reviewed for suitability`,
    "manual": `📖 **Template Manual Mutu**

**ISO 9001:2015 Structure:**

1. Introduction
2. Scope
3. Normative References
4. Terms & Definitions
5. Context of Organization
   - External/Internal issues
   - Interested parties
   - QMS Scope
6. Leadership
7. Planning
8. Support
9. Operation
10. Performance Evaluation
11. Improvement`,
    "generate": `⚡ **Document Generator**

**Available Templates:**
- SOP (Standard Operating Procedure)
- Kebijakan Mutu (Quality Policy)
- Manual Mutu (Quality Manual)
- Formulir (Forms)
- Checklist
- Instruksi Kerja (Work Instructions)

**Format Output:**
- Microsoft Word (.docx)
- PDF
- Markdown`,
    "default": `🔧 **Technical Agent Ready to Help!**

Saya dapat membantu membuat:
• SOP (Standard Operating Procedure)
• Kebijakan Mutu
• Manual Mutu
• Template Dokumen ISO
• Formulir dan Checklist

Silakan minta dokumen yang Anda butuhkan!`,
  },
  audit: {
    "checklist": `📋 **Audit Checklist ISO 9001:2015**

**By Clause:**

4. Konteks Organisasi
   - [ ] External issues identified
   - [ ] Internal issues identified
   - [ ] Interested parties defined

5. Kepemimpinan
   - [ ] Quality policy
   - [ ] Leadership commitment
   - [ ] Roles defined

6. Perencanaan
   - [ ] Risks identified
   - [ ] Opportunities defined
   - [ ] Objectives set

7. Dukungan
   - [ ] Resources available
   - [ ] Competence verified
   - [ ] Awareness confirmed

8. Operasi
   - [ ] Operational planning
   - [ ] Control of processes
   - [ ] Product requirements`,
    "finding": `🔍 **Audit Finding Categories**

**Major Nonconformity:**
- Complete failure
- System not implemented
- Significant risk
- Requires immediate action
- 30 days closure

**Minor Nonconformity:**
- Isolated incident
- Minor system gap
- Lower risk
- 60-90 days closure

**Observation:**
- Potential improvement
- Best practice
- Advisory note
- Optional action

**CAPA Process:**
1. Root cause analysis
2. Corrective action
3. Preventive action
4. Effectiveness verification`,
    "roadmap": `🗺️ **Certification Roadmap**

**Fase 1: Preparation**
- Gap analysis
- Training awareness
- Documentation

**Fase 2: Implementation**
- System implementation
- Internal audit
- Management review

**Fase 3: Certification**
- Stage 1 Audit
- Stage 2 Audit
- Certification Decision

**Fase 4: Maintenance**
- Annual surveillance
- Recertification (3 years)`,
    "default": `📊 **Audit Agent Ready to Help!**

Saya dapat membantu:
• Pembuatan checklist audit
• Penjelasan finding categories
• Persiapan audit
• CAPA process
• Certification roadmap

Silakan tanyakan topik audit!`,
  },
  training: {
    "quiz": `❓ **Quiz Generator ISO**

**Available Topics:**
- ISO 9001:2015 (Quality)
- ISO 14001:2015 (Environment)
- ISO 45001:2018 (OHS)
- ISO 27001:2022 (Security)
- ISO 37001:2016 (Anti-Bribery)

**Question Types:**
- Multiple choice
- True/False
- Fill in the blank
- Case study

**Coverage:**
- Klausul requirements
- Principles
- Terminology
- Implementation`,
    "learning": `📚 **Learning Path ISO 9001**

**Level 1: Fundamentals**
- Introduction to QMS
- Quality principles
- Benefits of ISO 9001

**Level 2: Requirements**
- Clause by clause study
- Documentation requirements
- Process approach

**Level 3: Implementation**
- Gap analysis
- Documentation
- Internal audit

**Level 4: Certification**
- Audit preparation
- Case studies
- Mock exam`,
    "default": `📚 **Training Agent Ready to Help!**

Saya dapat membantu:
• Rekomendasi kursus ISO
• Quiz dan evaluasi
• Learning path
• Competency assessment

Silakan pilih topik pelatihan!`,
  },
  risk: {
    "assessment": `⚠️ **Risk Assessment ISO 31000**

**Process:**

1. **Context Establishment**
   - External context
   - Internal context
   - Risk criteria

2. **Risk Identification**
   - Hazard sources
   - Threats
   - Opportunities

3. **Risk Analysis**
   - Likelihood/Probability
   - Consequences/Impact
   - Risk level

4. **Risk Evaluation**
   - Risk matrix
   - Prioritization
   - Treatment needs

5. **Risk Treatment**
   - Avoid
   - Mitigate
   - Transfer
   - Accept`,
    "matrix": `📊 **Risk Matrix 5x5**

**Level Calculation:**
Risk Level = Probability × Impact

| Impact/Probability | 1 | 2 | 3 | 4 | 5 |
|-------------------|---|---|---|---|---|
| **5 (Catastrophic)** | M | H | H | C | C |
| **4 (Major)** | M | M | H | H | C |
| **3 (Moderate)** | L | M | M | H | H |
| **2 (Minor)** | L | L | M | M | H |
| **1 (Negligible)** | L | L | L | M | M |

**C = Critical, H = High, M = Medium, L = Low**`,
    "mitigation": `🛡️ **Risk Mitigation Plan**

**Treatment Options:**

1. **Avoid** - Eliminate risk
2. **Mitigate** - Reduce probability/impact
3. **Transfer** - Insurance, outsourcing
4. **Accept** - If risk acceptable

**Mitigation Actions:**
- Engineering controls
- Administrative controls
- PPE
- Training
- Procedures
- Monitoring`,
    "default": `⚠️ **Risk Agent Ready to Help!**

Saya dapat membantu:
• Risk assessment ISO 31000
• Risk matrix calculation
• Mitigation planning
• Risk register

Silakan tanyakan topik risiko!`,
  },
  compliance: {
    "monitoring": `📈 **Compliance Monitoring**

**Activities:**
- Regular assessment
- Internal audit
- External audit
- Self-declaration
- Continuous monitoring

**KPIs:**
- Audit findings closure rate
- Nonconformity trends
- Training completion
- Document compliance
- Regulatory updates`,
    "update": `📜 **Regulatory Updates**

**Recent Updates:**
- ISO 9001:2015 (Current)
- ISO 27001:2022 (Updated)
- ISO 14001:2015 (Current)
- ISO 45001:2018 (New - replaced OHSAS)

**Indonesian Standards:**
- SNI for various industries
- BSN regulations
- KAN accreditation`,
    "default": `✅ **Compliance Agent Ready to Help!**

Saya dapat membantu:
• Compliance monitoring
• Regulatory updates
• Document control
• Audit readiness

Silakan tanyakan topik compliance!`,
  },
};

export function getAgentResponse(agentType: AgentType, task: string): string {
  const knowledge = AGENT_KNOWLEDGE[agentType];
  if (!knowledge) {
    return "Maaf, saya tidak dapat memproses permintaan ini.";
  }

  const lowerTask = task.toLowerCase();

  for (const [key, response] of Object.entries(knowledge)) {
    if (key !== "default" && lowerTask.includes(key.toLowerCase())) {
      return response;
    }
  }

  return knowledge.default || "Permintaan telah diproses. Ada yang bisa saya bantu lagi?";
}

export function getAvailableActions(agentType: AgentType): string[] {
  const actions: Record<AgentType, string[]> = {
    orchestrator: ["Task decomposition", "Agent routing", "Result aggregation"],
    iso: ["Konsultasi ISO", "Gap analysis", "Requirements explanation"],
    legal: ["Regulatory consultation", "Compliance check", "UU explanation"],
    technical: ["Generate SOP", "Create template", "Document review"],
    audit: ["Create checklist", "Finding explanation", "Audit prep"],
    training: ["Quiz generation", "Course recommendation", "Learning path"],
    risk: ["Risk assessment", "Matrix calculation", "Mitigation plan"],
    compliance: ["Monitoring", "Updates", "Document control"],
  };

  return actions[agentType] || [];
}

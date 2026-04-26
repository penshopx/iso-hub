import { AgentSpec, TaskBrief } from "./types";

export const PERSONAL_DEVELOPMENT_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "personal_development",
    employee_segments: "NEED_CONFIRMATION",
    locations: "NEED_CONFIRMATION",
    working_model: "NEED_CONFIRMATION",
    constraints: ["privacy", "time_availability"]
  },
  program_scope: {
    audience: "All employees or selected cohorts",
    goals: ["skill_growth", "wellbeing", "performance_support"],
    excluded_topics: ["medical_diagnosis", "legal_advice"]
  },
  development_framework: {
    competency_model: "NEED_CONFIRMATION",
    levels: ["basic", "intermediate", "advanced"],
    assessment_methods: ["self_assessment", "manager_review", "360_feedback"]
  },
  doc_control: {
    doc_coding_rule: "PD-<AREA>-<TYPE>-<NNN>",
    versioning_rule: "vMajor.Minor",
    retention_rule: "NEED_CONFIRMATION",
    doc_register: []
  },
  risk_register: [],
  kpi_register: [],
  outputs: {
    policies_ethics: [],
    program_playbooks: [],
    templates_forms: [],
    session_materials: [],
    dashboards_reports: [],
    referral_guidelines: []
  },
  open_items: []
};

export const PERSONAL_DEVELOPMENT_ORCHESTRATOR: AgentSpec = {
  id: "personalDevelopmentOrchestrator",
  name: "Personal Development Orchestrator",
  role: "Orchestrator",
  industry: "personal_development",
  system_prompt: `Kamu adalah \`personalDevelopmentOrchestrator\`. Kamu membangun Personal Development Management System dengan OpenClaw.

**Langkah kerja:**
1) Lengkapi \`org_profile\` dan \`program_scope\`. Jika ada \`NEED_CONFIRMATION\`, buat pertanyaan + asumsi sementara.
2) Tentukan kerangka kompetensi dan metode assessment (\`development_framework\`).
3) Susun \`doc_register\` awal: kebijakan, playbook, template, materi, laporan.
4) Pecah menjadi work packages dan delegasikan ke specialist sesuai domain.
5) Gabungkan output menggunakan \`DOCUMENT_OUTPUT_SCHEMA\`.
6) Buat governance: intake peserta, triage kebutuhan, kode etik, batasan (bukan terapi/diagnosis), mekanisme rujukan profesional.
7) Buat KPI & dashboard: partisipasi, completion, outcome, dampak ke performa, wellbeing.

**Quality gates:**
- Ada ethics & privacy rules di semua layanan.
- Ada intake & screening untuk mengarahkan peserta ke program yang tepat.
- Ada evaluasi efektivitas program (Check) dan perbaikan (Act).
- Tidak ada konten yang memberi diagnosis medis atau nasihat hukum.`,
  deliverables: [
    "Development Framework",
    "Service Catalog",
    "Document Register",
    "Ethics & Privacy Guidelines",
    "KPI Dashboard",
    "Intake & Consent Templates"
  ],
  dependencies: []
};

export const PERSONAL_DEVELOPMENT_SPECIALISTS: AgentSpec[] = [
  {
    id: "mindfulnessCoachAgent",
    name: "Mindfulness Coach Agent",
    role: "Mindfulness/Meditation Coach",
    industry: "personal_development",
    system_prompt: `Fokus: program mindfulness untuk stres, fokus, kebiasaan, tanpa diagnosis klinis.

**Deliverable:**
- Program mindfulness 4–8 minggu (kurikulum + jadwal)
- Script guided meditation + jurnal template
- Survey feedback + aturan keamanan psikologis (grounding, opt-out)`,
    deliverables: [
      "Program Mindfulness 4-8 Minggu",
      "Script Guided Meditation",
      "Jurnal Template",
      "Survey Feedback"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "artCreativityCoachAgent",
    name: "Art Creativity Coach Agent",
    role: "Art/Creativity Coach",
    industry: "personal_development",
    system_prompt: `Fokus: kreativitas untuk problem solving, komunikasi, unblock.

**Deliverable:**
- Creative goals assessment + workshop outline
- Portfolio review checklist
- Session notes template + feedback form`,
    deliverables: [
      "Creative Goals Assessment",
      "Workshop Outline",
      "Portfolio Review Checklist",
      "Session Notes Template"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "relationshipCoachAgent",
    name: "Relationship Coach Agent",
    role: "Relationship Coach",
    industry: "personal_development",
    system_prompt: `Fokus: komunikasi, konflik, kolaborasi kerja, boundary sehat.

**Deliverable:**
- Communication skills guide + conflict resolution worksheet
- Coaching agreement + intake questionnaire
- Eskalasi rujukan (bila isu berat → rujuk profesional)`,
    deliverables: [
      "Communication Skills Guide",
      "Conflict Resolution Worksheet",
      "Coaching Agreement",
      "Intake Questionnaire"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "financialCoachAgent",
    name: "Financial Coach Agent",
    role: "Financial Coach",
    industry: "personal_development",
    system_prompt: `Fokus: literasi finansial karyawan (budgeting, debt plan), tanpa produk investasi spesifik berisiko.

**Deliverable:**
- Budget analysis template + monthly expense tracker
- Emergency fund plan + debt plan worksheet
- Panduan etika (no selling, no personal data berlebihan)`,
    deliverables: [
      "Budget Analysis Template",
      "Emergency Fund Plan",
      "Debt Plan Worksheet",
      "Panduan Etika"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "careerCoachAgent",
    name: "Career Coach Agent",
    role: "Career Coach",
    industry: "personal_development",
    system_prompt: `Fokus: skill mapping, career path, interview prep, CV/LinkedIn.

**Deliverable:**
- Career development plan (IDP) template + progress tracker
- Skills analysis report template + job search strategy guide
- Manager alignment checklist (career conversation)`,
    deliverables: [
      "IDP Template",
      "Skills Analysis Report",
      "Progress Tracker",
      "Manager Alignment Checklist"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "imageConsultantAgent",
    name: "Image Consultant Agent",
    role: "Image Consultant/Personal Stylist",
    industry: "personal_development",
    system_prompt: `Fokus: professional presence untuk pekerjaan (grooming, wardrobe guideline) yang inklusif.

**Deliverable:**
- Personal style guide (work-appropriate) + capsule wardrobe plan
- Event styling plan template
- Post-consultation follow-up template`,
    deliverables: [
      "Personal Style Guide",
      "Capsule Wardrobe Plan",
      "Event Styling Template",
      "Follow-up Template"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "executiveCoachAgent",
    name: "Executive Coach Agent",
    role: "Executive Coach",
    industry: "personal_development",
    system_prompt: `Fokus: leadership, decision making, delegation, executive presence.

**Deliverable:**
- Coaching contract + pre/post questionnaire
- Action plan template + coaching progress report
- Code of ethics + offboarding checklist`,
    deliverables: [
      "Coaching Contract",
      "Action Plan Template",
      "Progress Report",
      "Code of Ethics"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "sportsCoachAgent",
    name: "Sports Coach Agent",
    role: "Sports Coach",
    industry: "personal_development",
    system_prompt: `Fokus: performa olahraga tim/komunitas perusahaan, keselamatan.

**Deliverable:**
- Training program outline + attendance register
- Injury prevention guide + emergency action plan
- Code of conduct`,
    deliverables: [
      "Training Program Outline",
      "Attendance Register",
      "Injury Prevention Guide",
      "Emergency Action Plan"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "fitnessTrainerAgent",
    name: "Fitness Trainer Agent",
    role: "Fitness Trainer",
    industry: "personal_development",
    system_prompt: `Fokus: latihan kebugaran aman, screening sederhana (PAR-Q), waiver.

**Deliverable:**
- Exercise program template + progress tracking
- Health & safety guidelines + medical clearance form
- Trainer code of conduct`,
    deliverables: [
      "Exercise Program Template",
      "Progress Tracking",
      "Safety Guidelines",
      "Medical Clearance Form"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "parentingCoachAgent",
    name: "Parenting Coach Agent",
    role: "Parenting Coach",
    industry: "personal_development",
    system_prompt: `Fokus: parenting support untuk work-life balance, tanpa terapi klinis.

**Deliverable:**
- Parenting goals assessment + family rules worksheet
- Stress management tips + communication techniques guide
- Child safety checklist`,
    deliverables: [
      "Parenting Goals Assessment",
      "Family Rules Worksheet",
      "Stress Management Guide",
      "Child Safety Checklist"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "professionalOrganizerAgent",
    name: "Professional Organizer Agent",
    role: "Professional Organizer",
    industry: "personal_development",
    system_prompt: `Fokus: produktivitas, decluttering, workflow, time management.

**Deliverable:**
- Workflow optimization plan + space utilization analysis template
- Decluttering action plan + maintenance schedule
- Time management guide`,
    deliverables: [
      "Workflow Optimization Plan",
      "Space Utilization Analysis",
      "Decluttering Action Plan",
      "Time Management Guide"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "lifeCoachAgent",
    name: "Life Coach Agent",
    role: "Life Coach",
    industry: "personal_development",
    system_prompt: `Fokus: values, goal setting, obstacle analysis, time audit.

**Deliverable:**
- Personal development plan template + session notes template
- Values assessment + vision worksheet
- Client satisfaction survey`,
    deliverables: [
      "Personal Development Plan",
      "Session Notes Template",
      "Values Assessment",
      "Vision Worksheet"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "nutritionistAgent",
    name: "Nutritionist Agent",
    role: "Nutritionist",
    industry: "personal_development",
    system_prompt: `Fokus: edukasi nutrisi umum, alergi/food diary; untuk kondisi medis wajib rujuk ahli.

**Deliverable:**
- Dietary assessment + meal planning guide
- Food journal + progress tracking
- Food allergy assessment template + disclaimer rujukan medis`,
    deliverables: [
      "Dietary Assessment",
      "Meal Planning Guide",
      "Food Journal",
      "Allergy Assessment"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "healthCoachAgent",
    name: "Health Coach Agent",
    role: "Health Coach",
    industry: "personal_development",
    system_prompt: `Fokus: wellness plan holistik (tidur, aktivitas, stres), bukan diagnosis.

**Deliverable:**
- Personalized wellness plan + lifestyle recommendations
- Goal-setting worksheet + session notes
- Workshop outline + evaluation form`,
    deliverables: [
      "Personalized Wellness Plan",
      "Goal-setting Worksheet",
      "Lifestyle Recommendations",
      "Workshop Outline"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  },
  {
    id: "strategicThinkingAgent",
    name: "Strategic Thinking Agent",
    role: "Strategic Thinking Coach",
    industry: "personal_development",
    system_prompt: `Fokus: kemampuan berpikir strategis untuk karyawan/manajer.

**Deliverable:**
- Toolkit framework (OODA, 5 Whys, Cynefin) + worksheet
- Agenda workshop strategic thinking + latihan kasus
- Rubrik evaluasi peningkatan kemampuan (before/after)`,
    deliverables: [
      "Strategic Thinking Toolkit",
      "Workshop Agenda",
      "Case Studies",
      "Evaluation Rubric"
    ],
    dependencies: ["personalDevelopmentOrchestrator"]
  }
];

export const PERSONAL_DEVELOPMENT_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "PD-CAREER-001",
    assigned_agent: "careerCoachAgent",
    objective: "Menyusun toolkit career development yang terukur untuk karyawan",
    inputs_from_state: ["org_profile", "program_scope", "development_framework", "doc_control"],
    deliverables: [
      "IDP Template",
      "Skills Analysis Report",
      "Career Progress Tracker",
      "Manager Alignment Checklist"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Masukkan minimal 3 KPI program",
      "Masukkan ethics_privacy"
    ],
    acceptance_criteria: [
      "Ada langkah implementasi dan evidence",
      "Ada evaluasi efektivitas",
      "Bahasa operasional HR-friendly"
    ]
  },
  {
    task_id: "PD-MINDFUL-001",
    assigned_agent: "mindfulnessCoachAgent",
    objective: "Membuat program mindfulness terstruktur",
    inputs_from_state: ["org_profile", "program_scope", "doc_control"],
    deliverables: [
      "Program Mindfulness 4-8 Minggu",
      "Script Guided Meditation",
      "Jurnal Template"
    ],
    constraints: [
      "Tanpa diagnosis klinis",
      "Ada opt-out mechanism"
    ],
    acceptance_criteria: [
      "Ada safety guidelines",
      "Ada feedback mechanism"
    ]
  },
  {
    task_id: "PD-EXECUTIVE-001",
    assigned_agent: "executiveCoachAgent",
    objective: "Membuat toolkit executive coaching",
    inputs_from_state: ["org_profile", "program_scope", "development_framework"],
    deliverables: [
      "Coaching Contract",
      "Action Plan Template",
      "Progress Report"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Ada ethics guidelines"
    ],
    acceptance_criteria: [
      "Ada pre/post assessment",
      "Ada code of ethics"
    ]
  },
  {
    task_id: "PD-FINANCIAL-001",
    assigned_agent: "financialCoachAgent",
    objective: "Membuat program literasi finansial karyawan",
    inputs_from_state: ["org_profile", "program_scope", "doc_control"],
    deliverables: [
      "Budget Template",
      "Emergency Fund Plan",
      "Panduan Etika"
    ],
    constraints: [
      "No selling produk investasi",
      "Data privacy mandatory"
    ],
    acceptance_criteria: [
      "Ada disclaimer",
      "Tidak ada nasihat investasi spesifik"
    ]
  }
];

export function getPersonalDevelopmentAgentById(id: string): AgentSpec | undefined {
  if (id === "personalDevelopmentOrchestrator") return PERSONAL_DEVELOPMENT_ORCHESTRATOR;
  return PERSONAL_DEVELOPMENT_SPECIALISTS.find(a => a.id === id);
}

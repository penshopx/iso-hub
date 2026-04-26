export type AgentType = "orchestrator" | "iso" | "legal" | "technical" | "audit" | "training" | "risk" | "compliance";

export interface AgentCapability {
  name: string;
  description: string;
  keywords: string[];
  examples: string[];
}

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  icon: string;
  color: string;
  capabilities: AgentCapability[];
  status: "active" | "inactive" | "busy";
  currentTask?: number;
}

export interface TaskStep {
  id: string;
  agentType: AgentType;
  title: string;
  description: string;
  input: string;
  output?: string;
  status: "pending" | "running" | "completed" | "failed";
  dependsOn?: string[];
  executionTime?: number;
}

export interface MultiAgentTask {
  id: string;
  code: string;
  title: string;
  description: string;
  originalInput: string;
  orchestratorAgent: AgentType;
  steps: TaskStep[];
  status: "pending" | "decomposing" | "executing" | "aggregating" | "completed" | "failed";
  priority: "low" | "normal" | "high" | "critical";
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  executionTime?: number;
  result?: string;
  error?: string;
}

export const SPECIALIST_AGENTS: Agent[] = [
  {
    id: "iso",
    name: "ISO Agent",
    description: "Spesialis dalam standar ISO - ISO 9001, 14001, 45001, 27001, 37001, dan standar lainnya",
    icon: "📋",
    color: "blue",
    status: "active",
    capabilities: [
      {
        name: "ISO Standards Consultation",
        description: "Konsultasi standar ISO dan requirements",
        keywords: ["iso", "standar", "sertifikasi", "klausul", "mutu", "lingkungan", "k3", "keamanan"],
        examples: ["Apa itu ISO 9001?", "Jelaskan klausul 5.1", "Requirements ISO 14001"]
      },
      {
        name: "Gap Analysis",
        description: "Analisis kesenjangan terhadap standar ISO",
        keywords: ["gap", "analysis", "assesmen", "evaluasi"],
        examples: ["Gap analysis ISO 9001", "Assess kesiapan sertifikasi"]
      },
      {
        name: "Implementation Guidance",
        description: "Panduan implementasi sistem manajemen",
        keywords: ["implementasi", "guidance", "cara", "langkah"],
        examples: ["Cara implement ISO 9001", "Langkah implementasi"]
      }
    ]
  },
  {
    id: "legal",
    name: "Legal Agent",
    description: "Spesialis dalam regulasi dan compliance Indonesia",
    icon: "⚖️",
    color: "green",
    status: "active",
    capabilities: [
      {
        name: "Regulatory Consultation",
        description: "Konsultasi regulasi Indonesia",
        keywords: ["legal", "hukum", "uu", "regulasi", "peraturan"],
        examples: ["UU 20/2001", "Peraturan K3", "Compliance check"]
      },
      {
        name: "Anti-Corruption",
        description: "Regulasi anti korupsi Indonesia",
        keywords: ["korupsi", "anti", "pancek", "suap"],
        examples: ["PANCEK", "UU Antikorupsi", "Anti bribery"]
      },
      {
        name: "Compliance Check",
        description: "Pemeriksaan kepatuhan regulasi",
        keywords: ["compliance", "kepatuhan", "cek", "verifikasi"],
        examples: ["Cek compliance", "Verifikasi regulasi"]
      }
    ]
  },
  {
    id: "technical",
    name: "Technical Agent",
    description: "Spesialis dalam dokumentasi dan implementasi teknis",
    icon: "🔧",
    color: "purple",
    status: "active",
    capabilities: [
      {
        name: "Document Generation",
        description: "Pembuatan dokumen ISO",
        keywords: ["dokumen", "buat", "generate", "template"],
        examples: ["Buat SOP", "Generate template", "Buat kebijakan mutu"]
      },
      {
        name: "SOP Development",
        description: "Pengembangan Prosedur Operasional Standar",
        keywords: ["sop", "prosedur", "instruksi", "kerja"],
        examples: ["Buat SOP", "Template SOP", "Prosedur kerja"]
      },
      {
        name: "Template Management",
        description: "Manajemen template dokumen",
        keywords: ["template", "form", "format", "dokumen"],
        examples: ["Template dokumen", "Form ISO", "Format laporan"]
      }
    ]
  },
  {
    id: "audit",
    name: "Audit Agent",
    description: "Spesialis dalam audit dan persiapan sertifikasi",
    icon: "📊",
    color: "orange",
    status: "active",
    capabilities: [
      {
        name: "Audit Preparation",
        description: "Persiapan audit ISO",
        keywords: ["audit", "persiapan", "checklist", "siap"],
        examples: ["Persiapan audit", "Checklist audit", "Siap sertifikasi"]
      },
      {
        name: "Finding Management",
        description: "Manajemen temuan audit",
        keywords: ["finding", "temuan", "nonconformity", "capa"],
        examples: ["Temuan audit", "Nonconformity", "CAPA"]
      },
      {
        name: "Certification Roadmap",
        description: "Roadmap perjalanan sertifikasi",
        keywords: ["sertifikasi", "roadmap", "jalan", "langkah"],
        examples: ["Roadmap sertifikasi", "Langkah certification", "Timeline audit"]
      }
    ]
  },
  {
    id: "training",
    name: "Training Agent",
    description: "Spesialis dalam pembelajaran dan pengembangan kompetensi",
    icon: "📚",
    color: "cyan",
    status: "active",
    capabilities: [
      {
        name: "Course Recommendation",
        description: "Rekomendasi kursus ISO",
        keywords: ["kursus", "training", "pelatihan", "belajar"],
        examples: ["Rekomendasi kursus", "Training ISO", "Pelatihan"]
      },
      {
        name: "Quiz Generation",
        description: "Generasi quiz evaluasi",
        keywords: ["quiz", "ujian", "evaluasi", "soal"],
        examples: ["Buat quiz", "Soal ISO", "Evaluasi kompetensi"]
      },
      {
        name: "Learning Path",
        description: "Jalur pembelajaran ISO",
        keywords: ["learning", "path", "jalur", "belajar", "kompetensi"],
        examples: ["Learning path", "Jalur belajar", "Kompetensi ISO"]
      }
    ]
  },
  {
    id: "risk",
    name: "Risk Agent",
    description: "Spesialis dalam manajemen risiko ISO 31000",
    icon: "⚠️",
    color: "red",
    status: "active",
    capabilities: [
      {
        name: "Risk Assessment",
        description: "Penilaian risiko",
        keywords: ["risk", "risiko", "penilaian", "asesmen"],
        examples: ["Risk assessment", "Analisis risiko", "Penilaian risiko"]
      },
      {
        name: "Risk Matrix",
        description: "Matriks evaluasi risiko",
        keywords: ["matrix", "probabilitas", "dampak", "level"],
        examples: ["Risk matrix", "Level risiko", "Probability impact"]
      },
      {
        name: "Mitigation Plan",
        description: "Rencana mitigasi risiko",
        keywords: ["mitigasi", "pengurangan", "pencegahan", "rencana"],
        examples: ["Mitigation plan", "Rencana mitigasi", "Pengurangan risiko"]
      }
    ]
  },
  {
    id: "compliance",
    name: "Compliance Agent",
    description: "Spesialis dalam kepatuhan dan audit",
    icon: "✅",
    color: "teal",
    status: "active",
    capabilities: [
      {
        name: "Compliance Monitoring",
        description: "Pemantauan kepatuhan",
        keywords: ["compliance", "kepatuhan", "monitoring", "patuh"],
        examples: ["Compliance check", "Monitor kepatuhan", "Audit readiness"]
      },
      {
        name: "Regulatory Update",
        description: "Pembaruan regulasi",
        keywords: ["update", "regulasi", "baru", "perubahan"],
        examples: ["Regulasi baru", "Update compliance", "Perubahan regulasi"]
      },
      {
        name: "Document Control",
        description: "Kontrol dokumen",
        keywords: ["dokumen", "kontrol", "master", "record"],
        examples: ["Document control", "ISO dokumen", "Master document"]
      }
    ]
  }
];

export const ORCHESTRATOR_AGENT: Agent = {
  id: "orchestrator",
  name: "Orchestrator Agent",
  description: "Agent utama yang mengkoordinasikan tugas kompleks ke specialist agents",
  icon: "🤖",
  color: "violet",
  status: "active",
  capabilities: [
    {
      name: "Task Decomposition",
      description: "Penguraian tugas kompleks menjadi sub-tugas",
      keywords: ["decompose", "urai", "pecah", "bagi", "kompleks"],
      examples: ["Lakukan gap analysis lengkap", "Siapkan sertifikasi ISO 9001"]
    },
    {
      name: "Agent Routing",
      description: "Pengarahan tugas ke specialist agent yang tepat",
      keywords: ["route", "arah", "kirim", "assign"],
      examples: ["Tugas ini untuk agent yang tepat"]
    },
    {
      name: "Result Aggregation",
      description: "Pengumpulan dan penggabungan hasil",
      keywords: ["aggregate", "gabung", "kompilasi", "hasil"],
      examples: ["Kompilasi semua hasil"]
    },
    {
      name: "Workflow Management",
      description: "Manajemen alur kerja multi-agent",
      keywords: ["workflow", "alur", "proses", "sequence"],
      examples: ["Execute workflow", "Multi-step process"]
    }
  ]
};

export function detectAgents(task: string): { primary: AgentType; secondary: AgentType[] } {
  const lowerTask = task.toLowerCase();
  
  const agentKeywords: Record<AgentType, string[]> = {
    orchestrator: ["kompleks", "lengkap", "multiple", "semua", "keseluruhan"],
    iso: ["iso", "standar", "sertifikasi", "klausul", "9001", "14001", "45001", "mutu", "lingkungan", "k3"],
    legal: ["legal", "hukum", "uu", "regulasi", "korupsi", "pancek", "compliance", "kepatuhan"],
    technical: ["dokumen", "sop", "template", "kebijakan", "generate", "buat", "prosedur"],
    audit: ["audit", "checklist", "finding", "temuan", "sertifikasi", "assessment"],
    training: ["training", "kursus", "quiz", "belajar", "pelatihan", "learning", "kompetensi"],
    risk: ["risk", "risiko", "penilaian", "asesmen", "mitigasi", "matrix"],
    compliance: ["compliance", "kepatuhan", "monitoring", "update", "dokumen", "kontrol"],
  };

  let scores: Record<AgentType, number> = {
    orchestrator: 0,
    iso: 0,
    legal: 0,
    technical: 0,
    audit: 0,
    training: 0,
    risk: 0,
    compliance: 0,
  };

  for (const [agent, keywords] of Object.entries(agentKeywords)) {
    for (const keyword of keywords) {
      if (lowerTask.includes(keyword)) {
        scores[agent as AgentType] += 1;
      }
    }
  }

  const sortedAgents = Object.entries(scores)
    .filter(([agent]) => agent !== "orchestrator")
    .sort((a, b) => b[1] - a[1]);

  const primary = (sortedAgents[0]?.[1] || 0) > 0 
    ? sortedAgents[0]?.[0] as AgentType || "iso"
    : "iso";

  const secondary = sortedAgents
    .slice(1, 3)
    .filter(([, score]) => score > 0)
    .map(([agent]) => agent as AgentType);

  return { primary, secondary };
}

export function decomposeTask(task: string, primaryAgent: AgentType, secondaryAgents: AgentType[]): TaskStep[] {
  const steps: TaskStep[] = [];
  
  steps.push({
    id: crypto.randomUUID(),
    agentType: "orchestrator",
    title: "Task Decomposition",
    description: "Menguraikan tugas menjadi sub-tugas untuk specialist agents",
    input: task,
    status: "completed",
  });

  steps.push({
    id: crypto.randomUUID(),
    agentType: primaryAgent,
    title: `Execute with ${SPECIALIST_AGENTS.find(a => a.id === primaryAgent)?.name || primaryAgent}`,
    description: `Menjalankan tugas utama dengan ${primaryAgent} agent`,
    input: task,
    status: "pending",
    dependsOn: [steps[0].id],
  });

  for (const secondaryAgent of secondaryAgents) {
    steps.push({
      id: crypto.randomUUID(),
      agentType: secondaryAgent,
      title: `Execute with ${SPECIALIST_AGENTS.find(a => a.id === secondaryAgent)?.name || secondaryAgent}`,
      description: `Menjalankan sub-tugas dengan ${secondaryAgent} agent`,
      input: task,
      status: "pending",
      dependsOn: [steps[0].id],
    });
  }

  steps.push({
    id: crypto.randomUUID(),
    agentType: "orchestrator",
    title: "Result Aggregation",
    description: "Mengumpulkan dan menggabungkan hasil dari semua specialist agents",
    input: "",
    status: "pending",
    dependsOn: steps.slice(1).map(s => s.id),
  });

  return steps;
}

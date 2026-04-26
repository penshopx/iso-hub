import { Link } from "wouter";

const agents = [
  {
    id: "iso-agent",
    name: "ISO Agent",
    description: "Expert dalam standar ISO - ISO 9001, 14001, 45001, 27001, 37001, PANCEK, dan lainnya",
    capabilities: [
      "Konsultasi standar ISO",
      "Gap analysis",
      " Klausul requirements",
      "Implementasi guidance",
    ],
    status: "active",
    color: "blue",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "legal-agent",
    name: "Legal Agent",
    description: "Expert dalam regulasi dan compliance Indonesia - UU Anti Korupsi, Peraturan K3, Lingkungan",
    capabilities: [
      "Konsultasi regulasi",
      "Compliance check",
      "Peraturan pemerintah",
      "UU No 20/2001",
    ],
    status: "active",
    color: "green",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m12-2l.001 2.5m-6-2l.001 2.5",
  },
  {
    id: "technical-agent",
    name: "Technical Agent",
    description: "Expert dalam dokumentasi dan implementasi - Pembuatan dokumen, SOP, Template",
    capabilities: [
      "Pembuatan dokumen",
      "Generator SOP",
      "Template management",
      "Implementation roadmap",
    ],
    status: "active",
    color: "purple",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    id: "audit-agent",
    name: "Audit Agent",
    description: "Expert dalam audit dan sertifikasi - Audit preparation, Checklist, Finding tracking",
    capabilities: [
      "Persiapan audit",
      "Checklist generation",
      "Finding tracking",
      "Certification roadmap",
    ],
    status: "active",
    color: "orange",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    id: "training-agent",
    name: "Training Agent",
    description: "Expert dalam pembelajaran dan pengembangan - Course, Quiz, Learning path",
    capabilities: [
      "Rekomendasi kursus",
      "Quiz generation",
      "Learning path",
      "Competency assessment",
    ],
    status: "active",
    color: "cyan",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
];

const agentColors: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
};

export default function AgentsPage() {
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
              <h1 className="text-xl font-semibold">Agent Control Center</h1>
              <p className="text-sm text-neutral-400">Kelola Specialist Agents</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Orchestrator Section */}
        <div className="mb-12">
          <div className="p-8 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Agent Orchestrator</h2>
                <p className="text-purple-100 mb-4">
                  OPC CLAW - Mengkoordinasi specialist agents untuk menyelesaikan tugas ISO Anda
                </p>
                <Link href="/opc" className="inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
                  Buka OPC Console
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-sm text-neutral-400">Active Agents</div>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-sm text-neutral-400">Availability</div>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-sm text-neutral-400">Task Success</div>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="text-2xl font-bold text-yellow-400">&lt;2s</div>
              <div className="text-sm text-neutral-400">Response Time</div>
            </div>
          </div>
        </div>

        {/* Specialist Agents */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Specialist Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 ${agentColors[agent.color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={agent.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </div>
                      <p className="text-sm text-neutral-400">{agent.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-neutral-500 uppercase mb-2">Capabilities:</h4>
                    <ul className="space-y-1">
                      {agent.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-neutral-400">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      href={`/opc?agent=${agent.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-center transition-colors"
                    >
                      Gunakan
                    </Link>
                    <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h3 className="font-semibold mb-4">Cara Kerja Multi-Agent System</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-4 bg-neutral-700 rounded-lg text-center">
              <div className="w-10 h-10 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
              <p className="text-sm">Submit Task</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-neutral-700 rounded-lg text-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
              <p className="text-sm">Orchestrator Decomposes</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-neutral-700 rounded-lg text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
              <p className="text-sm">Agents Execute</p>
            </div>
            <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
            <div className="flex-1 p-4 bg-neutral-700 rounded-lg text-center">
              <div className="w-10 h-10 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
              <p className="text-sm">Results Aggregated</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { db } from "@/db";
import { consultingProjects, projectTasks, projectMilestones } from "@/db/schema";

async function getProjects() {
  const projects = await db.select().from(consultingProjects);
  return projects;
}

async function getProjectStats(projectId: number) {
  const allTasks = await db.select().from(projectTasks);
  const tasks = allTasks.filter(t => t.projectId === projectId);
  const allMilestones = await db.select().from(projectMilestones);
  const milestones = allMilestones.filter(m => m.projectId === projectId);
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  return {
    totalTasks: tasks.length,
    completedTasks,
    totalMilestones: milestones.length,
    progress: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0,
  };
}

const statusColors: Record<string, string> = {
  planning: "bg-yellow-500",
  "in_progress": "bg-blue-500",
  completed: "bg-green-500",
  on_hold: "bg-red-500",
};

const isoColors: Record<string, string> = {
  "ISO 45001": "bg-red-500",
  "ISO 14001": "bg-green-500",
  "ISO 9001": "bg-blue-500",
};

function getStatusColor(status: string | null): string {
  return statusColors[status || "planning"] || "bg-yellow-500";
}

function getIsoColor(iso: string | null): string {
  return isoColors[iso || "ISO 9001"] || "bg-blue-500";
}

export default async function ProyekPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Proyek Konsultansi</h1>
                <p className="text-sm text-neutral-400">Kelola proyek implementasi ISO</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Proyek Baru
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full p-12 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Belum Ada Proyek</h3>
              <p className="text-neutral-400 mb-4">Mulai proyek konsultansi ISO baru</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">
                Buat Proyek Pertama
              </button>
            </div>
          ) : (
            projects.map(async (project) => {
              const stats = await getProjectStats(project.id);
              return (
                <div key={project.id} className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 ${getIsoColor(project.isoStandard)} rounded-lg flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)} bg-opacity-20 text-white`}>
                      {(project.status || "planning").replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-neutral-400 mb-4">{project.client}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-400">Progress</span>
                      <span>{stats.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all" 
                        style={{ width: `${stats.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>{stats.completedTasks}/{stats.totalTasks} Tugas</span>
                    <span>{stats.totalMilestones} Milestone</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Proyek</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{projects.length}</div>
              <div className="text-sm text-neutral-400">Total Proyek</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{projects.filter(p => p.status === "planning").length}</div>
              <div className="text-sm text-neutral-400">Perencanaan</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{projects.filter(p => p.status === "in_progress").length}</div>
              <div className="text-sm text-neutral-400">Sedang Berjalan</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{projects.filter(p => p.status === "completed").length}</div>
              <div className="text-sm text-neutral-400">Selesai</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

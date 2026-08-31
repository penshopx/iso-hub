import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ClipboardCheck,
  FolderKanban,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getGetProjectsQueryKey,
  useCreateProject,
  useGetCurrentAuthUser,
  useGetProjects,
  type CreateProjectRequest,
} from "@workspace/api-client-react";
import { getReadinessSummary } from "@/lib/readiness";

const statusColors: Record<string, string> = {
  planning: "bg-yellow-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
  on_hold: "bg-red-500",
};

const isoColors: Record<string, string> = {
  "ISO 45001": "bg-red-500",
  "ISO 14001": "bg-green-500",
  "ISO 9001": "bg-blue-500",
  "ISO 39001": "bg-cyan-500",
};

function getStatusColor(status: string | null | undefined): string {
  return statusColors[status || "planning"] || "bg-yellow-500";
}

function getIsoColor(iso: string | null | undefined): string {
  return isoColors[iso || "ISO 9001"] || "bg-blue-500";
}

export default function ProyekPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createError, setCreateError] = useState("");
  const authQuery = useGetCurrentAuthUser();
  const projectsQuery = useGetProjects({
    query: {
      enabled: Boolean(authQuery.data?.user),
      queryKey: getGetProjectsQueryKey(),
    },
  });
  const createProject = useCreateProject();
  const projects = projectsQuery.data?.data ?? [];
  const form = useForm<CreateProjectRequest>({
    defaultValues: {
      name: "",
      client: "",
      isoStandard: "ISO 9001",
      description: "",
    },
  });

  const submitProject = form.handleSubmit(async (values) => {
    setCreateError("");
    try {
      const created = await createProject.mutateAsync({ data: values });
      queryClient.setQueryData(
        getGetProjectsQueryKey(),
        projectsQuery.data
          ? { ...projectsQuery.data, data: [created.data, ...projects] }
          : { success: true, data: [created.data] },
      );
      form.reset();
      setShowCreateForm(false);
      setLocation(`/kesiapan-proyek?projectId=${created.data.id}`);
    } catch (error) {
      setCreateError(
        error instanceof Error ? error.message : "Proyek gagal dibuat",
      );
    }
  });

  if (authQuery.isLoading) {
    return (
      <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-400" data-testid="status-project-auth-loading">
          <Loader2 className="w-5 h-5 animate-spin" />
          Memeriksa sesi...
        </div>
      </main>
    );
  }

  if (!authQuery.data?.user) {
    return (
      <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center px-6">
        <div className="max-w-md rounded-xl border border-neutral-700 bg-neutral-800 p-8 text-center">
          <FolderKanban className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">Masuk untuk mengelola proyek</h1>
          <p className="text-sm text-neutral-400 mb-6">
            Proyek dan penilaian kesiapan dipisahkan untuk setiap akun ISO Hub.
          </p>
          <a
            href="/api/login?returnTo=/proyek"
            className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-500"
            data-testid="link-project-login"
          >
            Masuk ke ISO Hub
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-neutral-400 hover:text-white transition-colors"
                data-testid="link-projects-home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Proyek Konsultansi</h1>
                <p className="text-sm text-neutral-400">
                  Kelola proyek dan lanjutkan penilaian kesiapan ISO
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCreateForm((current) => !current)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
              data-testid="button-toggle-create-project"
            >
              {showCreateForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showCreateForm ? "Tutup" : "Proyek Baru"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {showCreateForm && (
          <section className="mb-8 rounded-xl border border-blue-900/50 bg-neutral-800 p-6" data-testid="section-create-project">
            <h2 className="text-lg font-semibold mb-1">Buat proyek penilaian</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Proyek disimpan sebagai data internal ISO Hub.
            </p>
            <Form {...form}>
              <form onSubmit={submitProject} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Nama proyek wajib diisi" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama proyek</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-neutral-600 bg-neutral-900 text-white"
                          placeholder="Implementasi IMS Site A"
                          data-testid="input-project-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client"
                  rules={{ required: "Nama klien wajib diisi" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Klien / unit kerja</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-neutral-600 bg-neutral-900 text-white"
                          placeholder="PT Contoh Konstruksi"
                          data-testid="input-project-client"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isoStandard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Standar utama</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-9 w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-1 text-sm text-white"
                          data-testid="select-project-standard"
                        >
                          <option value="ISO 9001">ISO 9001</option>
                          <option value="ISO 14001">ISO 14001</option>
                          <option value="ISO 45001">ISO 45001</option>
                          <option value="ISO 39001">ISO 39001</option>
                          <option value="IMS">IMS / Multi-standar</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi singkat</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-neutral-600 bg-neutral-900 text-white"
                          placeholder="Ruang lingkup atau lokasi proyek"
                          data-testid="input-project-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2 flex items-center justify-end gap-3">
                  {createError && (
                    <span className="text-sm text-red-400" data-testid="text-create-project-error">
                      {createError}
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={createProject.isPending}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
                    data-testid="button-create-project"
                  >
                    {createProject.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {createProject.isPending ? "Membuat..." : "Buat & mulai penilaian"}
                  </button>
                </div>
              </form>
            </Form>
          </section>
        )}

        {projectsQuery.isLoading ? (
          <div className="flex items-center justify-center gap-3 p-16 text-neutral-400" data-testid="status-projects-loading">
            <Loader2 className="w-5 h-5 animate-spin" />
            Memuat proyek...
          </div>
        ) : projectsQuery.isError ? (
          <div className="p-10 bg-red-950/20 rounded-lg border border-red-900/50 text-center text-red-300" data-testid="status-projects-error">
            Proyek belum dapat dimuat. Coba muat ulang halaman.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length === 0 ? (
              <div className="col-span-full p-12 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
                <FolderKanban className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Belum Ada Proyek</h3>
                <p className="text-neutral-400 mb-4">
                  Buat proyek untuk menyimpan penilaian kesiapan ISO.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
                  data-testid="button-create-first-project"
                >
                  Buat Proyek Pertama
                </button>
              </div>
            ) : (
              projects.map((project) => {
                const summary = project.readiness
                  ? getReadinessSummary(
                      project.readiness.needType,
                      project.readiness.selectedStandards,
                      project.readiness.checkedItems,
                    )
                  : null;
                const progress = summary?.percentage ?? project.progress ?? 0;

                return (
                  <article
                    key={project.id}
                    className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
                    data-testid={`card-project-${project.id}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 ${getIsoColor(project.isoStandard)} rounded-lg flex items-center justify-center`}>
                        <ClipboardCheck className="w-5 h-5 text-white" />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)} bg-opacity-20 text-white`}>
                        {(project.status || "planning").replace("_", " ").toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-semibold mb-1" data-testid={`text-project-name-${project.id}`}>{project.name}</h3>
                    <p className="text-sm text-neutral-400 mb-4">{project.client}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-400">Kesiapan</span>
                        <span data-testid={`text-project-readiness-${project.id}`}>{progress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-neutral-400 mb-5">
                      <span>{summary ? `${summary.completedCount}/${summary.totalCount} selesai` : "Belum dinilai"}</span>
                      <span>{summary ? `${summary.gapCount} gap` : project.isoStandard}</span>
                    </div>
                    <Link
                      href={`/kesiapan-proyek?projectId=${project.id}`}
                      className="block w-full rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-center text-sm font-semibold text-blue-300 hover:bg-blue-500/20"
                      data-testid={`link-project-readiness-${project.id}`}
                    >
                      {project.readiness ? "Lanjutkan penilaian" : "Mulai penilaian"}
                    </Link>
                  </article>
                );
              })
            )}
          </div>
        )}

        <div className="mt-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Proyek</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{projects.length}</div>
              <div className="text-sm text-neutral-400">Total Proyek</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{projects.filter((project) => !project.readiness).length}</div>
              <div className="text-sm text-neutral-400">Belum Dinilai</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{projects.filter((project) => project.readiness).length}</div>
              <div className="text-sm text-neutral-400">Sudah Dinilai</div>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {projects.reduce((total, project) => {
                  if (!project.readiness) return total;
                  return total + getReadinessSummary(
                    project.readiness.needType,
                    project.readiness.selectedStandards,
                    project.readiness.checkedItems,
                  ).gapCount;
                }, 0)}
              </div>
              <div className="text-sm text-neutral-400">Total Gap</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
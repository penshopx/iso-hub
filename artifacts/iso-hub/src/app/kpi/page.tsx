import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Activity, AlertTriangle,
  CheckCircle2, Plus, Target,
  ChevronRight, ArrowUpRight, TrendingUp, X
} from "lucide-react";
import {
  useKPIs, useRecordMeasurement, useManagementReviews,
  useCreateManagementReview, useFindings, useCreateAction, useCreateKPI
} from "@/hooks/use-qms";
import { ErrorState, LoadingState, EmptyState } from "@/components/qms-states";

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/50">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function KPIDashboardPage() {
  const { data: kpis, isLoading: isLoadingKPIs, error: kpiError, refetch: refetchKPIs } = useKPIs();
  const { data: reviews, isLoading: isLoadingReviews, error: reviewsError } = useManagementReviews();
  const { data: findings } = useFindings();
  
  const recordMeasurement = useRecordMeasurement();
  const createKPI = useCreateKPI();
  const createReview = useCreateManagementReview();
  const createAction = useCreateAction();

  const [activeKpiId, setActiveKpiId] = useState<string | number | null>(null);
  const [isMeasurementModalOpen, setIsMeasurementModalOpen] = useState(false);
  const [isKpiModalOpen, setIsKpiModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // CAPA flow for below-target KPIs
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const stats = useMemo(() => {
    if (!kpis) return { total: 0, onTrack: 0, below: 0, noData: 0, avgAchievement: 0 };
    const total = kpis.length;
    const onTrack = kpis.filter(k => k.status === 'on_track').length;
    const below = kpis.filter(k => k.status === 'below_target').length;
    const noData = kpis.filter(k => k.status === 'no_data').length;
    
    const kpisWithAch = kpis.filter(k => typeof k.achievement === 'number');
    const avgAchievement = kpisWithAch.length 
      ? Math.round(kpisWithAch.reduce((acc, k) => acc + (k.achievement || 0), 0) / kpisWithAch.length) 
      : 0;

    return { total, onTrack, below, noData, avgAchievement };
  }, [kpis]);

  if (isLoadingKPIs || isLoadingReviews) return <LoadingState />;
  if (kpiError) return <ErrorState error={kpiError} onRetry={refetchKPIs} />;
  
  const handleRecordMeasurement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeKpiId) return;
    const fd = new FormData(e.currentTarget);
    recordMeasurement.mutate({
      kpiId: activeKpiId,
      data: {
        actual: Number(fd.get("actual")),
        period: fd.get("period") as string,
        notes: fd.get("notes") as string
      }
    }, {
      onSuccess: () => {
        setIsMeasurementModalOpen(false);
        setActiveKpiId(null);
      }
    });
  };

  const handleCreateKPI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createKPI.mutate({
      code: fd.get("code") as string,
      name: fd.get("name") as string,
      category: fd.get("category") as string,
      unit: fd.get("unit") as string,
      target: Number(fd.get("target")),
      direction: fd.get("direction") as "higher_better" | "lower_better",
      owner: fd.get("owner") as string,
    }, {
      onSuccess: () => setIsKpiModalOpen(false),
    });
  };

  const handleCreateReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createReview.mutate({
      title: fd.get("title") as string,
      period: fd.get("period") as string,
      status: "draft",
      notes: fd.get("notes") as string
    }, {
      onSuccess: () => setIsReviewModalOpen(false)
    });
  };

  const handleCreateActionForKPI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const sourceId = fd.get("findingId") as string;
    
    if (!sourceId) return;
    
    createAction.mutate({
      findingId: sourceId,
      sourceType: "finding",
      sourceId: sourceId,
      action: fd.get("action") as string,
      responsible: fd.get("responsible") as string,
      dueDate: fd.get("dueDate") as string,
      status: "pending"
    }, {
      onSuccess: () => setIsActionModalOpen(false)
    });
  };

  const openActionModal = () => {
    setIsActionModalOpen(true);
  };

  return (
    <main className="min-h-[100dvh] bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Performance & KPIs</h1>
              <p className="text-sm text-neutral-400">Construction QMS Metrics</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsKpiModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> KPI Baru
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total KPIs" value={stats.total} icon={<Activity />} color="text-blue-400" bg="bg-blue-500/10" />
          <StatCard title="On Track" value={stats.onTrack} icon={<CheckCircle2 />} color="text-green-400" bg="bg-green-500/10" />
          <StatCard title="Below Target" value={stats.below} icon={<AlertTriangle />} color="text-red-400" bg="bg-red-500/10" />
          <StatCard title="Avg Achievement" value={`${stats.avgAchievement}%`} icon={<Target />} color="text-amber-400" bg="bg-amber-500/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
              <h2 className="text-lg font-semibold text-white">KPI Register</h2>
            </div>
            
            {(!kpis || kpis.length === 0) ? (
              <EmptyState
                title="Belum Ada KPI"
                description="Buat KPI pertama untuk mulai mencatat target dan hasil aktual."
                action={<button onClick={() => setIsKpiModalOpen(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">Buat KPI</button>}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-900/30 text-xs uppercase tracking-wider text-neutral-500">
                      <th className="px-5 py-3 font-semibold">KPI Details</th>
                      <th className="px-5 py-3 font-semibold">Target vs Actual</th>
                      <th className="px-5 py-3 font-semibold w-1/4">Achievement</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {kpis.map((kpi) => (
                      <tr key={kpi.id} className="hover:bg-neutral-800/20 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-medium text-white mb-0.5">{kpi.name}</div>
                          <div className="text-xs text-neutral-500 flex gap-2">
                            <span className="font-mono text-neutral-400">{kpi.code}</span>
                            <span>•</span>
                            <span>{kpi.category}</span>
                            <span>•</span>
                            <span>Owner: {kpi.owner}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-sm">
                            <span className="text-neutral-400">Target: </span> 
                            <span className="font-medium text-white">{kpi.target} {kpi.unit}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-neutral-400">Actual: </span> 
                            <span className="font-medium text-white">{kpi.actual !== undefined ? `${kpi.actual} ${kpi.unit}` : '-'}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {kpi.achievement !== undefined ? (
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${kpi.status === 'on_track' ? 'bg-green-500' : 'bg-red-500'}`}
                                  style={{ width: `${Math.min(Math.max(kpi.achievement, 0), 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium min-w-[3ch] text-right">{Math.round(kpi.achievement)}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-600">No data</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold ${
                            kpi.status === 'on_track' ? 'bg-green-500/10 text-green-400' :
                            kpi.status === 'below_target' ? 'bg-red-500/10 text-red-400' :
                            'bg-neutral-800 text-neutral-400'
                          }`}>
                            {kpi.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button 
                            onClick={() => { setActiveKpiId(kpi.id); setIsMeasurementModalOpen(true); }}
                            className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-blue-400 rounded-lg transition-colors inline-flex"
                            title="Record Measurement"
                          >
                            <TrendingUp className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Needs Attention
              </h2>
              {stats.below === 0 ? (
                <div className="text-sm text-neutral-400 text-center py-6">All KPIs are on track.</div>
              ) : (
                <div className="space-y-4">
                  {kpis?.filter(k => k.status === 'below_target').map(kpi => (
                    <div key={kpi.id} className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <h3 className="font-medium text-red-100 text-sm mb-1">{kpi.name}</h3>
                      <p className="text-xs text-red-400/80 mb-3">Actual {kpi.actual}{kpi.unit} vs Target {kpi.target}{kpi.unit}</p>
                      <button 
                        onClick={openActionModal}
                        className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded text-xs font-medium transition-colors"
                      >
                        Address Issue via CAPA
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Management Review</h2>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {!reviews || reviews.length === 0 ? (
                <div className="text-sm text-neutral-500 text-center py-6">No reviews scheduled.</div>
              ) : (
                <div className="space-y-3">
                  {reviews.map(review => (
                    <div key={review.id} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-white">{review.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                          review.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                          review.status === 'in_review' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-neutral-800 text-neutral-400'
                        }`}>{review.status.replace('_', ' ')}</span>
                      </div>
                      <div className="text-xs text-neutral-500">Period: {review.period}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isMeasurementModalOpen} onClose={() => { setIsMeasurementModalOpen(false); setActiveKpiId(null); }} title="Record Measurement">
        <form onSubmit={handleRecordMeasurement} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Measured Value</label>
            <input 
              name="actual" type="number" step="any" required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter numerical value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Periode Pengukuran</label>
            <input 
              name="period" type="text" required
              defaultValue={new Date().toISOString().slice(0, 7)}
              placeholder="Contoh: 2026-08 atau Q3 2026"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Notes / Analysis</label>
            <textarea 
              name="notes" rows={3}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Explain variations or context..."
            />
          </div>
          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button type="button" onClick={() => { setIsMeasurementModalOpen(false); setActiveKpiId(null); }} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={recordMeasurement.isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              {recordMeasurement.isPending ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isKpiModalOpen} onClose={() => setIsKpiModalOpen(false)} title="Buat KPI">
        <form onSubmit={handleCreateKPI} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Kode</label>
            <input name="code" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm" placeholder="QMS-01" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Kategori</label>
            <input name="category" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm" placeholder="Mutu" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-1">Nama KPI</label>
            <input name="name" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Target</label>
            <input name="target" type="number" step="any" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Satuan</label>
            <input name="unit" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm" placeholder="%, hari, kasus" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Arah Target</label>
            <select name="direction" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm">
              <option value="higher_better">Lebih tinggi lebih baik</option>
              <option value="lower_better">Lebih rendah lebih baik</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Owner</label>
            <input name="owner" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button type="button" onClick={() => setIsKpiModalOpen(false)} className="px-4 py-2 bg-neutral-800 rounded-lg text-sm">Batal</button>
            <button type="submit" disabled={createKPI.isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium disabled:opacity-50">
              {createKPI.isPending ? "Menyimpan..." : "Simpan KPI"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="Schedule Management Review">
        <form onSubmit={handleCreateReview} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Review Title</label>
            <input 
              name="title" type="text" required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Q1 2026 QMS Review"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Evaluation Period</label>
            <input 
              name="period" type="text" required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Jan - Mar 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Agenda Notes (Optional)</label>
            <textarea 
              name="notes" rows={3}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Include below-target KPIs for discussion..."
            />
          </div>
          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button type="button" onClick={() => setIsReviewModalOpen(false)} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={createReview.isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              {createReview.isPending ? 'Saving...' : 'Create Review'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)} title="Address KPI Issue">
        {(!findings || findings.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-neutral-950 border border-neutral-800 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-base font-semibold text-white mb-2">No Eligible Sources Found</h3>
            <p className="text-sm text-neutral-400 mb-6 max-w-sm">
              Corrective actions must be linked to a specific finding or risk. You currently have no findings in the system.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsActionModalOpen(false)} className="px-4 py-2 bg-neutral-800 text-white rounded font-medium">Cancel</button>
              <Link href="/audit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium inline-flex items-center gap-2">
                Go to Audit Findings <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateActionForKPI} className="flex flex-col gap-4">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-200/80 leading-relaxed">
                To address a below-target KPI, you must attach the corrective action to an existing finding. Select the relevant finding below.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Select Source Finding</label>
              <select 
                name="findingId" required 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Select a finding --</option>
                {findings.filter(f => f.status === 'open').map(f => (
                  <option key={f.id} value={f.id}>{f.description} ({f.category})</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Action Required</label>
              <textarea 
                name="action" required rows={3}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe how to fix the KPI underperformance..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Responsible Role</label>
                <input 
                  name="responsible" type="text" required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Due Date</label>
                <input 
                  name="dueDate" type="date" required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-800">
              <button type="button" onClick={() => setIsActionModalOpen(false)} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={createAction.isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                {createAction.isPending ? 'Linking Action...' : 'Create CAPA'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
}

function StatCard({ title, value, icon, color, bg }: { title: string, value: string | number, icon: React.ReactNode, color: string, bg: string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

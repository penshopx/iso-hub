import { useState, useMemo } from "react";
import { Link } from "wouter";
import { 
  Plus, Search, ChevronDown, ChevronRight, X, AlertCircle, 
  CheckCircle2, Clock, ShieldAlert, BarChart3, Target, Calendar
} from "lucide-react";
import { 
  useFindings, useActions, useCreateFinding, useUpdateFinding, 
  useCreateAction, useUpdateAction, Finding, CorrectiveAction 
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

export default function AuditManagementPage() {
  const { data: findings, isLoading: isLoadingFindings, error: findingsError, refetch: refetchFindings } = useFindings();
  const { data: actions, isLoading: isLoadingActions, error: actionsError } = useActions();

  const createFinding = useCreateFinding();
  const updateFinding = useUpdateFinding();
  const createAction = useCreateAction();
  const updateAction = useUpdateAction();

  const [isAddFindingOpen, setIsAddFindingOpen] = useState(false);
  const [selectedFindingId, setSelectedFindingId] = useState<string | number | null>(null);
  const [isAddActionOpen, setIsAddActionOpen] = useState(false);
  const [actionSourceFindingId, setActionSourceFindingId] = useState<string | number | null>(null);

  const stats = useMemo(() => {
    if (!findings) return { total: 0, open: 0, closed: 0, closureRate: 0, major: 0, minor: 0, obs: 0 };
    const total = findings.length;
    const closed = findings.filter(f => f.status === "closed").length;
    const open = total - closed;
    const major = findings.filter(f => f.category === "major").length;
    const minor = findings.filter(f => f.category === "minor").length;
    const obs = findings.filter(f => f.category === "obs").length;
    return {
      total,
      open,
      closed,
      closureRate: total ? Math.round((closed / total) * 100) : 0,
      major,
      minor,
      obs
    };
  }, [findings]);

  if (isLoadingFindings || isLoadingActions) return <LoadingState />;
  if (findingsError) return <ErrorState error={findingsError} onRetry={refetchFindings} />;
  
  const handleCreateFinding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createFinding.mutate({
      description: fd.get("description") as string,
      category: fd.get("category") as string,
      standard: fd.get("standard") as string,
      context: fd.get("context") as string,
      severity: fd.get("severity") as string,
      status: "open",
      dueDate: fd.get("dueDate") as string,
    }, {
      onSuccess: () => setIsAddFindingOpen(false)
    });
  };

  const handleCreateAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!actionSourceFindingId) return;
    const fd = new FormData(e.currentTarget);
    createAction.mutate({
      findingId: actionSourceFindingId,
      sourceType: "finding",
      sourceId: actionSourceFindingId,
      action: fd.get("action") as string,
      responsible: fd.get("responsible") as string,
      dueDate: fd.get("dueDate") as string,
      status: "pending"
    }, {
      onSuccess: () => setIsAddActionOpen(false)
    });
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
              <h1 className="text-xl font-bold tracking-tight">Audit & Findings</h1>
              <p className="text-sm text-neutral-400">Live QMS Action Tracking</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAddFindingOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            >
              <Plus className="w-4 h-4" /> Add Finding
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Findings" value={stats.total} icon={<Target />} color="text-blue-400" bg="bg-blue-500/10" />
          <StatCard title="Open Issues" value={stats.open} icon={<AlertCircle />} color="text-red-400" bg="bg-red-500/10" />
          <StatCard title="Closed" value={stats.closed} icon={<CheckCircle2 />} color="text-green-400" bg="bg-green-500/10" />
          <StatCard title="Closure Rate" value={`${stats.closureRate}%`} icon={<BarChart3 />} color="text-yellow-400" bg="bg-yellow-500/10" />
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
            <h2 className="text-lg font-semibold text-white">Active Findings Register</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search findings..." 
                  className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-neutral-500 w-64"
                />
              </div>
            </div>
          </div>
          
          {(!findings || findings.length === 0) ? (
            <EmptyState 
              title="No Findings Logged" 
              description="Your audit register is empty. Start by logging a new finding."
              action={
                <button 
                  onClick={() => setIsAddFindingOpen(true)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Log First Finding
                </button>
              }
            />
          ) : (
            <div className="divide-y divide-neutral-800/50">
              {findings.map((finding) => {
                const isExpanded = selectedFindingId === finding.id;
                const findingActions = actions?.filter(
                  a => String(a.sourceId) === String(finding.id) && a.sourceType === "finding"
                ) || [];
                const canClose = findingActions.length > 0 && findingActions.every(
                  action =>
                    action.status === "completed" &&
                    action.effectivenessStatus === "verified" &&
                    Boolean(action.evidence?.trim()) &&
                    Boolean(action.effectivenessCheck?.trim())
                );
                
                return (
                  <div key={finding.id} className="group flex flex-col transition-colors hover:bg-neutral-800/20">
                    <div 
                      className="p-5 flex items-center gap-4 cursor-pointer select-none"
                      onClick={() => setSelectedFindingId(isExpanded ? null : finding.id)}
                    >
                      <div className="flex-shrink-0">
                        {isExpanded ? <ChevronDown className="w-5 h-5 text-blue-400" /> : <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-blue-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-medium text-white truncate">{finding.description}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                            finding.category === 'major' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 
                            finding.category === 'minor' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' : 
                            'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                          }`}>{finding.category}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                            finding.status === 'closed' ? 'bg-green-500/10 text-green-400' : 'bg-neutral-800 text-neutral-300'
                          }`}>{finding.status}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> {finding.standard}</span>
                          <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {finding.context}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Due: {finding.dueDate || 'N/A'}</span>
                          <span className="text-neutral-600 font-mono">{String(finding.id).split('-')[0]}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-sm font-medium text-neutral-300">
                          {findingActions.length} CAPA{findingActions.length !== 1 ? 's' : ''}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {findingActions.filter(a => a.status === 'completed').length} completed
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-14 pb-5 pt-2 bg-neutral-900/30">
                        <div className="border border-neutral-800 rounded-lg bg-neutral-950 p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-blue-400" /> Corrective & Preventive Actions (CAPA)
                            </h4>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActionSourceFindingId(finding.id);
                                setIsAddActionOpen(true);
                              }}
                              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-medium transition-colors border border-neutral-700"
                            >
                              + Add Action
                            </button>
                          </div>
                          
                          {findingActions.length === 0 ? (
                            <div className="text-center py-6 text-sm text-neutral-500 border border-neutral-800 border-dashed rounded bg-neutral-900/50">
                              No corrective actions defined yet.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {findingActions.map(action => (
                                <div key={action.id} className="flex flex-col md:flex-row gap-4 p-3 bg-neutral-900 border border-neutral-800 rounded-md">
                                  <div className="flex-1">
                                    <p className="text-sm text-neutral-200 mb-2">{action.action}</p>
                                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                                      <span className="px-2 py-0.5 bg-neutral-800 rounded">Resp: <span className="text-neutral-300">{action.responsible}</span></span>
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due: {action.dueDate}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2 min-w-[140px]">
                                    <select 
                                      value={action.status}
                                      onChange={(e) => updateAction.mutate({ id: action.id, data: { status: e.target.value as CorrectiveAction["status"] } })}
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:border-blue-500 focus:outline-none"
                                    >
                                      <option value="pending">Status: Pending</option>
                                      <option value="in_progress">Status: In Progress</option>
                                      <option value="completed">Status: Completed</option>
                                    </select>
                                    <select 
                                      value={action.effectivenessStatus || 'pending'}
                                      onChange={(e) => updateAction.mutate({ id: action.id, data: { effectivenessStatus: e.target.value as NonNullable<CorrectiveAction["effectivenessStatus"]> } })}
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:border-blue-500 focus:outline-none"
                                    >
                                      <option value="pending">Effectiveness: Unverified</option>
                                      <option value="verified">Effectiveness: Verified</option>
                                      <option value="ineffective">Effectiveness: Ineffective</option>
                                    </select>
                                    <textarea
                                      defaultValue={action.evidence || ""}
                                      onBlur={(e) => {
                                        if (e.target.value !== (action.evidence || "")) {
                                          updateAction.mutate({ id: action.id, data: { evidence: e.target.value } });
                                        }
                                      }}
                                      placeholder="Bukti penyelesaian"
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                                      rows={2}
                                    />
                                    <textarea
                                      defaultValue={action.effectivenessCheck || ""}
                                      onBlur={(e) => {
                                        if (e.target.value !== (action.effectivenessCheck || "")) {
                                          updateAction.mutate({ id: action.id, data: { effectivenessCheck: e.target.value } });
                                        }
                                      }}
                                      placeholder="Catatan verifikasi efektivitas"
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-end gap-3">
                            {finding.status === 'open' ? (
                              <button 
                                 disabled={!canClose}
                                 title={canClose ? "Close finding" : "Complete all CAPAs with evidence and verified effectiveness first"}
                                onClick={() => updateFinding.mutate({ id: finding.id, data: { status: 'closed' } })}
                                 className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Mark Finding as Closed
                              </button>
                            ) : (
                              <button 
                                onClick={() => updateFinding.mutate({ id: finding.id, data: { status: 'open' } })}
                                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-sm font-medium transition-colors"
                              >
                                Reopen Finding
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isAddFindingOpen} onClose={() => setIsAddFindingOpen(false)} title="Log New Audit Finding">
        <form onSubmit={handleCreateFinding} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Finding Description</label>
            <textarea 
              name="description" required rows={3}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Describe the finding clearly..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Category</label>
              <select name="category" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="minor">Minor Non-conformity</option>
                <option value="major">Major Non-conformity</option>
                <option value="obs">Observation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Severity</label>
              <select name="severity" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Standard / Clause</label>
              <input 
                name="standard" type="text" required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. ISO 9001:2015 Cl 8.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Context / Location</label>
              <input 
                name="context" type="text" required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Site A - Phase 2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Target Due Date</label>
            <input 
              name="dueDate" type="date" required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button type="button" onClick={() => setIsAddFindingOpen(false)} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={createFinding.isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              {createFinding.isPending ? 'Logging...' : 'Log Finding'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isAddActionOpen} onClose={() => setIsAddActionOpen(false)} title="Create Corrective Action (CAPA)">
        <form onSubmit={handleCreateAction} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Action Description</label>
            <textarea 
              name="action" required rows={3}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Describe the corrective action steps..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Responsible Person/Role</label>
              <input 
                name="responsible" type="text" required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Project Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Target Due Date</label>
              <input 
                name="dueDate" type="date" required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button type="button" onClick={() => setIsAddActionOpen(false)} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={createAction.isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              {createAction.isPending ? 'Creating...' : 'Create Action'}
            </button>
          </div>
        </form>
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

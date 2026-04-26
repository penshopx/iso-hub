"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";

interface Task {
  id: number;
  code: string;
  title: string;
  agentType: string;
  status: string;
  input: string;
  output: string | null;
  error: string | null;
  executionTime: number | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
}

interface AgentStats {
  agentType: string;
  totalTasks: number;
  successTasks: number;
  failedTasks: number;
  avgExecutionTime: number;
  lastRunAt: string | null;
}

const AGENTS = [
  { id: "orchestrator", name: "Orchestrator", icon: "🤖", desc: "Auto-detect tugas" },
  { id: "iso", name: "ISO Agent", icon: "📋", desc: "Standar ISO" },
  { id: "legal", name: "Legal Agent", icon: "⚖️", desc: "Regulasi" },
  { id: "technical", name: "Technical Agent", icon: "🔧", desc: "Dokumen" },
  { id: "audit", name: "Audit Agent", icon: "📊", desc: "Audit" },
  { id: "training", name: "Training Agent", icon: "📚", desc: "Pelatihan" },
];

const QUICK_TASKS = [
  { label: "ISO 9001 Klausul", prompt: "Jelaskan ISO 9001 klausul 5.1 tentang Leadership" },
  { label: "Generate SOP", prompt: "Generate template SOP dokumen mutu" },
  { label: "Compliance Check", prompt: "Cek compliance ISO 45001 K3" },
  { label: "Audit Checklist", prompt: "Buat checklist audit internal ISO 9001" },
  { label: "Gap Analysis", prompt: "Lakukan gap analysis ISO 14001" },
  { label: "Quiz ISO", prompt: "Generate quiz ISO 9001 untuk 10 klausul" },
];

export default function OPCPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agentStats, setAgentStats] = useState<AgentStats[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("orchestrator");
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/opc/tasks?limit=20");
      const result = await response.json();
      if (result.success) {
        setTasks(result.data);
        if (result.stats?.byAgent) {
          setAgentStats(result.stats.byAgent);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 10000);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  const handleExecute = async () => {
    if (!taskInput.trim() || isRunning) return;

    setIsRunning(true);

    try {
      const response = await fetch("/api/v1/opc/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: taskInput,
          agentType: selectedAgent === "orchestrator" ? undefined : selectedAgent,
          priority: "normal",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTasks((prev) => [result.data, ...prev]);
        
        if (result.data.detectedAgent && selectedAgent === "orchestrator") {
          console.log(`Task routed to: ${result.data.detectedAgent}`);
        }
      } else {
        console.error("Task execution failed:", result.error);
      }
    } catch (error) {
      console.error("Error executing task:", error);
    } finally {
      setTaskInput("");
      setIsRunning(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">✓ Completed</span>;
      case "running":
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">◌ Running</span>;
      case "failed":
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">✗ Failed</span>;
      default:
        return <span className="px-2 py-1 bg-neutral-500/20 text-neutral-400 rounded text-xs">Pending</span>;
    }
  };

  const getAgentName = (agentType: string) => {
    const agent = AGENTS.find((a) => a.id === agentType);
    return agent ? `${agent.icon} ${agent.name}` : agentType;
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const successRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const avgTime = agentStats.length > 0 
    ? Math.round(agentStats.reduce((acc, s) => acc + (s.avgExecutionTime || 0), 0) / agentStats.length)
    : 0;

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
              <h1 className="text-xl font-semibold">OPC CLAW Console</h1>
              <p className="text-sm text-neutral-400">Orchestrated Process Control - Execution Engine</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* OPC CLAW Status */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">OPC CLAW Engine</h2>
              <p className="text-purple-200">Orchestrated Process Control - Connected Linked Automated Workers</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm">Online</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">{AGENTS.length}</div>
              <div className="text-xs text-purple-200">Active Agents</div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">{totalTasks}</div>
              <div className="text-xs text-purple-200">Total Tasks</div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">{successRate}%</div>
              <div className="text-xs text-purple-200">Success Rate</div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">{avgTime}s</div>
              <div className="text-xs text-purple-200">Avg Response</div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">
                {tasks.filter((t) => t.status === "running").length}
              </div>
              <div className="text-xs text-purple-200">Running</div>
            </div>
          </div>
        </div>

        {/* Agent Stats */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Agent Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {AGENTS.slice(1).map((agent) => {
              const stats = agentStats.find((s) => s.agentType === agent.id);
              return (
                <div key={agent.id} className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{agent.icon}</span>
                    <span className="font-medium">{agent.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {stats?.totalTasks || 0}
                  </div>
                  <div className="text-xs text-neutral-400">Tasks executed</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Input */}
        <div className="mb-8">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <select 
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              >
                {AGENTS.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.icon} {agent.name} - {agent.desc}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleExecute()}
                placeholder="Masukkan tugas untuk agent..."
                className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500"
              />
              <button 
                onClick={handleExecute}
                disabled={isRunning || !taskInput.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
              >
                {isRunning ? "⏳ Running..." : "▶️ Execute"}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-neutral-500">Quick tasks:</span>
              {QUICK_TASKS.map((qt) => (
                <button 
                  key={qt.label}
                  onClick={() => setTaskInput(qt.prompt)}
                  className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full text-xs transition-colors"
                >
                  {qt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Task History</h2>
            <button 
              onClick={fetchTasks}
              className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              No tasks yet. Try executing a task above!
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusBadge(task.status)}
                      <span className="font-medium">{getAgentName(task.agentType)}</span>
                      <span className="text-xs text-neutral-500 font-mono">{task.code}</span>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {task.executionTime ? `${task.executionTime}s` : ""} • {new Date(task.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-neutral-300 mb-2">{task.input}</p>
                  {task.output && (
                    <div className="p-3 bg-neutral-700/50 rounded-lg">
                      <p className="text-sm text-neutral-400 whitespace-pre-line">{task.output}</p>
                    </div>
                  )}
                  {task.error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-400">{task.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

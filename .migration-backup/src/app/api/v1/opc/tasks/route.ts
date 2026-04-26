import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { opcTasks, opcTaskSteps, opcAgentStats } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { SPECIALIST_AGENTS, ORCHESTRATOR_AGENT } from "@/lib/agents";
import { getAgentResponse } from "@/lib/agent-knowledge";

function detectAgentType(task: string): { primary: string; secondary: string[] } {
  const lowerTask = task.toLowerCase();
  
  const keywords: Record<string, string[]> = {
    iso: ["iso", "standar", "sertifikasi", "klausul", "9001", "14001", "45001", "mutu"],
    legal: ["legal", "hukum", "uu", "korupsi", "pancek", "compliance", "kepatuhan"],
    technical: ["dokumen", "sop", "template", "kebijakan", "generate", "buat"],
    audit: ["audit", "checklist", "finding", "temuan", "assessment"],
    training: ["training", "kursus", "quiz", "belajar", "pelatihan"],
    risk: ["risk", "risiko", "penilaian", "mitigasi", "matrix"],
    compliance: ["kepatuhan", "monitoring", "update", "dokumen", "kontrol"],
  };

  let bestMatch = "iso";
  let maxScore = 0;

  for (const [agent, words] of Object.entries(keywords)) {
    const score = words.filter(w => lowerTask.includes(w)).length;
    if (score > maxScore) {
      maxScore = score;
      bestMatch = agent;
    }
  }

  return { primary: bestMatch, secondary: [] };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const agentType = searchParams.get("agentType");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const [tasks, countResult, statsResult] = await Promise.all([
      db.select()
        .from(opcTasks)
        .orderBy(desc(opcTasks.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(opcTasks),
      db.select().from(opcAgentStats),
    ]);

    const total = countResult[0]?.count || 0;

    const stats = {
      totalTasks: total,
      byStatus: {
        pending: tasks.filter(t => t.status === "pending").length,
        running: tasks.filter(t => t.status === "running").length,
        completed: tasks.filter(t => t.status === "completed").length,
        failed: tasks.filter(t => t.status === "failed").length,
      },
      byAgent: statsResult,
    };

    return NextResponse.json({
      success: true,
      data: tasks,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
      agents: [ORCHESTRATOR_AGENT, ...SPECIALIST_AGENTS],
    });
  } catch (error) {
    console.error("Error fetching OPC tasks:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { task, agentType, priority } = body;

    if (!task || typeof task !== "string") {
      return NextResponse.json({ success: false, error: "Task is required" }, { status: 400 });
    }

    const startTime = Date.now();
    const detected = agentType && agentType !== "orchestrator" 
      ? { primary: agentType, secondary: [] as string[] }
      : detectAgentType(task);

    const code = `OPC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;

    const [newTask] = await db.insert(opcTasks).values({
      code,
      title: task.substring(0, 100),
      description: task,
      agentType: detected.primary,
      status: "running",
      priority: priority || "normal",
      input: task,
      startedAt: new Date(),
    }).returning();

    const primaryResponse = getAgentResponse(detected.primary as any, task);

    await db.insert(opcTaskSteps).values({
      taskId: newTask.id,
      stepOrder: 0,
      agentType: "orchestrator",
      title: "Task Decomposition",
      description: "Mengurai tugas menjadi sub-tugas",
      status: "completed",
      input: task,
      output: `✅ Task diurai ke specialist agents\n\n**Primary:** ${SPECIALIST_AGENTS.find(a => a.id === detected.primary)?.name}\n**Detected from keywords**`,
      completedAt: new Date(),
    });

    await db.insert(opcTaskSteps).values({
      taskId: newTask.id,
      stepOrder: 1,
      agentType: detected.primary,
      title: `${SPECIALIST_AGENTS.find(a => a.id === detected.primary)?.name} Execution`,
      description: `Menjalankan tugas dengan ${detected.primary} agent`,
      status: "completed",
      input: task,
      output: primaryResponse,
      completedAt: new Date(),
    });

    await db.insert(opcTaskSteps).values({
      taskId: newTask.id,
      stepOrder: 2,
      agentType: "orchestrator",
      title: "Result Aggregation",
      description: "Mengumpulkan hasil dari specialist agents",
      status: "completed",
      input: "",
      output: `📊 **Hasil Eksekusi Multi-Agent**

**Task:** ${task.substring(0, 50)}...

**Agent:** ${SPECIALIST_AGENTS.find(a => a.id === detected.primary)?.icon} ${SPECIALIST_AGENTS.find(a => a.id === detected.primary)?.name}

**Execution Time:** ${Math.round((Date.now() - startTime) / 1000)}s

**Hasil:**
${primaryResponse.substring(0, 800)}`,
      completedAt: new Date(),
    });

    const endTime = Date.now();
    const executionTime = Math.round((endTime - startTime) / 1000);

    await db.update(opcTasks)
      .set({
        status: "completed",
        output: primaryResponse,
        completedAt: new Date(),
        executionTime,
      })
      .where(eq(opcTasks.id, newTask.id));

    const [agentStats] = await db.select()
      .from(opcAgentStats)
      .where(eq(opcAgentStats.agentType, detected.primary))
      .limit(1);

    if (agentStats) {
      const currentTotal = agentStats.totalTasks || 0;
      const currentAvg = agentStats.avgExecutionTime || 0;
      await db.update(opcAgentStats)
        .set({
          totalTasks: currentTotal + 1,
          successTasks: (agentStats.successTasks || 0) + 1,
          avgExecutionTime: Math.round(((currentAvg * currentTotal) + executionTime) / (currentTotal + 1)),
          lastRunAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(opcAgentStats.id, agentStats.id));
    } else {
      await db.insert(opcAgentStats).values({
        agentType: detected.primary,
        totalTasks: 1,
        successTasks: 1,
        failedTasks: 0,
        avgExecutionTime: executionTime,
        lastRunAt: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: newTask.id,
        code: newTask.code,
        title: newTask.title,
        agentType: detected.primary,
        status: "completed",
        input: task,
        output: primaryResponse,
        executionTime,
        createdAt: newTask.createdAt,
      },
      message: `Task executed by ${SPECIALIST_AGENTS.find(a => a.id === detected.primary)?.name}`,
    }, { status: 201 });
  } catch (error) {
    console.error("Error executing OPC task:", error);
    return NextResponse.json({ success: false, error: "Failed to execute task" }, { status: 500 });
  }
}

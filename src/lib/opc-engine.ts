import { db } from "@/db";
import { opcTasks, opcTaskSteps, opcAgentStats } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { 
  SPECIALIST_AGENTS, 
  ORCHESTRATOR_AGENT, 
  detectAgents, 
  decomposeTask,
  type TaskStep,
  type AgentType,
  type MultiAgentTask
} from "@/lib/agents";
import { getAgentResponse, getAvailableActions } from "@/lib/agent-knowledge";

export type { AgentType } from "@/lib/agents";

function generateTaskCode(): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const day = String(new Date().getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `OPC-${year}${month}${day}-${random}`;
}

function calculateExecutionTime(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / 1000);
}

function generateTaskSummary(task: MultiAgentTask): string {
  const completedSteps = task.steps.filter(s => s.status === "completed");
  const results = completedSteps
    .filter(s => s.agentType !== "orchestrator" && s.output)
    .map(s => `**${SPECIALIST_AGENTS.find(a => a.id === s.agentType)?.name || s.agentType}:**\n${s.output}`)
    .join("\n\n---\n\n");

  return `📊 **Task Summary - ${task.title}**\n\n` +
    `**Status:** ${task.status}\n` +
    `**Execution Time:** ${task.executionTime || 0}s\n` +
    `**Steps Completed:** ${completedSteps.length}/${task.steps.length}\n\n` +
    `---\n\n` +
    `**Results:**\n\n${results || "No results available"}`;
}

export async function executeMultiAgentTask(
  input: string, 
  agentType?: AgentType,
  priority: "low" | "normal" | "high" | "critical" = "normal"
): Promise<MultiAgentTask> {
  const startTime = new Date();
  const code = generateTaskCode();
  
  const detected = agentType && agentType !== "orchestrator" 
    ? { primary: agentType, secondary: [] as AgentType[] }
    : detectAgents(input);

  const steps = decomposeTask(input, detected.primary, detected.secondary);
  
  const task: MultiAgentTask = {
    id: crypto.randomUUID(),
    code,
    title: input.substring(0, 100),
    description: input,
    originalInput: input,
    orchestratorAgent: "orchestrator",
    steps,
    status: "executing",
    priority,
    createdAt: startTime,
    startedAt: startTime,
  };

  try {
    await db.insert(opcTasks).values({
      code: task.code,
      title: task.title,
      description: task.description,
      agentType: "orchestrator",
      status: "running",
      priority: task.priority,
      input: task.originalInput,
    });

    const dbTask = await db.select().from(opcTasks).where(eq(opcTasks.code, task.code)).limit(1);
    task.id = dbTask[0]?.id?.toString() || task.id;

    for (const step of steps) {
      await db.insert(opcTaskSteps).values({
        taskId: parseInt(task.id),
        stepOrder: steps.indexOf(step),
        agentType: step.agentType,
        title: step.title,
        description: step.description,
        status: "pending",
        input: step.input,
      });
    }

    const finalResults: string[] = [];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const stepStart = new Date();

      if (step.agentType === "orchestrator") {
        if (step.title.includes("Decomposition")) {
          step.output = `✅ Task decomposed into ${steps.length - 2} specialist tasks\n\n` +
            `**Primary Agent:** ${SPECIALIST_AGENTS.find(a => a.id === detected.primary)?.name || detected.primary}\n` +
            `**Secondary Agents:** ${detected.secondary.map(a => SPECIALIST_AGENTS.find(ag => ag.id === a)?.name || a).join(", ") || "None"}\n\n` +
            `Detected keywords: ${input.split(" ").slice(0, 5).join(", ")}...`;
        } else {
          step.output = generateTaskSummary(task);
          task.status = "completed";
          task.result = step.output;
        }
        step.status = "completed";
      } else {
        step.output = getAgentResponse(step.agentType, input);
        step.status = "completed";
        finalResults.push(`**${SPECIALIST_AGENTS.find(a => a.id === step.agentType)?.name || step.agentType}:**\n${step.output}`);
      }

      step.executionTime = calculateExecutionTime(stepStart, new Date());
      step.status = step.status;

      const updateData: Record<string, unknown> = {
        status: step.status,
        output: step.output,
        startedAt: stepStart,
      };
      
      if (step.status === "completed") {
        updateData.completedAt = new Date();
        updateData.executionTime = step.executionTime;
      }

      await db.update(opcTaskSteps)
        .set(updateData)
        .where(eq(opcTaskSteps.id, i + 1));
    }

    const endTime = new Date();
    task.executionTime = calculateExecutionTime(startTime, endTime);
    task.completedAt = endTime;

    await db.update(opcTasks)
      .set({
        status: task.status,
        output: task.result,
        completedAt: endTime,
        executionTime: task.executionTime,
      })
      .where(eq(opcTasks.code, task.code));

    await updateAgentStats(detected.primary, task.executionTime, task.status === "completed");

    return task;
  } catch (error) {
    console.error("Error executing multi-agent task:", error);
    task.status = "failed";
    task.error = error instanceof Error ? error.message : "Unknown error";
    return task;
  }
}

async function updateAgentStats(agentType: AgentType, executionTime: number, success: boolean) {
  const [existingStats] = await db.select()
    .from(opcAgentStats)
    .where(eq(opcAgentStats.agentType, agentType))
    .limit(1);

  if (existingStats) {
    const currentTotal = existingStats.totalTasks || 0;
    const currentSuccess = existingStats.successTasks || 0;
    const currentAvg = existingStats.avgExecutionTime || 0;
    const newTotal = currentTotal + 1;
    const newSuccess = success ? currentSuccess + 1 : currentSuccess;
    const newAvg = ((currentAvg * currentTotal) + executionTime) / newTotal;

    await db.update(opcAgentStats)
      .set({
        totalTasks: newTotal,
        successTasks: newSuccess,
        failedTasks: success ? existingStats.failedTasks : (existingStats.failedTasks || 0) + 1,
        avgExecutionTime: Math.round(newAvg * 100) / 100,
        lastRunAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(opcAgentStats.id, existingStats.id));
  } else {
    await db.insert(opcAgentStats).values({
      agentType,
      totalTasks: 1,
      successTasks: success ? 1 : 0,
      failedTasks: success ? 0 : 1,
      avgExecutionTime: executionTime,
      lastRunAt: new Date(),
    });
  }
}

export async function getAgentStats() {
  const stats = await db.select().from(opcAgentStats);
  
  const allAgents = [ORCHESTRATOR_AGENT, ...SPECIALIST_AGENTS];
  
  return allAgents.map(agent => {
    const stat = stats.find(s => s.agentType === agent.id);
    return {
      ...agent,
      stats: stat ? {
        totalTasks: stat.totalTasks || 0,
        successTasks: stat.successTasks || 0,
        failedTasks: stat.failedTasks || 0,
        avgExecutionTime: stat.avgExecutionTime || 0,
        lastRunAt: stat.lastRunAt,
      } : null,
    };
  });
}

export async function getTaskHistory(limit: number = 20) {
  const tasks = await db.select()
    .from(opcTasks)
    .orderBy(sql`${opcTasks.createdAt} DESC`)
    .limit(limit);

  return tasks;
}

export { SPECIALIST_AGENTS, ORCHESTRATOR_AGENT, detectAgents, getAgentResponse, getAvailableActions };

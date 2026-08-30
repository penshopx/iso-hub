import { Router, type Request, type Response } from "express";
import { boundedRiskScore, classifyRisk, normalizeRiskStatus } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { risks, vendors, opcTasks, facilitators, services, bookings, knowledgeArticles } from "@workspace/db";
import { desc, sql, eq, like, or, and } from "drizzle-orm";

const router = Router();

function getAuthenticatedUserId(
  req: Request,
  res: Response,
): string | null {
  if (!req.isAuthenticated()) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return null;
  }
  return req.user.id;
}

// Dashboard stats
router.get("/v1/dashboard", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const [facCount] = await db.select({ count: sql<number>`count(*)` }).from(facilitators);
    const [artCount] = await db.select({ count: sql<number>`count(*)` }).from(knowledgeArticles);
    const [svcCount] = await db.select({ count: sql<number>`count(*)` }).from(services);
    const [bkgCount] = await db.select({ count: sql<number>`count(*)` }).from(bookings);
    const [riskCount] = await db.select({ count: sql<number>`count(*)` }).from(risks).where(eq(risks.userId, userId));
    const [vendorCount] = await db.select({ count: sql<number>`count(*)` }).from(vendors).where(eq(vendors.userId, userId));

    res.json({
      stats: {
        facilitators: Number(facCount?.count || 0),
        articles: Number(artCount?.count || 6),
        services: Number(svcCount?.count || 0),
        bookings: Number(bkgCount?.count || 0),
        risks: Number(riskCount?.count || 0),
        vendors: Number(vendorCount?.count || 0),
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard" });
  }
});

// Risks
router.get("/v1/risks", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const data = await db.select().from(risks).where(eq(risks.userId, userId)).orderBy(desc(risks.createdAt)).limit(limit).offset(offset);
    const [total] = await db.select({ count: sql<number>`count(*)` }).from(risks).where(eq(risks.userId, userId));
    res.json({ success: true, data, total: Number(total?.count || 0), page, limit });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch risks" });
  }
});

router.post("/v1/risks", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const body = req.body;
    const probability = boundedRiskScore(body.probability);
    const impact = boundedRiskScore(body.impact);
    const riskLevel = classifyRisk(probability, impact);
    const residualProbability = boundedRiskScore(body.residualProbability, probability);
    const residualImpact = boundedRiskScore(body.residualImpact, impact);
    const residualRiskLevel = classifyRisk(residualProbability, residualImpact);

    const [risk] = await db.insert(risks).values({
      userId,
      code: body.code || `R-${Date.now().toString(36).toUpperCase()}`,
      name: body.name,
      description: body.description,
      context: body.context,
      standard: body.standard,
      category: body.category,
      probability,
      impact,
      riskLevel,
      controls: body.controls,
      owner: body.owner,
      status: normalizeRiskStatus(body.status),
      mitigation: body.mitigation,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      residualProbability,
      residualImpact,
      residualRiskLevel,
    }).returning();
    res.status(201).json({ success: true, data: risk });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create risk" });
  }
});

router.get("/v1/risks/:id", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const [risk] = await db.select().from(risks).where(and(
      eq(risks.id, Number(req.params.id)),
      eq(risks.userId, userId),
    ));
    if (!risk) {
      res.status(404).json({ success: false, error: "Risk not found" });
      return;
    }
    res.json({ success: true, data: risk });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch risk" });
  }
});

router.patch("/v1/risks/:id", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;
    const id = Number(req.params.id);
    const [current] = await db.select().from(risks).where(and(eq(risks.id, id), eq(risks.userId, userId)));
    if (!current) {
      res.status(404).json({ success: false, error: "Risk not found" });
      return;
    }
    const probability = boundedRiskScore(req.body.probability, current.probability || 1);
    const impact = boundedRiskScore(req.body.impact, current.impact || 1);
    const calculatedLevel = classifyRisk(probability, impact);
    const residualProbability = boundedRiskScore(req.body.residualProbability, current.residualProbability || probability);
    const residualImpact = boundedRiskScore(req.body.residualImpact, current.residualImpact || impact);
    const residualRiskLevel = classifyRisk(residualProbability, residualImpact);
    const [risk] = await db.update(risks).set({
      ...(req.body.name !== undefined ? { name: req.body.name } : {}),
      ...(req.body.description !== undefined ? { description: req.body.description } : {}),
      ...(req.body.context !== undefined ? { context: req.body.context } : {}),
      ...(req.body.standard !== undefined ? { standard: req.body.standard } : {}),
      ...(req.body.category !== undefined ? { category: req.body.category } : {}),
      probability,
      impact,
      riskLevel: calculatedLevel,
      ...(req.body.controls !== undefined ? { controls: req.body.controls } : {}),
      ...(req.body.owner !== undefined ? { owner: req.body.owner } : {}),
      ...(req.body.status !== undefined ? { status: normalizeRiskStatus(req.body.status, normalizeRiskStatus(current.status)) } : {}),
      ...(req.body.mitigation !== undefined ? { mitigation: req.body.mitigation } : {}),
      ...(req.body.dueDate !== undefined ? { dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null } : {}),
      residualProbability,
      residualImpact,
      residualRiskLevel,
      updatedAt: new Date(),
    }).where(and(eq(risks.id, id), eq(risks.userId, userId))).returning();
    res.json({ success: true, data: risk });
  } catch (error) {
    req.log.error({ error }, "Failed to update risk");
    res.status(500).json({ success: false, error: "Failed to update risk" });
  }
});

// Vendors
router.get("/v1/vendors", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const data = await db.select().from(vendors).where(eq(vendors.userId, userId)).orderBy(desc(vendors.createdAt)).limit(limit).offset(offset);
    const [total] = await db.select({ count: sql<number>`count(*)` }).from(vendors).where(eq(vendors.userId, userId));
    res.json({ success: true, data, total: Number(total?.count || 0), page, limit });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch vendors" });
  }
});

router.post("/v1/vendors", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const body = req.body;
    const [vendor] = await db.insert(vendors).values({
      userId,
      name: body.name,
      category: body.category,
      contactPerson: body.contactPerson,
      email: body.email,
      phone: body.phone,
      status: body.status || "active",
    }).returning();
    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create vendor" });
  }
});

// OPC Tasks
router.get("/v1/opc/tasks", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const data = await db.select().from(opcTasks).orderBy(desc(opcTasks.createdAt)).limit(limit);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch tasks" });
  }
});

router.post("/v1/opc/tasks", async (req, res) => {
  try {
    const body = req.body;
    const code = `OPC-${Date.now()}`;
    const agentType = body.agentType || "orchestrator";

    const [task] = await db.insert(opcTasks).values({
      code,
      title: body.task || body.title,
      agentType,
      status: "pending",
      priority: body.priority || "normal",
      input: body.task || body.input,
    }).returning();

    // Simulate task processing (set to completed with mock output)
    setTimeout(async () => {
      try {
        await db.update(opcTasks)
          .set({
            status: "completed",
            output: JSON.stringify({ message: `Task processed by ${agentType} agent. This is a simulated response for: "${task.title}"` }),
            completedAt: new Date(),
          })
          .where(eq(opcTasks.id, task.id));
      } catch {}
    }, 2000);

    res.status(201).json({ success: true, data: task, detectedAgent: agentType });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create task" });
  }
});

router.get("/v1/opc/tasks/:id", async (req, res) => {
  try {
    const [task] = await db.select().from(opcTasks).where(eq(opcTasks.id, Number(req.params.id)));
    if (!task) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch task" });
  }
});

// Chat (simple ISO knowledge bot)
router.post("/v1/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMsg = (message || "").toLowerCase();

    let reply = "Halo! Saya adalah ISO Hub AI Assistant. Silakan tanyakan tentang standar ISO, implementasi, atau sertifikasi.";

    if (lowerMsg.includes("iso 9001") || lowerMsg.includes("mutu")) {
      reply = "ISO 9001:2015 adalah standar internasional untuk Sistem Manajemen Mutu (QMS). Prinsip utama meliputi fokus pelanggan, kepemimpinan, keterlibatan people, pendekatan proses, perbaikan berkelanjutan, dan pengambilan keputusan berbasis bukti.";
    } else if (lowerMsg.includes("iso 14001") || lowerMsg.includes("lingkungan")) {
      reply = "ISO 14001:2015 adalah standar Sistem Manajemen Lingkungan (EMS). Membantu organisasi mengidentifikasi aspek lingkungan, memenuhi compliance, dan meningkatkan kinerja lingkungan secara berkelanjutan.";
    } else if (lowerMsg.includes("iso 45001") || lowerMsg.includes("k3") || lowerMsg.includes("keselamatan")) {
      reply = "ISO 45001:2018 adalah standar Sistem Manajemen Keselamatan dan Kesehatan Kerja (K3). Menggantikan OHSAS 18001 dan memberikan kerangka kerja untuk mengelola risiko K3.";
    } else if (lowerMsg.includes("halo") || lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
      reply = "Halo! Selamat datang di ISO Hub AI Assistant. Saya siap membantu Anda dengan informasi tentang standar ISO, implementasi, audit, dan sertifikasi. Apa yang ingin Anda ketahui?";
    }

    const actions = lowerMsg.includes("sertifikasi") ? ["Info ISO", "Panduan", "Booking"] : ["Info ISO", "Buat Dokumen", "Panduan", "Booking"];
    res.json({ success: true, data: { response: reply, actions, intent: "general", taskData: null } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to process chat" });
  }
});

// Agents
router.get("/v1/agents", async (req, res) => {
  res.json({
    success: true,
    agents: [
      { id: "orchestrator", name: "Orchestrator", status: "active", tasks: 0 },
      { id: "iso", name: "ISO Agent", status: "active", tasks: 0 },
      { id: "legal", name: "Legal Agent", status: "active", tasks: 0 },
      { id: "technical", name: "Technical Agent", status: "active", tasks: 0 },
      { id: "audit", name: "Audit Agent", status: "active", tasks: 0 },
      { id: "training", name: "Training Agent", status: "active", tasks: 0 },
    ]
  });
});

// Search
router.get("/v1/search", async (req, res) => {
  const q = String(req.query.q || "");
  try {
    const userId = getAuthenticatedUserId(req, res);
    if (!userId) return;

    const riskResults = q ? await db.select().from(risks).where(and(
      eq(risks.userId, userId),
      like(risks.name, `%${q}%`),
    )).limit(5) : [];
    const vendorResults = q ? await db.select().from(vendors).where(and(
      eq(vendors.userId, userId),
      like(vendors.name, `%${q}%`),
    )).limit(5) : [];
    res.json({ success: true, risks: riskResults, vendors: vendorResults });
  } catch (error) {
    res.status(500).json({ success: false, error: "Search failed" });
  }
});

// KPI
router.get("/v1/kpi", async (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "Customer Satisfaction", target: 85, actual: 87, unit: "%", status: "Above" },
      { id: 2, name: "On-time Delivery", target: 98, actual: 96.5, unit: "%", status: "Below" },
      { id: 3, name: "Defect Rate", target: 0.5, actual: 0.3, unit: "%", status: "Above" },
      { id: 4, name: "Audit Completion", target: 100, actual: 92, unit: "%", status: "Below" },
    ]
  });
});

// Export
router.get("/v1/export", async (req, res) => {
  res.json({ success: true, message: "Export feature available" });
});

// Audit
router.get("/v1/audit", async (req, res) => {
  try {
    const data = await db.select().from(opcTasks).orderBy(desc(opcTasks.createdAt)).limit(20);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch audit log" });
  }
});

export default router;

import { Router } from "express";
import { db } from "@workspace/db";
import { isoDocuments, hazards, incidents } from "@workspace/db";

const router = Router();

router.get("/iso/documents", async (req, res) => {
  try {
    const docs = await db.select().from(isoDocuments).limit(50);
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

router.post("/iso/documents", async (req, res) => {
  try {
    const body = req.body;
    const [doc] = await db.insert(isoDocuments).values({
      title: body.title,
      type: body.type,
      category: body.category,
      content: body.content,
      status: body.status || "draft",
    }).returning();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: "Failed to create document" });
  }
});

router.get("/iso/hazards", async (req, res) => {
  try {
    const data = await db.select().from(hazards).limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hazards" });
  }
});

router.post("/iso/hazards", async (req, res) => {
  try {
    const body = req.body;
    const [hazard] = await db.insert(hazards).values({
      name: body.name,
      description: body.description,
      riskLevel: body.riskLevel || "medium",
      mitigation: body.mitigation,
    }).returning();
    res.status(201).json(hazard);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hazard" });
  }
});

router.get("/iso/incidents", async (req, res) => {
  try {
    const data = await db.select().from(incidents).limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
});

router.post("/iso/incidents", async (req, res) => {
  try {
    const body = req.body;
    const [incident] = await db.insert(incidents).values({
      title: body.title,
      description: body.description,
      severity: body.severity || "minor",
      location: body.location,
      status: body.status || "open",
    }).returning();
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: "Failed to create incident" });
  }
});

export default router;

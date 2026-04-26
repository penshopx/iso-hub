import { Router } from "express";
import { db } from "@workspace/db";
import { trainingPrograms } from "@workspace/db";

const router = Router();

router.get("/training", async (req, res) => {
  try {
    const data = await db.select().from(trainingPrograms);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch training programs" });
  }
});

router.post("/training", async (req, res) => {
  try {
    const body = req.body;
    const [program] = await db.insert(trainingPrograms).values({
      name: body.name,
      description: body.description,
      type: body.type,
      location: body.location,
      status: body.status || "scheduled",
    }).returning();
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: "Failed to create training program" });
  }
});

export default router;

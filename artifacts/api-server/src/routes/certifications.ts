import { Router } from "express";
import { db } from "@workspace/db";
import { certifications } from "@workspace/db";

const router = Router();

router.get("/certifications", async (req, res) => {
  try {
    const data = await db.select().from(certifications);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
});

router.post("/certifications", async (req, res) => {
  try {
    const body = req.body;
    const [cert] = await db.insert(certifications).values({
      standard: body.standard,
      certificationBody: body.certificationBody,
      certificateNumber: body.certificateNumber,
      status: body.status || "active",
    }).returning();
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ error: "Failed to create certification" });
  }
});

export default router;

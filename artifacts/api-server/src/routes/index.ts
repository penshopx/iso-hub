import { Router, type IRouter } from "express";
import healthRouter from "./health";
import isoRouter from "./iso";
import auditsRouter from "./audits";
import certificationsRouter from "./certifications";
import trainingRouter from "./training";
import v1Router from "./v1";
import authRouter from "./auth";
import qmsRouter from "./qms";
import projectsRouter from "./projects";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(isoRouter);
router.use(auditsRouter);
router.use(certificationsRouter);
router.use(trainingRouter);
router.use(v1Router);
router.use(qmsRouter);
router.use(projectsRouter);

export default router;

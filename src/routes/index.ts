import { Router } from "express";

import { alternativesRoutes } from "./alternatives.routes";
import { questionsRoutes } from "./questions.routes";

const router = Router();

router.use("/questions", questionsRoutes);
router.use("/alternatives", alternativesRoutes);

export { router };

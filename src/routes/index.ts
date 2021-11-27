import { Router } from "express";

import { questionsRoutes } from "./questions.routes";

const router = Router();

router.use("/questions", questionsRoutes);

export { router };

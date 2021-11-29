import { Router } from "express";

import { createAlternativeController } from "../modules/quizzes/useCases/createAlternative";

const alternativesRoutes = Router();

alternativesRoutes.post("/", (request, response) => {
  return createAlternativeController.handle(request, response);
});

export { alternativesRoutes };

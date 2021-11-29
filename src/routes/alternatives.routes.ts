import { Router } from "express";

import { createAlternativeController } from "../modules/quizzes/useCases/createAlternative";
import { listAlternativesController } from "../modules/quizzes/useCases/listAlternatives";
import { updateAlternativeController } from "../modules/quizzes/useCases/updateAlternative";

const alternativesRoutes = Router();

alternativesRoutes.post("/", (request, response) => {
  return createAlternativeController.handle(request, response);
});

alternativesRoutes.get("/", (request, response) => {
  return listAlternativesController.handle(request, response);
});

alternativesRoutes.patch("/:id", (request, response) => {
  return updateAlternativeController.handle(request, response);
});

export { alternativesRoutes };

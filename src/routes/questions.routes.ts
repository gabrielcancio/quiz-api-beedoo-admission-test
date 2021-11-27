import { Router } from "express";

import { createQuestionController } from "../modules/quizzes/useCases/createQuestion";

const questionsRoutes = Router();

questionsRoutes.post("/", (request, response) => {
  return createQuestionController.handle(request, response);
});

export { questionsRoutes };

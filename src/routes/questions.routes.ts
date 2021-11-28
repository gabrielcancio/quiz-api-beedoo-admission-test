import { Router } from "express";

import { createQuestionController } from "../modules/quizzes/useCases/createQuestion";
import { listQuestionController } from "../modules/quizzes/useCases/listQuestions";

const questionsRoutes = Router();

questionsRoutes.post("/", (request, response) => {
  return createQuestionController.handle(request, response);
});

questionsRoutes.get("/", (request, response) => {
  return listQuestionController.handle(request, response);
});

export { questionsRoutes };

import { Router } from "express";

import { createQuestionController } from "../modules/quizzes/useCases/createQuestion";
import { listQuestionController } from "../modules/quizzes/useCases/listQuestions";
import { updateQuestionController } from "../modules/quizzes/useCases/updateQuestion";

const questionsRoutes = Router();

questionsRoutes.post("/", (request, response) => {
  return createQuestionController.handle(request, response);
});

questionsRoutes.get("/", (request, response) => {
  return listQuestionController.handle(request, response);
});

questionsRoutes.patch("/:id", (request, response) => {
  return updateQuestionController.handle(request, response);
});

export { questionsRoutes };

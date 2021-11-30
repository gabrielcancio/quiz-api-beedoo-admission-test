import { Router } from "express";

import { createQuestionController } from "../modules/quizzes/useCases/createQuestion";
import { deleteQuestionController } from "../modules/quizzes/useCases/deleteQuestion";
import { listAlternativesOfSpecificQuestionController } from "../modules/quizzes/useCases/listAlternativesOfSpecificQuestion";
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

questionsRoutes.delete("/:id", (request, response) => {
  return deleteQuestionController.handle(request, response);
});

questionsRoutes.get("/:id/alternatives", (request, response) => {
  return listAlternativesOfSpecificQuestionController.handle(request, response);
});

export { questionsRoutes };

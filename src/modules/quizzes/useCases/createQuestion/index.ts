import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";
import { CreateQuestionController } from "./CreateQuestionController";
import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

const questionsRepository = new KnexMysqlQuestionsRepository();
const createQuestionUseCase = new CreateQuestionUseCase(questionsRepository);
const createQuestionController = new CreateQuestionController(
  createQuestionUseCase
);

export { createQuestionController };

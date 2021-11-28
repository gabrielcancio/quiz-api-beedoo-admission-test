import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";
import { UpdateQuestionController } from "./UpdateQuestionController";
import { UpdateQuestionUseCase } from "./UpdateQuestionUseCase";

const questionsRepository = new KnexMysqlQuestionsRepository();
const updateQuestionUseCase = new UpdateQuestionUseCase(questionsRepository);
const updateQuestionController = new UpdateQuestionController(
  updateQuestionUseCase
);

export { updateQuestionController };

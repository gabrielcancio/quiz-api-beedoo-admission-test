import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";
import { DeleteQuestionController } from "./DeleteQuestionController";
import { DeleteQuestionUseCase } from "./DeleteQuestionUseCase";

const questionsRepository = new KnexMysqlQuestionsRepository();
const deleteQuestionUseCase = new DeleteQuestionUseCase(questionsRepository);
const deleteQuestionController = new DeleteQuestionController(
  deleteQuestionUseCase
);

export { deleteQuestionController };

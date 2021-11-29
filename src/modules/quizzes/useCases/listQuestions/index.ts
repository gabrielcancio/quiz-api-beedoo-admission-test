import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";
import { ListQuestionsController } from "./ListQuestionsController";
import { ListQuestionsUseCase } from "./ListQuestionsUseCase";

const questionsRepository = new KnexMysqlQuestionsRepository();
const listQuestionUseCase = new ListQuestionsUseCase(questionsRepository);
const listQuestionController = new ListQuestionsController(listQuestionUseCase);

export { listQuestionController };

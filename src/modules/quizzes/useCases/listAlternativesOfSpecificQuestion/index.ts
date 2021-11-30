import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";
import { ListAlternativesOfSpecificQuestionController } from "./ListAlternativesOfSpecificQuestionController";
import { ListAlternativesOfSpecificQuestionUseCase } from "./ListAlternativesOfSpecificQuestionUseCase";

const alternativesRepository = new KnexMysqlAlternativesRepository();
const questionsRepository = new KnexMysqlQuestionsRepository();

const listAlternativesOfSpecificQuestionUseCase =
  new ListAlternativesOfSpecificQuestionUseCase(
    alternativesRepository,
    questionsRepository
  );

const listAlternativesOfSpecificQuestionController =
  new ListAlternativesOfSpecificQuestionController(
    listAlternativesOfSpecificQuestionUseCase
  );

export { listAlternativesOfSpecificQuestionController };

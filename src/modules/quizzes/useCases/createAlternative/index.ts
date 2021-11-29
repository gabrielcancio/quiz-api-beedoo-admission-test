import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";
import { CreateAlternativeController } from "./CreateAlternativeController";
import { CreateAlternativeUseCase } from "./CreateAlternativeUseCase";

const questionsRepository = new KnexMysqlQuestionsRepository();
const alternativesRepository = new KnexMysqlAlternativesRepository();
const createAlternativeUseCase = new CreateAlternativeUseCase(
  alternativesRepository,
  questionsRepository
);
const createAlternativeController = new CreateAlternativeController(
  createAlternativeUseCase
);

export { createAlternativeController };

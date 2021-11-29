import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { ListAlternativesController } from "./ListAlternativesController";
import { ListAlternativesUseCase } from "./ListAlternativesUseCase";

const alternativesRepository = new KnexMysqlAlternativesRepository();
const listAlternativesUseCase = new ListAlternativesUseCase(
  alternativesRepository
);
const listAlternativesController = new ListAlternativesController(
  listAlternativesUseCase
);

export { listAlternativesController };

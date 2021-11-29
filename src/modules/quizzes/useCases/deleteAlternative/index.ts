import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { DeleteAlternativeController } from "./DeleteAlternativeController";
import { DeleteAlternativeUseCase } from "./DeleteAlternativeUseCase";

const alternativesRepository = new KnexMysqlAlternativesRepository();
const deleteAlternativeUseCase = new DeleteAlternativeUseCase(
  alternativesRepository
);
const deleteAlternativeController = new DeleteAlternativeController(
  deleteAlternativeUseCase
);

export { deleteAlternativeController };

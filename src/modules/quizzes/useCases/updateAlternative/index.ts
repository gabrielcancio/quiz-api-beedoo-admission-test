import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { UpdateAlternativeController } from "./UpdateAlternativeController";
import { UpdateAlternativeUseCase } from "./UpdateAlternativeUseCase";

const alternativesRepository = new KnexMysqlAlternativesRepository();
const updateAlternativeUseCase = new UpdateAlternativeUseCase(
  alternativesRepository
);
const updateAlternativeController = new UpdateAlternativeController(
  updateAlternativeUseCase
);

export { updateAlternativeController };

import { AppError } from "../../../../errors/AppError";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";

interface IRequest {
  id: string;
}

class DeleteAlternativeUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories
  ) {}

  public async execute({ id }: IRequest) {}
}

export { DeleteAlternativeUseCase };

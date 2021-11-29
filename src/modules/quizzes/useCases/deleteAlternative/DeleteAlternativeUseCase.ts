import { AppError } from "../../../../errors/AppError";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";

interface IRequest {
  id: string;
}

class DeleteAlternativeUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories
  ) {}

  public async execute({ id }: IRequest) {
    const alternativeAlreadyExists = await this.alternativesRepository.findOne({
      id,
    });

    if (!alternativeAlreadyExists) {
      throw new AppError("Alternative must be valid!");
    }

    await this.alternativesRepository.delete({ id });
  }
}

export { DeleteAlternativeUseCase };

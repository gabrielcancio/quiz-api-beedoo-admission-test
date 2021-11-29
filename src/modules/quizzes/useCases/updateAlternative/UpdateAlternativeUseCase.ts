import { AppError } from "../../../../errors/AppError";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";

interface IRequest {
  id: string;
  content: string;
}

class UpdateAlternativeUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories
  ) {}

  public async execute({ id, content }: IRequest) {
    const alternativeAlreadyExists = await this.alternativesRepository.findOne({
      id,
    });

    if (!alternativeAlreadyExists) {
      throw new AppError("Alternative must be valid!");
    }

    if (this.isContentInvalid(content)) {
      throw new AppError("Content must be valid!");
    }

    const alternative = await this.alternativesRepository.update({
      id,
      content,
    });

    return alternative;
  }

  private isContentInvalid(content: string) {
    return content === "" || !content;
  }
}

export { UpdateAlternativeUseCase };

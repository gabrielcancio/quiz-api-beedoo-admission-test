import { Alternative } from "../../models/Alternative";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";

interface IRequest {
  id: string;
  content: string;
}

class UpdateAlternativeUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories
  ) {}

  public async execute({ id, content }: IRequest): Promise<Alternative> {
    return {} as Alternative;
  }
}

export { UpdateAlternativeUseCase };

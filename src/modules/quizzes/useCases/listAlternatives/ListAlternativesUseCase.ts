import { Alternative } from "../../models/Alternative";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";

class ListAlternativesUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories
  ) {}

  public async execute(): Promise<Alternative[]> {
    const alternatives = await this.alternativesRepository.listAll();

    return alternatives;
  }
}

export { ListAlternativesUseCase };

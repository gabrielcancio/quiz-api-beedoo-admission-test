import { Alternative } from "../../models/Alternative";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";

class ListAlternativesUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories
  ) {}

  public async execute(): Promise<Alternative[]> {
    return [];
  }
}

export { ListAlternativesUseCase };

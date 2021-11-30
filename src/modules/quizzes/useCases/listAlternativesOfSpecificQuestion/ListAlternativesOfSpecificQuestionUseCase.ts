import { AppError } from "../../../../errors/AppError";
import { Alternative } from "../../models/Alternative";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

interface IRequest {
  questionId: string;
}

class ListAlternativesOfSpecificQuestionUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories,
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ questionId }: IRequest): Promise<Alternative[]> {
    const questionAlreadyExists = await this.questionsRepository.findOne({
      id: questionId,
    });

    if (!questionAlreadyExists) {
      throw new AppError("Question must be valid!");
    }

    const alternatives = await this.alternativesRepository.list({ questionId });

    return alternatives;
  }
}

export { ListAlternativesOfSpecificQuestionUseCase };

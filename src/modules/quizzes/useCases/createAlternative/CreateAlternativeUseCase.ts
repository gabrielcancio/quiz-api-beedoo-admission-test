import { AppError } from "../../../../errors/AppError";
import { Question } from "../../models/Question";
import { IAlternativesRepositories } from "../../repositories/interfaces/IAlternativesRepository";
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

interface IRequest {
  questionId: string;
  content: string;
}

class CreateAlternativeUseCase {
  public constructor(
    private alternativesRepository: IAlternativesRepositories,
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ content, questionId }: IRequest) {
    const questionAlreadyExistis = await this.questionsRepository.findOne({
      id: questionId,
    });

    const alternativeAlreadyExists = await this.alternativesRepository.findOne({
      content,
    });

    if (this.isQuestionInvalid(questionAlreadyExistis)) {
      throw new AppError("Question id must be valid!");
    }

    if (this.isContentInvalid(content)) {
      throw new AppError("Content must be valid!");
    }

    if (alternativeAlreadyExists) {
      throw new AppError("Alternative already exists!");
    }

    const alternative = await this.alternativesRepository.create({
      questionId,
      content,
    });

    return alternative;
  }

  private isQuestionInvalid(question: Question) {
    return !question;
  }

  private isContentInvalid(content: string) {
    return content === "" || !content;
  }
}

export { CreateAlternativeUseCase };

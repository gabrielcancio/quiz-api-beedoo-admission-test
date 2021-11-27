import { AppError } from "../../../../errors/AppError";
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

interface IRequest {
  content: string;
}

class CreateQuestionUseCase {
  public constructor(private questionRepository: IQuestionsRepository) {}

  public async execute({ content }: IRequest) {
    const questionAlreadyExistis = await this.questionRepository.findOne({
      content,
    });

    if (this.isContentInvalid(content)) {
      throw new AppError("Content must be valid!");
    }

    if (questionAlreadyExistis) {
      throw new AppError("Question already exists!");
    }

    const newQuestion = await this.questionRepository.create({ content });

    return newQuestion;
  }

  private isContentInvalid(content: string) {
    return content === "" || !content;
  }
}

export { CreateQuestionUseCase };

import { AppError } from "../../../../errors/AppError";
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

interface IRequest {
  id: string;
  content: string;
}

class UpdateQuestionUseCase {
  public constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({ id, content }: IRequest) {
    const questionAlreadyExists = await this.questionsRepository.findOne({
      id,
    });

    if (!questionAlreadyExists) {
      throw new AppError("Question must be valid!");
    }

    if (this.isContentInvalid(content)) {
      throw new AppError("Content must be valid!");
    }

    const question = await this.questionsRepository.update({ id, content });

    return question;
  }

  private isContentInvalid(content: string) {
    return content === "" || !content;
  }
}

export { UpdateQuestionUseCase };

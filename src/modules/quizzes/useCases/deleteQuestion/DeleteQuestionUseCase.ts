import { AppError } from "../../../../errors/AppError";
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

interface IRequest {
  id: string;
}

class DeleteQuestionUseCase {
  public constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute({ id }: IRequest) {
    const questionAlreadyExists = await this.questionsRepository.findOne({
      id,
    });

    if (!questionAlreadyExists) {
      throw new AppError("Question must be valid!");
    }

    await this.questionsRepository.delete({ id });
  }
}

export { DeleteQuestionUseCase };

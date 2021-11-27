import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

class CreateQuestionUseCase {
  public constructor(private questionRepository: IQuestionsRepository) {}

  public async execute() {}
}

export { CreateQuestionUseCase };

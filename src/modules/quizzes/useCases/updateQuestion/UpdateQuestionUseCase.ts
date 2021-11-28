import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

class UpdateQuestionUseCase {
  public constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute() {}
}

export { UpdateQuestionUseCase };

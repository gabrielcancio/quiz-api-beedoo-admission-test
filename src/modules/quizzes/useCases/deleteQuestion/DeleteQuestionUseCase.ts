import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

class DeleteQuestionUseCase {
  public constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute() {}
}

export { DeleteQuestionUseCase };

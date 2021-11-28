import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionsRepository";

class ListQuestionsUseCase {
  public constructor(private questionsRepository: IQuestionsRepository) {}

  public async execute() {
    const questions = await this.questionsRepository.listAll();

    return questions;
  }
}

export { ListQuestionsUseCase };

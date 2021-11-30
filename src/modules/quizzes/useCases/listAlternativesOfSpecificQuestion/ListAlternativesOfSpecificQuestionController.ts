import { Request, Response } from "express";

import { ListAlternativesOfSpecificQuestionUseCase } from "./ListAlternativesOfSpecificQuestionUseCase";

class ListAlternativesOfSpecificQuestionController {
  public constructor(
    private listAlternativesOfSpecificQuestionUseCase: ListAlternativesOfSpecificQuestionUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { id: questionId } = request.params;

    const questions =
      await this.listAlternativesOfSpecificQuestionUseCase.execute({
        questionId,
      });

    return response.json(questions);
  }
}

export { ListAlternativesOfSpecificQuestionController };

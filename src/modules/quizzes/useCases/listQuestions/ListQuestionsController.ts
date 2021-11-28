import { Request, Response } from "express";

import { ListQuestionsUseCase } from "./ListQuestionsUseCase";

class ListQuestionsController {
  public constructor(private listQuestionsUseCase: ListQuestionsUseCase) {}

  public async handle(request: Request, response: Response) {
    const questions = await this.listQuestionsUseCase.execute();
    
    return response.json(questions);
  }
}

export { ListQuestionsController };
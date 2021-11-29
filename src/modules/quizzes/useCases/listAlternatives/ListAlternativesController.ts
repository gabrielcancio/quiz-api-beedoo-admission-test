import { Request, Response } from "express";

import { ListAlternativesUseCase } from "./ListAlternativesUseCase";

class ListAlternativesController {
  public constructor(private listAlternatives: ListAlternativesUseCase) {}

  public async handle(request: Request, response: Response) {
    const questions = await this.listAlternatives.execute();

    return response.json(questions);
  }
}

export { ListAlternativesController };

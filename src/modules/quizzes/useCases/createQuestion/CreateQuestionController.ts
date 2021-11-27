import { Request, Response } from "express";

import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

class CreateQuestionController {
  public constructor(private createQuestionUseCase: CreateQuestionUseCase) {}

  public async handle(request: Request, response: Response) {
    const { content } = request.body;

    const question = await this.createQuestionUseCase.execute({ content });

    return response.status(201).json(question);
  }
}

export { CreateQuestionController };

import { Request, Response } from "express";

import { CreateAlternativeUseCase } from "./CreateAlternativeUseCase";

class CreateAlternativeController {
  public constructor(
    private createAlternativeUseCase: CreateAlternativeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { content, questionId } = request.body;

    const question = await this.createAlternativeUseCase.execute({
      content,
      questionId,
    });

    return response.status(201).json(question);
  }
}

export { CreateAlternativeController };

import { Request, Response } from "express";

import { UpdateAlternativeUseCase } from "./UpdateAlternativeUseCase";

class UpdateAlternativeController {
  public constructor(
    private updateAlternativeUseCase: UpdateAlternativeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { content } = request.body;

    const alternative = await this.updateAlternativeUseCase.execute({
      id,
      content,
    });

    return response.json(alternative);
  }
}

export { UpdateAlternativeController };

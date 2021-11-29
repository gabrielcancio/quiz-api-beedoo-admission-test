import { Request, Response } from "express";

import { DeleteAlternativeUseCase } from "./DeleteAlternativeUseCase";

class DeleteAlternativeController {
  public constructor(
    private deleteAlternativeUseCase: DeleteAlternativeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteAlternativeUseCase.execute({ id });

    return response.status(203).send();
  }
}

export { DeleteAlternativeController };

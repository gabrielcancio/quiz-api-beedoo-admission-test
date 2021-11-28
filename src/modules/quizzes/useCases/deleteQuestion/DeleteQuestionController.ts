import { Request, Response } from "express";

import { DeleteQuestionUseCase } from "./DeleteQuestionUseCase";

class DeleteQuestionController {
  public constructor(private deleteQuestionUseCase: DeleteQuestionUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteQuestionUseCase.execute({ id });

    return response.status(203).send();
  }
}

export { DeleteQuestionController };

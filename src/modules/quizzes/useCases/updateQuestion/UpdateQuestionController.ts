import { Request, response, Response } from "express";
import { UpdateQuestionUseCase } from "./UpdateQuestionUseCase";

class UpdateQuestionController {
  public constructor(private updateQuestionUseCase: UpdateQuestionUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { content } = request.body;

    const question = await this.updateQuestionUseCase.execute({ id, content });

    return response.json(question);
  }
}

export { UpdateQuestionController };
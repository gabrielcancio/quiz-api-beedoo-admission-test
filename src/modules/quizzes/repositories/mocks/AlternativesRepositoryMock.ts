import { Alternative } from "../../models/Alternative";
import {
  AlternativeCreateDTO,
  AlternativeFindOneDTO,
  AlternativeDeleteDTO,
  AlternativeUpdateDTO,
  IAlternativesRepositories,
} from "../interfaces/IAlternativesRepository";

export class AlternativesRepositoryMock implements IAlternativesRepositories {
  private alternatives: Alternative[] = [];

  public async create({ content, questionId }: AlternativeCreateDTO) {
    const alternative = new Alternative(
      content,
      questionId,
      undefined,
      new Date(),
      new Date()
    );

    this.alternatives.push(alternative);

    return alternative;
  }

  public async findOne({ content, id }: AlternativeFindOneDTO) {
    const alternative = this.alternatives.find(
      (alternative) => alternative.id === id || alternative.content === content
    ) as Alternative;

    return alternative;
  }

  public async listAll() {
    return this.alternatives;
  }

  public async update({ content, id }: AlternativeUpdateDTO) {
    const alternative = await this.findOne({ id });
    alternative.content = content;

    return alternative;
  }

  public async delete({ id }: AlternativeDeleteDTO) {
    const alternativeIndex = this.alternatives.findIndex(
      (question) => question.id === id
    );
    this.alternatives.splice(alternativeIndex, 1);
  }
}

import { knex } from "../../../../database";
import { Alternative } from "../../models/Alternative";
import {
  IAlternativesRepositories,
  AlternativeCreateDTO,
  AlternativeUpdateDTO,
  AlternativeDeleteDTO,
} from "../interfaces/IAlternativesRepository";

class KnexMysqlAlternativesRepository implements IAlternativesRepositories {
  public async create({
    content,
    questionId: question_id,
  }: AlternativeCreateDTO) {
    const alternativeToCreate = new Alternative(content, question_id);

    await knex<Alternative>("alternatives").insert(alternativeToCreate);
    const [alternativeCreated] = await knex<Alternative>("alternatives")
      .select("*")
      .where({ id: alternativeToCreate.id });

    return alternativeCreated;
  }

  public async listAll() {
    const alternatives = await knex<Alternative>("alternatives").select("*");

    return alternatives;
  }

  public async update({ id, content }: AlternativeUpdateDTO) {
    await knex<Alternative>("alternatives").where({ id }).update({ content });

    const [alternativeUpdated] = await knex<Alternative>("alternatives")
      .select("*")
      .where({ id });

    return alternativeUpdated;
  }

  public async delete({ id }: AlternativeDeleteDTO) {
    await knex<Alternative>("alternatives").where({ id }).delete();
  }
}

export { KnexMysqlAlternativesRepository };
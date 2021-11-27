import { knex } from "../../../../database";
import {
  Question,
  IQuestionsRepository,
  QuestionCreateDTO,
  QuestionFindOneDTO,
  QuestionUpdateDTO,
  QuestionDeleteDTO,
} from "../interfaces/IQuestionsRepository";

class KnexMysqlQuestionsRepository implements IQuestionsRepository {
  public async create({ content }: QuestionCreateDTO) {
    const questionToCreate = new Question(content);

    await knex("questions").insert<Question>(questionToCreate);

    const questionCreated = await this.findOne({ id: questionToCreate.id });

    return questionCreated;
  }

  public async listAll() {
    const questions = await knex<Question>("questions").select("*");

    return questions;
  }

  public async findOne(findOneDTO: QuestionFindOneDTO) {
    const [question] = await knex<Question>("questions")
      .select("*")
      .where(findOneDTO);

    return question;
  }

  public async update({ id, content }: QuestionUpdateDTO) {
    await knex<Question>("questions").where({ id }).update({ content });

    const questionUpdated = await this.findOne({ id });

    return questionUpdated;
  }

  public async delete({ id }: QuestionDeleteDTO) {
    await knex<Question>("questions").where({ id }).delete();
  }
}

export { KnexMysqlQuestionsRepository };

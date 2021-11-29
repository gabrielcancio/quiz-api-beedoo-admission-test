import request from "supertest"; //eslint-disable-line
import { app } from "../../../../app";
import { knex } from "../../../../database";
import { Alternative } from "../../models/Alternative";
import { Question } from "../../models/Question";
import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

let defaultQuestion: Question;
let alternatives: Alternative[];

describe("List Alternatives Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();

    const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();
    const knexMysqlAlternativesRepository =
      new KnexMysqlAlternativesRepository();

    defaultQuestion = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo awesome?",
    });

    const firstAlternative = await knexMysqlAlternativesRepository.create({
      content: "Yes, Beedoo is awesome",
      questionId: defaultQuestion.id as string,
    });
    const secondAlternative = await knexMysqlAlternativesRepository.create({
      content: "No, Beedoo is wonderfull",
      questionId: defaultQuestion.id as string,
    });
    const thirdAlternative = await knexMysqlAlternativesRepository.create({
      content: "No, Beedoo is amazing?",
      questionId: defaultQuestion.id as string,
    });

    alternatives = [firstAlternative, secondAlternative, thirdAlternative];
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to list all alternatives", async () => {
    const response = await request(app).get("/alternatives").expect(200);

    const expectedIds = alternatives.map((alternative) => alternative.id);
    const reponseIds = response.body.map(
      (alternative: Alternative) => alternative.id
    );

    expect(reponseIds).toEqual(expect.arrayContaining(expectedIds));
  });
});

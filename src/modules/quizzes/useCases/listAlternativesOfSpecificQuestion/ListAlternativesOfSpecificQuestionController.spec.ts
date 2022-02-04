import request from "supertest"; //eslint-disable-line
import { knex } from "../../../../database";
import { app } from "../../../../http/app";
import { Alternative } from "../../models/Alternative";
import { Question } from "../../models/Question";
import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

let defaultQuestion: Question;
let alternatives: Alternative[];

describe("List Alternatives of a Specific Question Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();

    const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();
    const knexMysqlAlternativesRepository =
      new KnexMysqlAlternativesRepository();

    defaultQuestion = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo awesome?",
    });

    await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo amazing?",
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

  it("Should be able to list all alternatives of defaultQuetion", async () => {
    const response = await request(app)
      .get(`/questions/${defaultQuestion.id}/alternatives`)
      .expect(200);

    const expectedIds = alternatives.map((alternative) => alternative.id);
    const reponseIds = response.body.map(
      (alternative: Alternative) => alternative.id
    );

    expect(reponseIds).toEqual(expect.arrayContaining(expectedIds));
  });

  it("Should not be able to list question of a non-existing question", async () => {
    const invalidId = "invalidId";

    const response = await request(app)
      .get(`/questions/${invalidId}/alternatives`)
      .expect(400);
    const expectedMessage = "Question must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

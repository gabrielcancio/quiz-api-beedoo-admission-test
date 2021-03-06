import request from "supertest"; //eslint-disable-line

import { knex } from "../../../../database";
import { app } from "../../../../http/app";
import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();
const knexMysqlAlternativesRepository = new KnexMysqlAlternativesRepository();

describe("Delete Alternative Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to delete an alternative", async () => {
    const { id: questionId } = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo Awesome?",
    });

    const { id } = await knexMysqlAlternativesRepository.create({
      content: "Yes, Beedoo is awesome!",
      questionId: questionId as string,
    });

    await request(app).delete(`/alternatives/${id}`).expect(204);
    const questions = await knexMysqlAlternativesRepository.list();

    expect(questions.length).toBe(0);
  });

  it("Should not be able to delete a non-existent alternative", async () => {
    const invalidId = "invalidId";

    const response = await request(app)
      .delete(`/alternatives/${invalidId}`)
      .expect(400);

    const expectedMessage = "Alternative must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

import request from "supertest"; //eslint-disable-line

import { knex } from "../../../../database";
import { app } from "../../../../http/app";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();

describe("Delete Question Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to delete a question", async () => {
    const { id } = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo Awesome?",
    });

    await request(app).delete(`/questions/${id}`).expect(203);
    const questions = await knexMysqlQuestionsRepository.listAll();

    expect(questions.length).toBe(0);
  });

  it("Should not be able to delete a non-existent question", async () => {
    const invalidId = "invalidId";

    const response = await request(app)
      .delete(`/questions/${invalidId}`)
      .expect(400);

    const expectedMessage = "Question must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

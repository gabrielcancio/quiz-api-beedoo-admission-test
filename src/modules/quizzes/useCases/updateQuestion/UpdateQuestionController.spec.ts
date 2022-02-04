import request from "supertest"; //eslint-disable-line

import { knex } from "../../../../database";
import { app } from "../../../../http/app";
import { Question } from "../../models/Question";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

let question: Question;

describe("Update Question Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();

    const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();

    question = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo awesome?",
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to update a question", async () => {
    const updateData = {
      content: "Is Beedoo wonderfull?",
    };

    const response = await request(app)
      .patch(`/questions/${question.id}`)
      .send(updateData)
      .expect(200);

    expect(response.body.id).toBe(question.id);
    expect(response.body.content).toBe(updateData.content);
  });

  it("Should not be able to update the content of a non-existent question", async () => {
    const updateData = {
      content: "Is Beedoo amazing?",
    };

    const invalidId = "invalid id!";
    const response = await request(app)
      .patch(`/questions/${invalidId}`)
      .send(updateData)
      .expect(400);

    const expectedMessage = "Question must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });

  it("Should not be able to update a question with invalid content", async () => {
    const updateData = {
      content: "",
    };

    const response = await request(app)
      .patch(`/questions/${question.id}`)
      .send(updateData)
      .expect(400);

    const expectedMessage = "Content must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

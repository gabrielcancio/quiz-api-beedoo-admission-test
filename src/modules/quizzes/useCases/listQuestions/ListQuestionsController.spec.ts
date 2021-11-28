import request from "supertest"; //eslint-disable-line
import { app } from "../../../../app";
import { knex } from "../../../../database";
import { Question } from "../../models/Question";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

let questions: Question[];

describe("List Questions Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();

    const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();

    const firstQuestion = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo awesome?",
    });
    const secondQuestion = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo wonderfull?",
    });
    const thirdQuestion = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo amazing?",
    });

    questions = [firstQuestion, secondQuestion, thirdQuestion];
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to list all questions", async () => {
    const response = await request(app).get("/questions").expect(200);

    const expectedIds = questions.map((question) => question.id);
    const reponseIds = response.body.map((question: Question) => question.id);

    expect(reponseIds).toEqual(expect.arrayContaining(expectedIds));
  });
});

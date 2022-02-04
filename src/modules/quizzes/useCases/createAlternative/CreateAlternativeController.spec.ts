import request from "supertest"; // eslint-disable-line
import { knex } from "../../../../database";
import { app } from "../../../../http/app";
import { Question } from "../../models/Question";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

let defaultQuestion: Question;

describe("Create Alternative Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    defaultQuestion = await new KnexMysqlQuestionsRepository().create({
      content: "Is Beedoo awesome",
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to create a alternative", async () => {
    const alternativeToCreate = {
      content: "Yes Beedoo is awesome",
      questionId: defaultQuestion.id as string,
    };

    const response = await request(app)
      .post("/alternatives")
      .send(alternativeToCreate)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.content).toBe(alternativeToCreate.content);
    expect(response.body.question_id).toBe(defaultQuestion.id);
  });

  it("Should not be able to create a alternative with invalid content", async () => {
    const alternativeToCreate = {
      content: "",
      questionId: defaultQuestion.id as string,
    };

    const response = await request(app)
      .post("/alternatives")
      .send(alternativeToCreate)
      .expect(400);

    const expectedMessage = "Content must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });

  it("Should not be able to create a alternative with used content", async () => {
    const alternativeToCreate = {
      content: "Yes, Beedoo is amazing",
      questionId: defaultQuestion.id as string,
    };

    await request(app)
      .post("/alternatives")
      .send(alternativeToCreate)
      .expect(201);

    const response = await request(app)
      .post("/alternatives")
      .send(alternativeToCreate)
      .expect(400);

    const expectedMessage = "Alternative already exists!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

import request from "supertest"; // eslint-disable-line
import { knex } from "../../../../database";
import { app } from "../../../../http/app";

describe("Create Question Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to create a question", async () => {
    const questionToCreate = {
      content: "Is Beedoo awesome?",
    };

    const response = await request(app)
      .post("/questions")
      .send(questionToCreate)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.content).toBe(questionToCreate.content);
  });

  it("Should not be able to create a question with invalid content", async () => {
    const questionToCreate = {
      content: "",
    };

    const response = await request(app)
      .post("/questions")
      .send(questionToCreate)
      .expect(400);

    const expectedMessage = "Content must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });

  it("Should not be able to create a question with used content", async () => {
    const questionToCreate = {
      content: "Is Beedoo amazing?",
    };

    await request(app).post("/questions").send(questionToCreate).expect(201);

    const response = await request(app)
      .post("/questions")
      .send(questionToCreate)
      .expect(400);

    const expectedMessage = "Question already exists!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

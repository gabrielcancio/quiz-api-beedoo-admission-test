import request from "supertest"; //eslint-disable-line

import { app } from "../../../../app";
import { knex } from "../../../../database";
import { Alternative } from "../../models/Alternative";
import { KnexMysqlAlternativesRepository } from "../../repositories/implementations/KnexMysqlAlternativesRepository";
import { KnexMysqlQuestionsRepository } from "../../repositories/implementations/KnexMysqlQuestionsRepository";

let knexMysqlAlternativesRepository: KnexMysqlAlternativesRepository;
let alternative: Alternative;

describe("Update Alternative Controller", () => {
  beforeAll(async () => {
    await knex.migrate.latest();

    const knexMysqlQuestionsRepository = new KnexMysqlQuestionsRepository();
    knexMysqlAlternativesRepository = new KnexMysqlAlternativesRepository();

    const { id } = await knexMysqlQuestionsRepository.create({
      content: "Is Beedoo awesome?",
    });

    alternative = await knexMysqlAlternativesRepository.create({
      content: "Yes, Beedoo is awesome",
      questionId: id as string,
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("Should be able to update a alternative", async () => {
    const updateData = {
      content: "No, Beedoo is wonderfull",
    };

    const response = await request(app)
      .patch(`/alternatives/${alternative.id}`)
      .send(updateData)
      .expect(200);

    const updatedAlternative = await knexMysqlAlternativesRepository.findOne({
      id: alternative.id,
    });

    expect(response.body.id).toBe(alternative.id);
    expect(response.body.content).toBe(updateData.content);
    expect(response.body.content).toBe(updatedAlternative.content);
  });

  it("Should not be able to update the content of a non-existent alternative", async () => {
    const updateData = {
      content: "No, Beedoo is amazing",
    };

    const invalidId = "invaliIid";
    const response = await request(app)
      .patch(`/alternatives/${invalidId}`)
      .send(updateData)
      .expect(400);

    const expectedMessage = "Alternative must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });

  it("Should not be able to update a question with invalid content", async () => {
    const updateData = {
      content: "",
    };

    const response = await request(app)
      .patch(`/alternatives/${alternative.id}`)
      .send(updateData)
      .expect(400);

    const expectedMessage = "Content must be valid!";

    expect(response.body.message).toBe(expectedMessage);
  });
});

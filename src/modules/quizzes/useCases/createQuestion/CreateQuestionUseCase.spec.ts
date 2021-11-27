import { AppError } from "../../../../errors/AppError";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

let questionsRepository: QuestionsRepositoryMock;
let createQuestionUseCase: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryMock();
    createQuestionUseCase = new CreateQuestionUseCase(questionsRepository);
  });

  it("Should be able to create a new question", async () => {
    const question = {
      content: "Is Beedoo awesome?",
    };

    await createQuestionUseCase.execute(question);
    const createdQuestion = await questionsRepository.findOne(question);

    expect(createdQuestion).toHaveProperty("id");
    expect(createdQuestion).toHaveProperty("created_at");
    expect(createdQuestion).toHaveProperty("updated_at");
    expect(createdQuestion.content).toBe(question.content);
  });

  it("Should not be able to create a question with invalid content", async () => {
    expect(async () => {
      const question = {
        content: "",
      };

      await createQuestionUseCase.execute(question);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a question with a content already was used", async () => {
    expect(async () => {
      const question = {
        content: "Is Beedoo awesome?",
      };

      await createQuestionUseCase.execute(question);
      await createQuestionUseCase.execute(question);
    }).rejects.toBeInstanceOf(AppError);
  });
});

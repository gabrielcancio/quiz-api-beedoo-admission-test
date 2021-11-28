import { AppError } from "../../../../errors/AppError";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { UpdateQuestionUseCase } from "./UpdateQuestionUseCase";

let questionRepository: QuestionsRepositoryMock;
let updateQuestionUseCase: UpdateQuestionUseCase;

describe("Update Question", () => {
  beforeEach(() => {
    questionRepository = new QuestionsRepositoryMock();
    updateQuestionUseCase = new UpdateQuestionUseCase(questionRepository);
  });

  it("Should be able to update the content property of an existing question", async () => {
    const questionToCreate = {
      content: "Is Beedoo awesome?",
    };
    const contentExpected = "Is Beedoo wonderfull?";
    const { id } = await questionRepository.create(questionToCreate);

    const questionRepositorySpy = jest.spyOn(questionRepository, "update");

    await updateQuestionUseCase.execute({
      id: id as string,
      content: contentExpected,
    });
    const questionUpdated = await questionRepository.findOne({ id });

    expect(questionRepositorySpy).toBeCalledWith({
      id,
      content: contentExpected,
    });
    expect(questionUpdated.content).toBe(contentExpected);
  });

  it("Should not be able to update the content of a non-existent question", async () => {
    expect(async () => {
      const questionToCreate = {
        content: "Is Beedoo awesome?",
      };

      const contentExpected = "Is Beedoo wonderfull?";
      const invalidId = "invalid id!";

      await questionRepository.create(questionToCreate);
      await updateQuestionUseCase.execute({
        id: invalidId,
        content: contentExpected,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to update an invalid content", async () => {
    expect(async () => {
      const questionToCreate = {
        content: "Is Beedoo awesome?",
      };

      const contentExpected = "";

      const { id } = await questionRepository.create(questionToCreate);
      await updateQuestionUseCase.execute({
        id: id as string,
        content: contentExpected,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

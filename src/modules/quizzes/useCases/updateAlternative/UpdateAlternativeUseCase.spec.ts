import { AppError } from "../../../../errors/AppError";
import { Question } from "../../models/Question";
import { AlternativesRepositoryMock } from "../../repositories/mocks/AlternativesRepositoryMock";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { UpdateAlternativeUseCase } from "./UpdateAlternativeUseCase";

let questionRepository: QuestionsRepositoryMock;
let alternativeRepository: AlternativesRepositoryMock;
let updateAlternativeUseCase: UpdateAlternativeUseCase;

let defaultQuestion: Question;

describe("Update Alternative", () => {
  beforeAll(async () => {
    questionRepository = new QuestionsRepositoryMock();
    defaultQuestion = await questionRepository.create({
      content: "Is Beedoo awesome?",
    });
  });

  beforeEach(() => {
    alternativeRepository = new AlternativesRepositoryMock();
    updateAlternativeUseCase = new UpdateAlternativeUseCase(
      alternativeRepository
    );
  });

  it("Should be able to update the content property of an existing alternative", async () => {
    const alternativeToCreate = {
      content: "Yes, Beedoo is awesome",
      questionId: defaultQuestion.id as string,
    };

    const contentExpected = "No, Beedoo is wonderfull";
    const { id } = await alternativeRepository.create(alternativeToCreate);

    const alternativeRepositorySpy = jest.spyOn(
      alternativeRepository,
      "update"
    );

    await updateAlternativeUseCase.execute({
      id: id as string,
      content: contentExpected,
    });

    const questionUpdated = await alternativeRepository.findOne({ id });

    expect(alternativeRepositorySpy).toBeCalledWith({
      id,
      content: contentExpected,
    });
    expect(questionUpdated.content).toBe(contentExpected);
  });

  it("Should not be able to update the content of a non-existent alternative", async () => {
    expect(async () => {
      const contentExpected = "Is Beedoo wonderfull?";
      const invalidId = "invalid id!";

      await updateAlternativeUseCase.execute({
        id: invalidId,
        content: contentExpected,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to update an invalid content", async () => {
    expect(async () => {
      const alternativeToCreate = {
        content: "Yes, Beedoo is awesome",
        questionId: defaultQuestion.id as string,
      };

      const invalidContent = "";

      const { id } = await questionRepository.create(alternativeToCreate);
      await updateAlternativeUseCase.execute({
        id: id as string,
        content: invalidContent,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

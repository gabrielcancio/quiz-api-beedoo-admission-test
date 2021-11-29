import { AppError } from "../../../../errors/AppError";
import { Question } from "../../models/Question";
import { AlternativesRepositoryMock } from "../../repositories/mocks/AlternativesRepositoryMock";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { CreateAlternativeUseCase } from "./CreateAlternativeUseCase";

let defaultQuestion: Question;
let alternativesRepository: AlternativesRepositoryMock;
let questionsRepository: QuestionsRepositoryMock;
let createAlternativeUseCase: CreateAlternativeUseCase;

describe("Create Alternative", () => {
  beforeEach(async () => {
    alternativesRepository = new AlternativesRepositoryMock();
    questionsRepository = new QuestionsRepositoryMock();

    createAlternativeUseCase = new CreateAlternativeUseCase(
      alternativesRepository,
      questionsRepository
    );

    const questionToCreate = { content: "Is Beedoo Awesome?" };

    defaultQuestion = await questionsRepository.create(questionToCreate);
  });

  it("Should be able to create a alternative to a question", async () => {
    const alternativeToCreate = {
      content: "Yes, Beedoo is amazing!",
      questionId: defaultQuestion.id as string,
    };

    const alternativeCreated = await createAlternativeUseCase.execute(
      alternativeToCreate
    );

    const alternative = await alternativesRepository.findOne({
      content: alternativeToCreate.content,
    });

    expect(alternativeCreated).toHaveProperty("id", alternative.id);
    expect(alternativeCreated).toHaveProperty(
      "question_id",
      alternativeToCreate.questionId
    );
    expect(alternativeCreated).toHaveProperty(
      "content",
      alternativeToCreate.content
    );
    expect(alternativeCreated).toHaveProperty("created_at");
    expect(alternativeCreated).toHaveProperty("updated_at");
  });

  it("Should not be able to create a alternative to a non-existent question", async () => {
    const invalidId = "InvalidId";
    const content = "Beedoo is amazing!";

    expect(async () => {
      await createAlternativeUseCase.execute({
        questionId: invalidId,
        content,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a alternative with a invalid content", async () => {
    expect(async () => {
      await createAlternativeUseCase.execute({
        questionId: defaultQuestion.id as string,
        content: "",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a alternative with a content already was used", async () => {
    const alternative = {
      content: "Yes, Beedoo is awesome",
      questionId: defaultQuestion.id as string,
    };

    await createAlternativeUseCase.execute(alternative);

    expect(async () => {
      await createAlternativeUseCase.execute(alternative);
    }).rejects.toBeInstanceOf(AppError);
  });
});

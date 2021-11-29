import { Question } from "../../models/Question";
import { AlternativesRepositoryMock } from "../../repositories/mocks/AlternativesRepositoryMock";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { ListAlternativesUseCase } from "./ListAlternativesUseCase";

let questionsRepository: QuestionsRepositoryMock;
let alternativesRepository: AlternativesRepositoryMock;
let listAlternativesUseCase: ListAlternativesUseCase;

let defaultQuestion: Question;

describe("List Alternatives", () => {
  beforeAll(async () => {
    questionsRepository = new QuestionsRepositoryMock();
    defaultQuestion = await questionsRepository.create({
      content: "Is beedoo awesome?",
    });
  });

  beforeEach(() => {
    alternativesRepository = new AlternativesRepositoryMock();
    listAlternativesUseCase = new ListAlternativesUseCase(
      alternativesRepository
    );
  });

  it("It should be able to list all alternatives", async () => {
    const alternativesRepositorySpy = jest.spyOn(
      alternativesRepository,
      "listAll"
    );

    const alternativesToCreate = [
      {
        content: "Yes, Beedoo is awesome",
        questionId: defaultQuestion.id as string,
      },
      {
        content: "No, Beedoo is beedoo wonderfull",
        questionId: defaultQuestion.id as string,
      },
    ];

    await alternativesRepository.create(alternativesToCreate[0]);
    await alternativesRepository.create(alternativesToCreate[1]);

    const alternatives = await listAlternativesUseCase.execute();

    expect(alternatives[0]).toHaveProperty("id");
    expect(alternatives[1]).toHaveProperty("id");
    expect(alternatives[0]).toHaveProperty("question_id", defaultQuestion.id);
    expect(alternatives[1]).toHaveProperty("question_id", defaultQuestion.id);
    expect(alternatives.length).toEqual(alternativesToCreate.length);
    expect(alternativesRepositorySpy).toHaveBeenCalled();
  });
});

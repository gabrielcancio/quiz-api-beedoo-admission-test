import { Question } from "../../models/Question";
import { AlternativesRepositoryMock } from "../../repositories/mocks/AlternativesRepositoryMock";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { ListAlternativesOfSpecificQuestionUseCase } from "./ListAlternativesOfSpecificQuestionUseCase";

let questionsRepository: QuestionsRepositoryMock;
let alternativesRepository: AlternativesRepositoryMock;
let listAlternativesOfSpecificQuestionUseCase: ListAlternativesOfSpecificQuestionUseCase;

let questionOne: Question;
let questionTwo: Question;

describe("List Alternatives of Specific Question", () => {
  beforeEach(async () => {
    alternativesRepository = new AlternativesRepositoryMock();
    questionsRepository = new QuestionsRepositoryMock();

    listAlternativesOfSpecificQuestionUseCase =
      new ListAlternativesOfSpecificQuestionUseCase(
        alternativesRepository,
        questionsRepository
      );

    questionOne = await questionsRepository.create({
      content: "Is Beedoo awesome?",
    });

    questionTwo = await questionsRepository.create({
      content: "Is Beedoo amazing?",
    });

    await alternativesRepository.create({
      content: "Yes, Beedoo is amazing!",
      questionId: questionTwo.id as string,
    });

    await alternativesRepository.create({
      content: "No, Beedoo is awesome!",
      questionId: questionTwo.id as string,
    });
  });

  it("It should be able to list all alternatives of a specific question", async () => {
    const alternativesRepositorySpy = jest.spyOn(
      alternativesRepository,
      "list"
    );

    const alternativesToCreate = [
      {
        content: "Yes, Beedoo is awesome",
        questionId: questionOne.id as string,
      },
      {
        content: "No, Beedoo is beedoo wonderfull",
        questionId: questionOne.id as string,
      },
    ];

    await alternativesRepository.create(alternativesToCreate[0]);
    await alternativesRepository.create(alternativesToCreate[1]);

    const alternatives =
      await listAlternativesOfSpecificQuestionUseCase.execute({
        questionId: questionOne.id as string,
      });

    expect(alternatives[0]).toHaveProperty("id");
    expect(alternatives[1]).toHaveProperty("id");
    expect(alternatives[0]).toHaveProperty("question_id", questionOne.id);
    expect(alternatives[1]).toHaveProperty("question_id", questionOne.id);
    expect(alternatives.length).toEqual(alternativesToCreate.length);
    expect(alternativesRepositorySpy).toHaveBeenCalledWith({
      questionId: questionOne.id,
    });
  });
});

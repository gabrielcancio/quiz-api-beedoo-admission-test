import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { ListQuestionsUseCase } from "./ListQuestionsUseCase";

let questionsRepository: QuestionsRepositoryMock;
let listQuestionsUseCase: ListQuestionsUseCase;

describe("List Questions", () => {
  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryMock();
    listQuestionsUseCase = new ListQuestionsUseCase(questionsRepository);
  });

  it("It should be able to list all questions", async () => {
    const questionsRepositorySpy = jest.spyOn(questionsRepository, "listAll");

    const questionsToCreate = [
      { content: "Is beedoo awesome?" },
      { content: "Is beedoo wonderfull?" },
    ];

    await questionsRepository.create(questionsToCreate[0]);
    await questionsRepository.create(questionsToCreate[1]);

    const questions = await listQuestionsUseCase.execute();

    expect(questions[0]).toHaveProperty("id");
    expect(questions[1]).toHaveProperty("id");
    expect(questions.length).toEqual(questionsToCreate.length);
    expect(questionsRepositorySpy).toHaveBeenCalled();
  });
});

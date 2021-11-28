import { AppError } from "../../../../errors/AppError";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { DeleteQuestionUseCase } from "./DeleteQuestionUseCase";

let questionsRepository: QuestionsRepositoryMock;
let deleteQuestionUseCase: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    questionsRepository = new QuestionsRepositoryMock();
    deleteQuestionUseCase = new DeleteQuestionUseCase(questionsRepository);
  });

  it("Should be able to delete an question", async () => {
    const questionToCreate = {
      content: "Is Beedoo awesome?",
    };
    const { id } = await questionsRepository.create(questionToCreate);

    await deleteQuestionUseCase.execute({ id: id as string });
    const question = await questionsRepository.findOne({ id });

    const expected = undefined;

    expect(question).toBe(expected);
  });

  it("Should not be able to delete a non-existent question", async () => {
    expect(async () => {
      const invalidId = "Invalid Id!!";

      await deleteQuestionUseCase.execute({ id: invalidId });
    }).rejects.toBeInstanceOf(AppError);
  });
});

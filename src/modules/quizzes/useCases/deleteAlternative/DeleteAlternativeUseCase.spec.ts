import { AppError } from "../../../../errors/AppError";
import { Alternative } from "../../models/Alternative";
import { AlternativesRepositoryMock } from "../../repositories/mocks/AlternativesRepositoryMock";
import { QuestionsRepositoryMock } from "../../repositories/mocks/QuestionsRepositoryMock";
import { DeleteAlternativeUseCase } from "./DeleteAlternativeUseCase";

let questionsRepository: QuestionsRepositoryMock;
let alternativesRepository: AlternativesRepositoryMock;
let deleteAlternativeUseCase: DeleteAlternativeUseCase;

let alternative: Alternative;

describe("Delete Alternative", () => {
  beforeEach(async () => {
    questionsRepository = new QuestionsRepositoryMock();
    alternativesRepository = new AlternativesRepositoryMock();
    deleteAlternativeUseCase = new DeleteAlternativeUseCase(
      alternativesRepository
    );

    const { id } = await questionsRepository.create({
      content: "Is Beedoo awesome?",
    });

    alternative = await alternativesRepository.create({
      content: "Yes, Beedoo is awesome!",
      questionId: id as string,
    });
  });

  it("Should be able to delete an alternative", async () => {
    await deleteAlternativeUseCase.execute({ id: alternative.id as string });
    const alternativeDeleted = await alternativesRepository.findOne({
      id: alternative.id,
    });

    const expected = undefined;

    expect(alternativeDeleted).toBe(expected);
  });

  it("Should not be able to delete a non-existent alternative", async () => {
    expect(async () => {
      const invalidId = "Invalid Id!!";

      await deleteAlternativeUseCase.execute({ id: invalidId });
    }).rejects.toBeInstanceOf(AppError);
  });
});

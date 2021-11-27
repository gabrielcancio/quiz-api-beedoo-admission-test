import {
  IQuestionsRepository,
  Question,
  QuestionCreateDTO,
  QuestionDeleteDTO,
  QuestionFindOneDTO,
  QuestionUpdateDTO,
} from "../interfaces/IQuestionsRepository";

export class QuestionsRepositoryMock implements IQuestionsRepository {
  private questions: Question[] = [];

  public async create({ content }: QuestionCreateDTO) {
    const question = new Question(content, undefined, new Date(), new Date());

    this.questions.push(question);

    return question;
  }

  public async findOne({ content, id }: QuestionFindOneDTO) {
    const question = this.questions.find(
      (question) => question.id === id || question.content === content
    ) as Question;

    return question;
  }

  public async listAll() {
    return this.questions;
  }

  public async update({ content, id }: QuestionUpdateDTO) {
    const question = await this.findOne({ id });
    question.content = content;

    return question;
  }

  public async delete({ id }: QuestionDeleteDTO) {
    const questionIndex = this.questions.findIndex(
      (question) => question.id === id
    );
    this.questions.splice(questionIndex, 1);
  }
}

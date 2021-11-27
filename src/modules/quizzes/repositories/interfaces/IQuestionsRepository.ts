import { Question } from "../../models/Question";

type QuestionCreateDTO = {
  content: string;
};

type QuestionFindOneDTO = {
  id?: string;
  content?: string;
};

type QuestionUpdateDTO = {
  id: string;
  content: string;
};

type QuestionDeleteDTO = {
  id: string;
};

interface IQuestionsRepository {
  create(dto: QuestionCreateDTO): Promise<Question>;
  findOne(dto: QuestionFindOneDTO): Promise<Question>;
  listAll(): Promise<Question[]>;
  update(dto: QuestionUpdateDTO): Promise<Question>;
  delete(dto: QuestionDeleteDTO): Promise<void>;
}

export {
  IQuestionsRepository,
  Question,
  QuestionCreateDTO,
  QuestionFindOneDTO,
  QuestionUpdateDTO,
  QuestionDeleteDTO,
};

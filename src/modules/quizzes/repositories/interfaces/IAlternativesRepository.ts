import { Alternative } from "../../models/Alternative";

type AlternativeCreateDTO = {
  content: string;
  questionId: string;
};

type AlternativeFindOneDTO = {
  id?: string;
  content?: string;
};

type AlternativeUpdateDTO = {
  id: string;
  content: string;
};

type AlternativeDeleteDTO = {
  id: string;
};

interface IAlternativesRepositories {
  create(dto: AlternativeCreateDTO): Promise<Alternative>;
  findOne(dto: AlternativeFindOneDTO): Promise<Alternative>;
  listAll(): Promise<Alternative[]>;
  update(dto: AlternativeUpdateDTO): Promise<Alternative>;
  delete(dto: AlternativeDeleteDTO): Promise<void>;
}

export {
  IAlternativesRepositories,
  AlternativeCreateDTO,
  AlternativeFindOneDTO,
  AlternativeUpdateDTO,
  AlternativeDeleteDTO,
};

import { Alternative } from "../../models/Alternative";

type AlternativeCreateDTO = {
  content: string;
  questionId: string;
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
  listAll(): Promise<Alternative[]>;
  update(dto: AlternativeUpdateDTO): Promise<Alternative>;
  delete(dto: AlternativeDeleteDTO): Promise<void>;
}

export {
  IAlternativesRepositories,
  AlternativeCreateDTO,
  AlternativeUpdateDTO,
  AlternativeDeleteDTO,
};

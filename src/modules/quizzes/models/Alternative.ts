import { v4 as uuidV4 } from "uuid";

class Alternative {
  public content: string;
  public question_id: string;
  public id?: string;
  public created_at?: Date;
  public updated_at?: Date;

  public constructor(
    content: string,
    questionId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    if (!id) {
      this.id = uuidV4();
    }

    if (createdAt && updatedAt) {
      this.created_at = createdAt;
      this.updated_at = updatedAt;
    }

    this.content = content;
    this.question_id = questionId;
  }
}

export { Alternative };

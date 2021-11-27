import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("alternatives", (table) => {
    table.uuid("id").primary();
    table.text("content").notNullable();
    table.timestamps(true, true);

    // Foreign Keys
    table
      .uuid("question_id")
      .references("questions.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("alternatives");
}

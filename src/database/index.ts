import { knex as Knex } from "knex";

import knexConfig from "../../knexfile";

const knexEnv = process.env.NODE_ENV || "development";
const knex = Knex(knexConfig[knexEnv]);

export { knex };

import { Knex } from "knex";
import { join } from "path";

// Update with your config settings.
interface IKnexConfig {
  [key: string]: Knex.Config;
}

const knexConfig: IKnexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: "database",
      port: 3306,
      user: "docker",
      password: "docker",
      database: "beedoo_db",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: join(process.cwd(), "src", "database", "migrations"),
    },
  },
  testing: {
    client: "mysql",
    connection: {
      host: "database",
      port: 3306,
      user: "docker",
      password: "docker",
      database: "test_db",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: join(process.cwd(), "src", "database", "migrations"),
    },
  },
};

export default knexConfig;

import pg, { Pool } from "src/lib/pg";
import { config } from "../common/config";

// const PGPool = pg.Pool;

const pool = new Pool({
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  user: config.dbUser,
});

export class Postgres {
  async fetch<T>(SQL: string, ...args: any[]): Promise<T> {
    const clien = await pool.connect();
    try {
      const {
        rows: [row],
      } = await clien.query(SQL, args);
      return row;
    } finally {
      clien.release();
    }
  }

  async fetchAll<T>(SQL: string, ...args: any[]): Promise<T[]> {
    const clien = await pool.connect();
    try {
      const { rows } = await clien.query(SQL, args);
      return rows;
    } finally {
      clien.release();
    }
  }

  get getPool(): Pool {
    return pool;
  }
}

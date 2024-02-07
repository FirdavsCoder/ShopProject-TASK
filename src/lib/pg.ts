// @ts-ignore
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
    const client = await pool.connect();
    try {
      const {
        rows: [row],
      } = await client.query(SQL, args);
      return row;
    } finally {
      client.release();
    }
  }

  async fetchAll<T>(SQL: string, ...args: any[]): Promise<T[]> {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(SQL, args);
      return rows;
    } finally {
      client.release();
    }
  }

  get getPool(): Pool {
    return pool;
  }
}

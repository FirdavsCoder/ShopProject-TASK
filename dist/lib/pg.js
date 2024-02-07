"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
// @ts-ignore
const pg_1 = require("src/lib/pg");
const config_1 = require("../common/config");
// const PGPool = pg.Pool;
const pool = new pg_1.Pool({
    host: config_1.config.dbHost,
    database: config_1.config.dbName,
    password: config_1.config.dbPassword,
    port: config_1.config.dbPort,
    user: config_1.config.dbUser,
});
class Postgres {
    fetch(SQL, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            try {
                const { rows: [row], } = yield client.query(SQL, args);
                return row;
            }
            finally {
                client.release();
            }
        });
    }
    fetchAll(SQL, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            try {
                const { rows } = yield client.query(SQL, args);
                return rows;
            }
            finally {
                client.release();
            }
        });
    }
    get getPool() {
        return pool;
    }
}
exports.Postgres = Postgres;

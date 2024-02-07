"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: Number(process.env.PORT),
    jwtKey: String(process.env.JWT_KEY),
    jwtExpiredIn: Number(process.env.JWT_EXPIREDIN),
    dbName: process.env.DB_NAME,
    dbPort: Number(process.env.DB_PORT),
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
};

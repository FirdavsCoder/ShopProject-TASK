import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT),
  jwtKey: String(process.env.JWT_KEY),
  jwtExpiredIn: Number(process.env.JWT_EXPIREDIN),
  dbName: process.env.DB_NAME,
  dbPort: Number(process.env.DB_PORT),
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
};

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "./common/config";
import router from "./modules/app.module";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/v1/", router);

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});

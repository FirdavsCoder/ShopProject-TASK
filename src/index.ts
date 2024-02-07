import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "./common/config";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api", (req: Request, res: Response, next: NextFunction) => {
  res.json("ok");
});

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});

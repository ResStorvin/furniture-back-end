import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { check } from "./middlewares/check";
import { CustomRequest } from "./middlewares/check";

import { limiter } from "./middlewares/rateLimiter";

export const app = express();

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression({}))
  .use(limiter);

app.get("/health", check, (req: CustomRequest, res: Response) => {
  res.status(200).json({ message: "OK", userId: req.userId });
});

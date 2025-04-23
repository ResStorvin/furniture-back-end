import express, { Request, Response, NextFunction } from "express";
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
  throw new Error("An error has occurred!");
  res.status(200).json({ message: "OK", userId: req.userId });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  const errorCode = error.code || "Error_Code";
  res.status(status).json({ message, errorCode });
});

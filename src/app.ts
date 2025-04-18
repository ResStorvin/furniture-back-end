import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

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

// http://localhost:8080/health
// to test limiters
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

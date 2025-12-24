import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import healthRoutes from "./route/v1/health";
import viewRoutes from "./route/v1/web/view";
import * as errorController from "./controllers/web/errorController";

import { limiter } from "./middlewares/rateLimiter";

export const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression({}))
  .use(limiter);

app.use(express.static("public"));

app.use("/api/v1", healthRoutes);
app.use(viewRoutes);
app.use(errorController.notFound);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "internal server error";
  const errorCode = error.code || "Error Code";
  res.status(status).json({ message, errorCode });
});

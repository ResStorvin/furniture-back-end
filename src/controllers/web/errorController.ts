import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.render("404", {
    title: "404 Not Found",
    message: "The page you are looking for does not exist.",
  });
};

import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  userId?: number;
}

export const check = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const err: any = new Error("An error has occurred!");
  err.status = 401;
  err.code = "Error token expired";
  return next(err);
  // have to write "return" when we want to return an error from middleware

  req.userId = 333;
  next();
};

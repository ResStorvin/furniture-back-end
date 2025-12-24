import { Request, Response, NextFunction } from "express";

export const home = (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "Home Screen" });
};

export const about = (req: Request, res: Response, next: NextFunction) => {
  const users = [
    { name: "Alice", age: 20 },
    { name: "Bob", age: 22 },
  ];
  res.render("about", { title: "About Us", users });
};

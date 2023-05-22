import { NextFunction, Request, Response } from "express";

interface UserRequest extends Request {
  user: any;
}

export const isAdmin = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!["admin"].includes(req.user.userType)) {
    return res.status(420).json({
      error: "Unauthorized",
      message: "Sorry ! You don't have access",
    });
  }
  next();
};

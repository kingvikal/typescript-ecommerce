import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../Utils/appDataSource";
import { User } from "../Models/userEntity";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

interface RequestUser extends Request {
  user: any;
}
export const IsUser = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqHeaders = req.headers.authorization;

    const token = reqHeaders && reqHeaders.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "No token provided. Access Denied" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    const user: any = await userRepository.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(400).json("invalid");
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

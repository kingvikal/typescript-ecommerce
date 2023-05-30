import { Request, Response } from "express";
import { RegisterValidate } from "../Services/joiValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/userEntity";
import { AppDataSource } from "../Utils/appDataSource";

const userRepository = AppDataSource.getRepository(User);
export const Register = async (req: Request, res: Response) => {
  try {
    const result = await RegisterValidate.validateAsync(req.body);

    if (!result) {
      return res.status(400).json("Validation error");
    } else {
      const emailUser = await userRepository.findOne({
        where: { email: req.body.email },
      });

      if (emailUser) {
        return res.status(400).json({
          message: `${emailUser.email} already exist in database. choose another one.`,
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 12);

      const user: any = new User();
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.password = hashedPassword;
      user.userType = req.body.userType;

      await userRepository.save(user);
      return res
        .status(200)
        .json({ message: "user created successfully.", data: user });
    }
  } catch (err) {
    if (err.isJoi === true) return res.status(422).json(err);
    console.log(err);
    return res.status(500).json(err);
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email: email } });

  if (!user) {
    res.status(400).json({ message: "No user with this email exists" });
  }
  try {
    if (email && password) {
      const payload = { id: user.id, email: user.email };
      const option = { expiresIn: "365d" };
      const accessToken: any = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        option
      );

      const compare = bcrypt.compareSync(password, user.password);

      if (!compare) {
        return res.status(404).json({ message: "Password doesn't match" });
      } else {
        return res
          .status(200)
          .json({ message: "User login successfull", accessToken, user });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.find();

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json("Error");
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const user = await userRepository.findOne({ where: { id } });
    console.log(user);

    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const { firstname, password, lastname } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    const user = await userRepository.update(
      { id },
      {
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      }
    );
    if (!firstname || !lastname || !password) {
      return res.status(400).json({ error: `User must fill all fields` });
    }
    console.log("first");

    return res.status(200).json({
      message: "user updated successfully",
      success: `${user.affected} row affected`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const user: any = await userRepository.delete({ id });

    if (user.affected == 0) {
      return res.status(400).json("User already deleted");
    }
    return res.status(200).json({
      success: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

import { Request, RequestHandler, Response } from "express";
import { IUser } from "../models/User";
import { findUserByEmail, login, register } from "../services/UserService";
import { IUserModel } from "../daos/UserDao";
import { InvalidUsernameOrPasswordError } from "../utils/LibraryErrors";
import { generateToken } from "../utils/Jwt";

function handleError(res: Response, error: any, options?: { conflict?: boolean }) {
  if (options?.conflict) {
    return res.status(409).json({
      message: "A user with this email already exists",
      error: error.message,
    });
  }

  console.log(error);

  if (error instanceof InvalidUsernameOrPasswordError) {
    return res.status(401).json({
      message: "Invalid username or password",
      error: error.message,
    });
  }

  return res.status(500).json({
    message: "An internal server error occurred",
    error: error.message,
  });
}

export async function handleRegister(req: Request, res: Response) {
  const user: IUser = req.body;

  try {
    const registeredUser: IUserModel = await register(user);

    res.status(201).json({
      message: "User successfully created",
      user: {
        _id: registeredUser._id,
        type: registeredUser.type,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
    });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key")) {
      handleError(res, error, { conflict: true });
    } else {
      handleError(res, error);
    }
  }
}

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const loggedInUser: IUserModel = await login({ email, password });

    const token = generateToken({
      _id: loggedInUser._id,
      email: loggedInUser.email,
      type: loggedInUser.type,
    });

    res.status(200).json({
      message: "User successfully logged in",
      token,
      user: {
        _id: loggedInUser._id,
        type: loggedInUser.type,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
      },
    });
  } catch (error: any) {
    handleError(res, error);
  }
}

export const handleCheckEmail: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);
    res.status(200).json({ available: !existingUser });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export default { handleRegister, handleLogin, handleCheckEmail };

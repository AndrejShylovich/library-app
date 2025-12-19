import { Request, RequestHandler, Response } from "express";
import { IUser } from "../models/User";
import { findUserByEmail, login, register } from "../services/UserService";
import { IUserModel } from "../daos/UserDao";
import { InvalidUsernameOrPasswordError } from "../utils/LibraryErrors";

function handleError(res: Response, error: any, options?: { conflict?: boolean }) {
  if (options?.conflict) {
    return res.status(409).json({ message: "Пользователь с данным email уже существует", error: error.message });
  }
  console.log(error)
  if (error instanceof InvalidUsernameOrPasswordError) {
    return res.status(401).json({ message: "Неверный логин или пароль", error: error.message });
  } 
  return res.status(500).json({ message: "Произошла ошибка на сервере", error: error.message });
}

export async function handleRegister(req: Request, res: Response) {
  const user: IUser = req.body;

  try {
    const registeredUser: IUserModel = await register(user);

    res.status(201).json({
      message: "Пользователь успешно создан",
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
  const credentials = req.body;

  try {
    const loggedIn: IUserModel = await login(credentials);

    res.status(200).json({
      message: "Пользователь авторизировался успешно",
      user: {
        _id: loggedIn._id,
        type: loggedIn.type,
        firstName: loggedIn.firstName,
        lastName: loggedIn.lastName,
        email: loggedIn.email,
      },
    });
  } catch (error: any) {
    handleError(res, error);
  }
}

export const handleCheckEmail: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email обязателен" });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);
    res.status(200).json({ available: !existingUser });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

export default { handleRegister, handleLogin, handleCheckEmail };

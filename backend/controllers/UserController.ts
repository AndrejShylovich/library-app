import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  modifyUser,
  removeUser,
} from "../services/UserService";
import { EmailAlreadyExistsError, UserDoesNotExistError } from "../utils/LibraryErrors";

function handleError(res: Response, error: any, notFoundMessage: string) {
  if (error instanceof UserDoesNotExistError) {
    return res.status(404).json({ message: notFoundMessage });
  } else if (error instanceof EmailAlreadyExistsError) {
    return res
      .status(409)
      .json({
        message: "Email уже занят другим пользователем",
        error: error.message,
      }); // 409 Conflict
  } else {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await findAllUsers();
    res.status(200).json({ message: "Список пользователей получен", users });
  } catch (error) {
    handleError(res, error, "Список пользователей недоступен сейчас");
  }
}

export async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);
    res.status(200).json({ message: "Пользователь найден успешно", user });
  } catch (error) {
    handleError(res, error, "Пользователь не существует");
  }
}

export async function updateUser(req: Request, res: Response) {
  const user = req.body;
  console.log(user);
  try {
    const updatedUser = await modifyUser(user);
    res
      .status(202)
      .json({ message: "Пользователь обновлен успешно", user: updatedUser });
  } catch (error) {
    handleError(res, error, "Пользователь не существует");
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    await removeUser(userId);
    res.status(202).json({ message: "Пользователь удален успешно" });
  } catch (error) {
    handleError(res, error, "Пользователь не существует");
  }
}

export default { getAllUsers, getUserById, updateUser, deleteUser };

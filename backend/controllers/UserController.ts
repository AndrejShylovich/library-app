import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  modifyUser,
  removeUser,
} from "../services/UserService";
import {
  EmailAlreadyExistsError,
  UserDoesNotExistError,
} from "../utils/LibraryErrors";

function handleError(res: Response, error: any, notFoundMessage: string) {
  if (error instanceof UserDoesNotExistError) {
    return res.status(404).json({ message: notFoundMessage });
  }

  if (error instanceof EmailAlreadyExistsError) {
    return res.status(409).json({
      message: "Email is already used by another user",
      error: error.message,
    });
  }

  return res
    .status(500)
    .json({ message: error.message || "Internal server error" });
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      message: "User list retrieved successfully",
      users,
    });
  } catch (error) {
    handleError(res, error, "User list is currently unavailable");
  }
}

export async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);
    res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error) {
    handleError(res, error, "User does not exist");
  }
}

export async function updateUser(req: Request, res: Response) {
  const user = req.body;

  try {
    const updatedUser = await modifyUser(user);
    res.status(202).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    handleError(res, error, "User does not exist");
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    await removeUser(userId);
    res.status(202).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    handleError(res, error, "User does not exist");
  }
}

export default { getAllUsers, getUserById, updateUser, deleteUser };

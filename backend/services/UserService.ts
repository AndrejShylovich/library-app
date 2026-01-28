import bcrypt from "bcrypt";
import { config } from "../config";
import UserDao, { IUserModel } from "../daos/UserDao";
import { IUser } from "../models/User";
import {
  UnableToSaveUserError,
  InvalidUsernameOrPasswordError,
  UserDoesNotExistError,
  EmailAlreadyExistsError,
} from "../utils/LibraryErrors";

const SALT_ROUNDS = config.server.rounds;

export async function register(user: IUser): Promise<IUserModel> {
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const createdUser = await UserDao.create({
      ...user,
      password: hashedPassword,
    });
    return createdUser;
  } catch (e: any) {
    throw new UnableToSaveUserError(e.message);
  }
}

export async function findUserByEmail(
  email: string,
): Promise<IUserModel | null> {
  return UserDao.findOne({ email });
}

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<IUserModel> {
  const { email, password } = credentials;

  const user = await UserDao.findOne({ email });

  if (!user) {
    throw new InvalidUsernameOrPasswordError("Invalid username or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new InvalidUsernameOrPasswordError("Invalid username or password");
  }

  return user;
}

export async function findAllUsers(): Promise<IUserModel[]> {
  const users = await UserDao.find().lean();
  return users;
}

export async function findUserById(userId: string): Promise<IUserModel> {
  const user = await UserDao.findById(userId);

  if (!user) {
    throw new UserDoesNotExistError("User with the specified id was not found");
  }

  return user;
}

export async function modifyUser(user: IUserModel): Promise<IUserModel> {
  try {
    const updated = await UserDao.findByIdAndUpdate(user._id, user, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updated) {
      throw new UserDoesNotExistError(
        "User with the specified id was not found",
      );
    }

    return updated;
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new EmailAlreadyExistsError(
        "A user with this email already exists",
      );
    }

    throw new UnableToSaveUserError(error.message);
  }
}

export async function removeUser(userId: string): Promise<string> {
  const deleted = await UserDao.findByIdAndDelete(userId);

  if (!deleted) {
    throw new UserDoesNotExistError("User with the specified id was not found");
  }

  return "User successfully deleted";
}

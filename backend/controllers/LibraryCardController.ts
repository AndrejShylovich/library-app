import { Request, Response } from "express";
import {
  findLibraryCard,
  registerLibraryCard,
} from "../services/LibraryCardService";
import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistError } from "../utils/LibraryErrors";

function handleError(res: Response, error: any, notFoundMessage: string) {
  if (error instanceof LibraryCardDoesNotExistError) {
    return res.status(404).json({ message: notFoundMessage, error: error.message });
  }

  return res.status(500).json({ message: error.message || "Internal server error" });
}

export async function getLibraryCard(req: Request, res: Response) {
  const { cardId } = req.params;

  try {
    const libraryCard = await findLibraryCard(cardId);
    res.status(200).json({ message: "Retrieved the user's library card", libraryCard });
  } catch (error) {
    handleError(res, error, "The specified library card does not exist");
  }
}

export async function createLibraryCard(req: Request, res: Response) {
  const card: ILibraryCard = req.body;

  try {
    const libraryCard = await registerLibraryCard(card);
    res.status(201).json({ message: "Library card generated for user", libraryCard });
  } catch (error) {
    handleError(res, error, "Unable to create the library card at this time");
  }
}

export default { getLibraryCard, createLibraryCard };

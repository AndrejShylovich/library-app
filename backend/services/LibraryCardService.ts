import LibraryCardDao, { ILibraryCardModel } from "../daos/LibraryCardDao";
import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistError } from "../utils/LibraryErrors";

export async function registerLibraryCard(
  card: ILibraryCard,
): Promise<ILibraryCardModel> {
  const savedCard = await LibraryCardDao.findOneAndUpdate(
    { user: card.user },
    { $setOnInsert: card },
    {
      new: true,
      upsert: true,
    },
  ).populate("user");

  return savedCard as ILibraryCardModel;
}

export async function findLibraryCard(
  libraryCardId: string,
): Promise<ILibraryCardModel> {
  const card = await LibraryCardDao.findById(libraryCardId).populate("user");

  if (!card) {
    throw new LibraryCardDoesNotExistError(
      "The specified library card does not exist",
    );
  }

  return card;
}

import LibraryCardDao, { ILibraryCardModel } from '../daos/LibraryCardDao';
import { ILibraryCard } from '../models/LibraryCard';
import { LibraryCardDoesNotExistError } from '../utils/LibraryErrors';

export async function registerLibraryCard(
  card: ILibraryCard
): Promise<ILibraryCardModel> {
  try {
    const savedCard = await LibraryCardDao.findOneAndUpdate(
      { user: card.user },
      { $setOnInsert: card },
      {
        new: true,
        upsert: true,
      }
    ).populate('user');

    return savedCard as ILibraryCardModel;
  } catch (error) {
    throw error;
  }
}

export async function findLibraryCard(
  libraryCardId: string
): Promise<ILibraryCardModel> {
  try {
    const card = await LibraryCardDao
      .findById(libraryCardId)
      .populate('user');

    if (!card) {
      throw new LibraryCardDoesNotExistError(
        'The library card specified does not exist'
      );
    }

    return card;
  } catch (error) {
    throw error;
  }
}

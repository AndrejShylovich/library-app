import BookDao, { IBookModel } from "../daos/BookDao";
import { IBook } from "../models/Book";
import { IPagination } from "../models/Pagination";
import { BookDoesNotExistError } from "../utils/LibraryErrors";

export async function findAllBooks(): Promise<IBookModel[]> {
  try {
    const books = await BookDao.find().lean();
    return books;
  } catch {
    return [];
  }
}

export async function findBookById(id: string): Promise<IBookModel> {
  const book = await BookDao.findById(id);
  if (!book) {
    throw new BookDoesNotExistError("The specified book does not exist");
  }
  return book;
}

export async function registerBook(book: IBook): Promise<IBookModel> {
  const createdBook = await BookDao.create(book);
  return createdBook;
}

export async function modifyBook(book: IBookModel): Promise<IBookModel> {
  const updated = await BookDao.findOneAndUpdate(
    { barcode: book.barcode },
    book,
    { new: true },
  );

  if (!updated) {
    throw new BookDoesNotExistError("Book not found");
  }

  return updated;
}

export async function removeBook(barcode: string): Promise<string> {
  const deleted = await BookDao.findOneAndDelete({ barcode });

  if (!deleted) {
    throw new BookDoesNotExistError(
      "The book you are trying to delete was not found",
    );
  }

  return "Book successfully deleted";
}

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRegexFilter(value?: string | string[]) {
  if (!value) return undefined;

  const val = Array.isArray(value) ? value[0] : value;

  return { $regex: escapeRegex(val.trim()), $options: "i" };
}

export async function queryBooks(
  page: number,
  limit: number,
  filters: {
    title?: string;
    barcode?: string;
    description?: string | string[];
    authors?: string;
    subjects?: string;
    genre?: string;

    publicationDateFrom?: Date;
    publicationDateTo?: Date;

    ratingMin?: number;
    ratingMax?: number;

    sort?: string;
  },
): Promise<IPagination<IBookModel>> {

  const match: any = {};

  if (filters.barcode) match.barcode = buildRegexFilter(filters.barcode);
  if (filters.title) match.title = buildRegexFilter(filters.title);
  if (filters.description)
    match.description = buildRegexFilter(filters.description);
  if (filters.genre) match.genre = buildRegexFilter(filters.genre);

  if (filters.authors)
    match.authors = { $elemMatch: buildRegexFilter(filters.authors) };

  if (filters.subjects)
    match.subjects = { $elemMatch: buildRegexFilter(filters.subjects) };

  if (filters.publicationDateFrom || filters.publicationDateTo) {
    match.publicationDate = {};

    if (filters.publicationDateFrom) {
      match.publicationDate.$gte = filters.publicationDateFrom;
    }

    if (filters.publicationDateTo) {
      match.publicationDate.$lte = filters.publicationDateTo;
    }
  }

  if (filters.ratingMin !== undefined || filters.ratingMax !== undefined) {
    match.rating = {};

    if (filters.ratingMin !== undefined) {
      match.rating.$gte = filters.ratingMin;
    }

    if (filters.ratingMax !== undefined) {
      match.rating.$lte = filters.ratingMax;
    }
  }

  const sortMap: Record<string, any> = {
    date_asc: { publicationDate: 1 },
    date_desc: { publicationDate: -1 },
    rating_asc: { rating: 1 },
    rating_desc: { rating: -1 },
  };

  const sortStage = sortMap[filters.sort || ""] || { publicationDate: -1 };

  const skip = (page - 1) * limit;

  const result = await BookDao.aggregate([
    { $match: match },

    { $sort: sortStage },

    {
      $facet: {
        items: [
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [
          { $count: "count" },
        ],
      },
    },
  ]);

  const items = result[0]?.items || [];
  const totalCount = result[0]?.totalCount[0]?.count || 0;

  return {
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    limit,
    pageCount: items.length,
    items,
  };
}


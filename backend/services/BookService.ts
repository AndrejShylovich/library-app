import BookDao, { IBookModel } from "../daos/BookDao";
import { IBook } from "../models/Book";
import { IPagination } from "../models/Pagination";
import { BookDoesNotExistError } from "../utils/LibraryErrors";

// --- CRUD Operations ---

export async function findAllBooks(): Promise<IBookModel[]> {
  try {
    const books = await BookDao.find().lean();
    return books;
  } catch (err) {
    return [];
  }
}

export async function findBookById(id: string): Promise<IBookModel> {
  const book = await BookDao.findById(id);
  if (!book) {
    throw new BookDoesNotExistError("Указанная книга не существует");
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
    { new: true }
  );
  if (!updated) {
    throw new BookDoesNotExistError("Книга не найдена");
  }
  return updated;
}

export async function removeBook(barcode: string): Promise<string> {
  const deleted = await BookDao.findOneAndDelete({ barcode });
  if (!deleted) {
    throw new BookDoesNotExistError(
      "Книга, которую вы пытаетесь удалить, не найдена"
    );
  }
  return "Книга успешно удалена";
}

// --- Utility ---

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRegexFilter(value?: string | string[]) {
  if (!value) return undefined;
  const val = Array.isArray(value) ? value[0] : value;
  return { $regex: escapeRegex(val.trim()), $options: "i" };
}

// --- Query with Pagination ---

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
  }
): Promise<IPagination<IBookModel>> {
  const query: any = {};

  if (filters.barcode) query.barcode = buildRegexFilter(filters.barcode);
  if (filters.title) query.title = buildRegexFilter(filters.title);
  if (filters.description) query.description = buildRegexFilter(filters.description);
  if (filters.genre) query.genre = buildRegexFilter(filters.genre);
  if (filters.authors) query.authors = { $elemMatch: buildRegexFilter(filters.authors) };
  if (filters.subjects) query.subjects = { $elemMatch: buildRegexFilter(filters.subjects) };

  const skip = (page - 1) * limit;
  const [items, totalCount] = await Promise.all([
    BookDao.find(query).skip(skip).limit(limit),
    BookDao.countDocuments(query),
  ]);

  return {
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    limit,
    pageCount: items.length,
    items,
  };
}

import { Request, Response } from "express";
import {
  findAllBooks,
  modifyBook,
  queryBooks,
  registerBook,
  removeBook,
} from "../services/BookService";
import { BookDoesNotExistError } from "../utils/LibraryErrors";

function handleError(res: Response, error: any, notFoundMessage: string) {
  if (error instanceof BookDoesNotExistError) {
    return res
      .status(404)
      .json({ message: notFoundMessage, error: error.message });
  }

  return res
    .status(500)
    .json({ message: error.message || "Internal server error" });
}

export async function getAllBooks(req: Request, res: Response) {
  try {
    const books = await findAllBooks();
    res
      .status(200)
      .json({ message: "Получены все книги", count: books.length, books });
  } catch (error) {
    handleError(res, error, "Список книг недоступен в данный момент");
  }
}

export async function createBook(req: Request, res: Response) {
  const book = req.body;

  try {
    const savedBook = await registerBook(book);
    res.status(201).json({ message: "Книга создана успешно", book: savedBook });
  } catch (error) {
    handleError(res, error, "Нет возможности сейчас добавить в БД новую книгу");
  }
}

export async function updateBook(req: Request, res: Response) {
  const book = req.body;

  try {
    const updatedBook = await modifyBook(book);
    res
      .status(202)
      .json({ message: "Книга обновлена успешно", book: updatedBook });
  } catch (error) {
    handleError(res, error, "Запрашиваемая книга не найдена");
  }
}

export async function deleteBook(req: Request, res: Response) {
  const { barcode } = req.params;

  try {
    const message = await removeBook(barcode);
    res.status(202).json({ message });
  } catch (error) {
    handleError(res, error, "Запрашиваемая книга для удаления не найдена");
  }
}

export async function searchForBooksByQuery(req: Request, res: Response) {
  const {
    title,
    barcode,
    authors,
    description,
    subjects,
    genre,
    page = "1",
    limit = "25",
  } = req.query;

  try {
    const books = await queryBooks(Number(page), Number(limit), {
      title: title as string,
      barcode: barcode as string,
      description: description as string,
      authors: authors as string,
      subjects: subjects as string,
      genre: genre as string,
    });

    res.status(200).json({ message: "Retrieved books by query", page: books });
  } catch (error) {
    handleError(res, error, "Unable to retrieve books by query");
  }
}

export default {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  searchForBooksByQuery,
};

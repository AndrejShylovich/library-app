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
    res.status(200).json({
      message: "All books retrieved successfully",
      count: books.length,
      books,
    });
  } catch (error) {
    handleError(res, error, "The list of books is currently unavailable");
  }
}

export async function createBook(req: Request, res: Response) {
  const book = req.body;

  try {
    const savedBook = await registerBook(book);
    res.status(201).json({
      message: "Book successfully created",
      book: savedBook,
    });
  } catch (error) {
    handleError(res, error, "Unable to add a new book to the database at this time");
  }
}

export async function updateBook(req: Request, res: Response) {
  const book = req.body;

  try {
    const updatedBook = await modifyBook(book);
    res.status(202).json({
      message: "Book successfully updated",
      book: updatedBook,
    });
  } catch (error) {
    handleError(res, error, "The requested book was not found");
  }
}

export async function deleteBook(req: Request, res: Response) {
  const { barcode } = req.params;

  try {
    const message = await removeBook(barcode);
    res.status(202).json({ message });
  } catch (error) {
    handleError(res, error, "The requested book for deletion was not found");
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

    res.status(200).json({
      message: "Books retrieved by query",
      page: books,
    });
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

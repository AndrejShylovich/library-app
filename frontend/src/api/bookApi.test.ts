import { describe, it, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchAllBooksApi,
  queryBooksApi,
  checkoutBookApi,
  loadBookByBarcodeApi,
} from "./bookApi";
import type { Book, CheckoutBookPayload } from "../models/Book";
import type { User } from "../models/User";

const VITE_API_URL = "http://localhost:8000";

describe("Books API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it("fetchAllBooksApi should return array of books", async () => {
    const fakeBooks = [
      {
        _id: "1",
        barcode: "123",
        cover: "",
        title: "Book1",
        authors: [],
        description: "",
        subjects: [],
        publicationDate: new Date(),
        publisher: "",
        pages: 100,
        genre: "Fiction",
        records: [],
      },
    ];

    mock.onGet(`${VITE_API_URL}/book/`).reply(200, { books: fakeBooks });

    const books = await fetchAllBooksApi();
    const booksWithDate = books.map((b) => ({
      ...b,
      publicationDate: new Date(b.publicationDate),
    }));

    expect(booksWithDate).toEqual(fakeBooks);
  });

  it("queryBooksApi should return page", async () => {
    const fakePage = { items: [{ _id: "1" }] };
    mock
      .onGet(`${VITE_API_URL}/book/query?title=test`)
      .reply(200, { page: fakePage });

    const page = await queryBooksApi("?title=test");
    expect(page).toEqual(fakePage);
  });

  it("checkoutBookApi should create a loan record", async () => {
    const fakeBook: Book = {
      _id: "1",
      barcode: "123",
      cover: "",
      title: "Book1",
      authors: [],
      description: "",
      subjects: [],
      publicationDate: new Date(),
      publisher: "",
      pages: 100,
      genre: "Fiction",
      records: [],
    };

    const fakeUser: User = {
      _id: "emp1",
      type: "EMPLOYEE",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "123",
    };

    const fakeLibraryCard = "card1";
    const patronId = "patron1";

    mock.onGet(`${VITE_API_URL}/card/${fakeLibraryCard}`).reply(200, {
      libraryCard: { user: { _id: patronId } },
    });

    mock.onPost(`${VITE_API_URL}/loan`).reply(200, {
      record: { _id: "loan1", patron: patronId, item: fakeBook._id },
    });

    const payload: CheckoutBookPayload = {
      book: fakeBook,
      libraryCard: fakeLibraryCard,
      employee: fakeUser,
    };

    const record = await checkoutBookApi(payload);

    expect(record).toHaveProperty("_id", "loan1");
    expect(record).toHaveProperty("patron", patronId);
    expect(record).toHaveProperty("item", fakeBook._id);
  });

  it("loadBookByBarcodeApi should return the correct book", async () => {
    const barcode = "123456";
    const fakeBook = { _id: "1", barcode };

    mock.onGet(`${VITE_API_URL}/book/query?barcode=${barcode}`).reply(200, {
      page: { items: [fakeBook] },
    });

    const book = await loadBookByBarcodeApi(barcode);
    expect(book).toEqual(fakeBook);
  });

  it("loadBookByBarcodeApi should throw error if book not found", async () => {
    const barcode = "999";

    mock.onGet(`${VITE_API_URL}/book/query?barcode=${barcode}`).reply(200, {
      page: { items: [] },
    });

    await expect(loadBookByBarcodeApi(barcode)).rejects.toThrow(
      "Book not found",
    );
  });
});

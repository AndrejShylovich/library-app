import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookCarousel } from "./BookCarousel";
import type { Book } from "../../../../models/Book";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import authentificationReducer from "../../../../store/slices/AuthentificationSlice";
import type { JSX } from "react";

// Тестовый стор
const store = configureStore({
  reducer: {
    authentification: authentificationReducer,
  },
});

// Моковые данные книг
const books: Book[] = [
  {
    _id: "1",
    barcode: "1",
    cover: "/covers/book1.jpg",
    title: "Book 1",
    authors: ["Author 1"],
    description: "Description 1",
    subjects: ["Subject 1"],
    publicationDate: new Date("2020-01-01"),
    publisher: "Publisher 1",
    pages: 100,
    genre: "Genre 1",
    records: [],
  },
  {
    _id: "2",
    barcode: "2",
    cover: "/covers/book2.jpg",
    title: "Book 2",
    authors: ["Author 2"],
    description: "Description 2",
    subjects: ["Subject 2"],
    publicationDate: new Date("2021-02-02"),
    publisher: "Publisher 2",
    pages: 200,
    genre: "Genre 2",
    records: [],
  },
  {
    _id: "3",
    barcode: "3",
    cover: "/covers/book3.jpg",
    title: "Book 3",
    authors: ["Author 3"],
    description: "Description 3",
    subjects: ["Subject 3"],
    publicationDate: new Date("2022-03-03"),
    publisher: "Publisher 3",
    pages: 300,
    genre: "Genre 3",
    records: [],
  },
];

// Вспомогательная функция рендера с Provider и Router
const renderWithProviders = (ui: JSX.Element) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("BookCarousel", () => {
  it("должен показывать сообщение, если книг нет", () => {
    renderWithProviders(<BookCarousel books={[]} />);
    expect(screen.getByText("Нет доступных книг")).toBeInTheDocument();
  });

  it("должен отображать первую книгу по умолчанию", () => {
    renderWithProviders(<BookCarousel books={books} />);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
  });

  it("должен листать книги вправо и влево", () => {
    renderWithProviders(<BookCarousel books={books} />);

    const leftButton = screen.getByLabelText("Листать влево");
    const rightButton = screen.getByLabelText("Листать вправо");

    expect(screen.getByText("Book 1")).toBeInTheDocument();

    fireEvent.click(leftButton);
    expect(screen.getByText("Book 2")).toBeInTheDocument();

    fireEvent.click(rightButton);
    expect(screen.getByText("Book 1")).toBeInTheDocument();

    fireEvent.click(rightButton);
    expect(screen.getByText("Book 3")).toBeInTheDocument();
  });

  it("должен сбрасывать индекс при изменении массива книг", () => {
    const { rerender } = renderWithProviders(<BookCarousel books={books} />);

    fireEvent.click(screen.getByLabelText("Листать влево"));
    expect(screen.getByText("Book 2")).toBeInTheDocument();

    const newBooks: Book[] = [
      {
        _id: "4",
        barcode: "4",
        cover: "/covers/book4.jpg",
        title: "Book 4",
        authors: ["Author 4"],
        description: "Description 4",
        subjects: ["Subject 4"],
        publicationDate: new Date("2023-04-04"),
        publisher: "Publisher 4",
        pages: 400,
        genre: "Genre 4",
        records: [],
      },
    ];
    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <BookCarousel books={newBooks} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Book 4")).toBeInTheDocument();
  });
});

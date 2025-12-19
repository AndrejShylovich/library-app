import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookAdditionalInfo } from "./BookAdditionalInfo";
import type { Book } from "../../../../models/Book";

const mockBook: Book = {
  _id: "1",
  title: "Test Book",
  publisher: "Test Publisher",
  publicationDate: new Date("2023-08-01T00:00:00.000Z"),
  barcode: "1234567890123",
  pages: 250,
  cover: "test-cover.jpg",
  authors: ["Author One", "Author Two"],
  description: "A test description",
  subjects: ["Fiction", "Adventure"],
  genre: "Adventure",          // добавлено
  records: [],                 // добавлено, например пустой массив
};

describe("BookAdditionalInfo", () => {
  it("renders the book title in the header", () => {
    render(<BookAdditionalInfo book={mockBook} />);
    expect(
      screen.getByText(/Additional Information about: Test Book/i)
    ).toBeInTheDocument();
  });

  it("renders all info items correctly", () => {
    render(<BookAdditionalInfo book={mockBook} />);

    // Проверяем издателя
    expect(screen.getByText(/Published By:/i)).toBeInTheDocument();
    expect(screen.getByText(mockBook.publisher)).toBeInTheDocument();

    // Проверяем дату публикации (отформатированную)
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(mockBook.publicationDate));
    expect(screen.getByText(/Published On:/i)).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();

    // Проверяем ISBN
    expect(screen.getByText(/ISBN:/i)).toBeInTheDocument();
    expect(screen.getByText(mockBook.barcode)).toBeInTheDocument();

    // Проверяем количество страниц
    expect(screen.getByText(/Number of Pages:/i)).toBeInTheDocument();
    expect(screen.getByText(mockBook.pages.toString())).toBeInTheDocument();
  });

  it("renders the correct number of InfoGroup items", () => {
    render(<BookAdditionalInfo book={mockBook} />);
    const groups = document.querySelectorAll(".additional-book-info-group");
    expect(groups.length).toBe(4); // теперь корректно
  });
});

import type { DomainBook } from "../../../entities/book/model/domain/Book";
import type { PageInfo } from "../../types/PageDto";

const GENRES = [
  "Non-Fiction",
  "Childrens",
  "Fantasy",
  "Fiction",
  "Biography",
  "Romance",
  "Science Fiction",
  "Young Adult",
] as const;

export function generateRandomGenres(): string[] {
  
  return [...GENRES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

export function getRandomBooksByGenre(
  genre: string,
  books: DomainBook[],
): DomainBook[] {
  const filteredBooks = books.filter(
    (book) => book.genre === genre,
  );

  if (filteredBooks.length <= 10) {
    return filteredBooks;
  }

  const randomBooks: DomainBook[] = [];
  const usedIndexes = new Set<number>();

  while (randomBooks.length < 10) {
    const index = Math.floor(
      Math.random() * filteredBooks.length,
    );

    if (!usedIndexes.has(index)) {
      randomBooks.push(filteredBooks[index]);
      usedIndexes.add(index);
    }
  }

  return randomBooks;
}

export function calculatePaging(
  pageInfo: PageInfo,
): string[] {
  const pages: string[] = [];

  if (!pageInfo) {
    return pages;
  }

  const {
    totalPages: total,
    currentPage: current,
  } = pageInfo;

  if (total <= 10) {
    for (let i = 1; i <= total; i++) {
      pages.push(`${i}`);
    }
  } else if (current <= 7) {
    for (let i = 1; i <= 8; i++) {
      pages.push(`${i}`);
    }

    pages.push("...");
    pages.push(`${total - 1}`, `${total}`);
  } else if (total - current > 5) {
    pages.push("1", "2", "...");

    for (let i = current; i <= current + 4; i++) {
      pages.push(`${i}`);
    }

    pages.push("...");
    pages.push(`${total - 1}`, `${total}`);
  } else {
    pages.push("1", "2", "...");

    for (let i = total - 5; i <= total; i++) {
      pages.push(`${i}`);
    }
  }

  return pages;
}
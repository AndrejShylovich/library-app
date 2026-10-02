import type { DomainBook } from "@/entities/book/model/domain/Book";
import type { PageInfo } from "@/shared/types/PageDto";

const GENRES = [
  "Non-Fiction",
  "Children's literature",
  "Fantasy",
  "Fiction",
  "Biography",
  "Romance",
  "Science Fiction",
  "Young Adult",
] as const;

type PageItem =
  | { type: "page"; value: number }
  | { type: "ellipsis" };

export function generateRandomGenres(): string[] {
  return [...GENRES].sort(() => Math.random() - 0.5).slice(0, 3);
}

export function getRandomBooksByGenre(
  genre: string,
  books: DomainBook[],
): DomainBook[] {
  const filteredBooks = books.filter((book) => book.genre === genre);

  if (filteredBooks.length <= 10) {
    return filteredBooks;
  }

  const randomBooks: DomainBook[] = [];
  const usedIndexes = new Set<number>();

  while (randomBooks.length < 10) {
    const index = Math.floor(Math.random() * filteredBooks.length);

    if (!usedIndexes.has(index)) {
      randomBooks.push(filteredBooks[index]);
      usedIndexes.add(index);
    }
  }

  return randomBooks;
}

export function calculatePaging(pageInfo: PageInfo): PageItem[] {
  const pages: PageItem[] = [];

  const { totalPages: total, currentPage: current } = pageInfo;

  const addPage = (page: number) => {
    pages.push({
      type: "page",
      value: page,
    });
  };

  const addEllipsis = () => {
    pages.push({
      type: "ellipsis",
    });
  };

  if (total <= 10) {
    for (let i = 1; i <= total; i++) {
      addPage(i);
    }
  } else if (current <= 7) {
    for (let i = 1; i <= 8; i++) {
      addPage(i);
    }

    addEllipsis();
    addPage(total - 1);
    addPage(total);
  } else if (total - current > 5) {
    addPage(1);
    addPage(2);
    addEllipsis();

    for (let i = current; i <= current + 4; i++) {
      addPage(i);
    }

    addEllipsis();
    addPage(total - 1);
    addPage(total);
  } else {
    addPage(1);
    addPage(2);
    addEllipsis();

    for (let i = total - 5; i <= total; i++) {
      addPage(i);
    }
  }

  return pages;
}

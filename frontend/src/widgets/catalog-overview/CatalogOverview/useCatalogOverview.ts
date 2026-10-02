import { useMemo } from "react";

import { useBooks } from "@/entities/book/model/hooks/useBooks";

import {
  generateRandomGenres,
  getRandomBooksByGenre,
} from "@/shared/lib/utils/catalog.utils";

export const useCatalogOverview = () => {
  const { books, isLoading: loading } = useBooks();

  const genres = useMemo(() => generateRandomGenres(), []);

  const booksByGenre = useMemo(
    () =>
      Object.fromEntries(
        genres.map((genre) => [genre, getRandomBooksByGenre(genre, books)]),
      ),
    [genres, books],
  );

  return {
    loading,
    books,
    genres,
    booksByGenre,
  };
};

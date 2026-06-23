import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import { useEffect, useMemo } from "react";
import { fetchAllBooks } from "../../../entities/book/model/bookSlice";
import type { DomainBook } from "../../../entities/book/model/domain/Book";
import { BookMapper } from "../../../entities/book/model/mapper/BookMapper";
import {
  generateRandomGenres,
  getRandomBooksByGenre,
} from "../../../shared/lib/utils/catalog.utils";

export const useCatalogOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books: bookDtos, loading } = useSelector(
    (state: RootState) => state.book,
  );

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const books = useMemo<DomainBook[]>(
    () => bookDtos.map(BookMapper.toDomain),
    [bookDtos],
  );

  const genres = useMemo(() => generateRandomGenres(), []);

  const booksByGenre = useMemo(
    () =>
      genres.reduce<Record<string, typeof books>>((acc, genre) => {
        acc[genre] = getRandomBooksByGenre(genre, books);
        return acc;
      }, {}),
    [books, genres],
  );

  return {
    loading,
    books,
    genres,
    booksByGenre,
  };
};

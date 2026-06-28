import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import type {
  AppDispatch,
  RootState,
} from "@/shared/store/ReduxStore";

import { fetchAllBooks } from "@/entities/book/model/bookSlice";
import { BookMapper } from "@/entities/book/model/mapper/BookMapper";

import {
  generateRandomGenres,
  getRandomBooksByGenre,
} from "@/shared/lib/utils/catalog.utils";

export const useCatalogOverview = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { books: bookDtos, loading } = useSelector(
    (state: RootState) => state.book,
  );

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const books = useMemo(
    () => bookDtos.map(BookMapper.toDomain),
    [bookDtos],
  );

  const genres = useMemo(
    () => generateRandomGenres(),
    [],
  );

  const booksByGenre = useMemo(
    () =>
      Object.fromEntries(
        genres.map((genre) => [
          genre,
          getRandomBooksByGenre(genre, books),
        ]),
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
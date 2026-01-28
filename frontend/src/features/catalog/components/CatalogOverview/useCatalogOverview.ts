import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { fetchAllBooks } from "../../../../store/slices/BookSlice";
import {
  generateRandomGenres,
  getRandomBooksByGenre,
} from "../../utils/catalog.utils";

export const useCatalogOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

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

import { useDispatch, useSelector } from "react-redux";
import "./CatalogOverview.css";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { useEffect, useMemo } from "react";
import { fetchAllBooks } from "../../../../store/slices/BookSlice";
import { generateRandomGenres, getRandomBooksByGenre } from "../../utils/CatalogUtils";
import { CatalogOverviewSection } from "../CatalogOverviewSection/CatalogOverviewSection";

export const CatalogOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading } = useSelector((state: RootState) => state.book);

  // Generate random genres once when the component mounts
  const genres = useMemo(() => generateRandomGenres(), []);

  // Fetch all books on mount
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  if (loading || books.length === 0) return null;

  return (
    <div className="catalog-overview">
      <h2>Welcome to our library, we have {books.length} books</h2>
      <h4>Choose a book from the suggestions below or use the search bar</h4>

      {genres.map((genre) => (
        <CatalogOverviewSection
          key={genre}
          books={getRandomBooksByGenre(genre, books)}
          label={genre}
        />
      ))}
    </div>
  );
};

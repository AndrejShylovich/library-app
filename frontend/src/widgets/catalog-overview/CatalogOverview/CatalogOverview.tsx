import { CatalogOverviewSection } from "../CatalogOverviewSection/CatalogOverviewSection";
import { useCatalogOverview } from "./useCatalogOverview";

import "./CatalogOverview.css";

export const CatalogOverview: React.FC = () => {
  const { loading, books, genres, booksByGenre } = useCatalogOverview();

  const hasBooks = books.length > 0;

  if (loading || !hasBooks) {
    return null;
  }

  return (
    <div className="catalog-overview">
      <h2>Welcome to our library, we have {books.length} books</h2>
      <h4>
        Choose a book from the suggestions below or use the search bar
      </h4>

      {genres.map((genre) => (
        <CatalogOverviewSection
          key={genre}
          label={genre}
          books={booksByGenre[genre]}
        />
      ))}
    </div>
  );
};
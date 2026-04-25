import React from "react";
import { CatalogOverviewSection } from "../CatalogOverviewSection/CatalogOverviewSection";
import "./CatalogOverview.css";
import { useCatalogOverview } from "./useCatalogOverview";

export const CatalogOverview: React.FC = () => {
  const { loading, books, genres, booksByGenre } = useCatalogOverview();

  if (loading || books.length === 0) return null;

  return (
    <div className="catalog-overview">
      <h2>Welcome to our library, we have {books.length} books</h2>
      <h4>Choose a book from the suggestions below or use the search bar</h4>

      {genres.map((genre) => (
        <CatalogOverviewSection
          key={genre}
          books={booksByGenre[genre]}
          label={genre}
        />
      ))}
    </div>
  );
};

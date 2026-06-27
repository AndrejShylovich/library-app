import { useMemo } from "react";

import { CatalogAdvancedSearch } from "../../../features/catalog/CatalogAdvancedSearch/CatalogAdvancedSearch";
import { CatalogSearchPageNavigation } from "../../../features/catalog/CatalogSearchPageNavigation/CatalogSearchPageNavigation";

import { useCatalogSearch } from "./useCatalogSearch";

import { BookMapper } from "../../../entities/book/model/mapper/BookMapper";
import { BookCard } from "../../../entities/book/ui/BookCard/BookCard";

import "./CatalogSearch.css";

export const CatalogSearch: React.FC = () => {
  const { books: bookDtos, loading, pagingInformation } = useCatalogSearch();

  const books = useMemo(
    () => bookDtos.map(BookMapper.toDomain),
    [bookDtos],
  );

  if (loading) {
    return <div className="catalog-search">Loading...</div>;
  }

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-search-section">
        <CatalogAdvancedSearch />
      </div>

      <h2>
        Displaying {pagingInformation?.pageCount ?? 0} books out of{" "}
        {pagingInformation?.totalCount ?? 0}
      </h2>

      <div className="catalog-search-item-area">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="catalog-search-pages">
        <CatalogSearchPageNavigation />
      </div>
    </div>
  );
};
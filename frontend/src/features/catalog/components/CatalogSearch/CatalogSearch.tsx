import React from "react";
import { BookCard } from "../../../book/components";
import { CatalogAdvancedSearch } from "../CatalogAdvancedSearch/CatalogAdvancedSearch";
import { CatalogSearchPageNavigation } from "../CatalogSearchPageNavigation/CatalogSearchPageNavigation";
import "./CatalogSearch.css";
import { useCatalogSearch } from "./useCatalogSearch";
import { BookMapper } from "../../../../models/mapper/BookMapper";

export const CatalogSearch: React.FC = () => {
  const { books, loading, pagingInformation } = useCatalogSearch();

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-search-section">
        <CatalogAdvancedSearch />
      </div>

      {!loading && (
        <>
          <h2>
            Displaying {pagingInformation?.pageCount || 0} books out of{" "}
            {pagingInformation?.totalCount || 0}
          </h2>

          <div className="catalog-search-item-area">
            {books.map((bookDto) => {
              const book = BookMapper.toDomain(bookDto);
              return <BookCard key={book.id} book={book} />;
            })}
          </div>

          <div className="catalog-search-pages">
            <CatalogSearchPageNavigation />
          </div>
        </>
      )}
    </div>
  );
};

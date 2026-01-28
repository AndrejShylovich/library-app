import React from "react";
import "./CatalogSearchPageNavigation.css";
import { useCatalogSearchPagination } from "./useCatalogSearchPagination";

export const CatalogSearchPageNavigation: React.FC = () => {
  const pagination = useCatalogSearchPagination();

  if (!pagination) return null;

  const {
    currentPage,
    totalPages,
    pageNumbers,
    navigatePrevious,
    navigateNext,
    navigateToNumber,
  } = pagination;

  return (
    <div className="catalog-search-page-navigator">
      <p
        className={`catalog-search-page-navigator-navigate ${
          currentPage === 1 ? "disabled" : ""
        }`}
        onClick={navigatePrevious}
      >
        Prev
      </p>

      <div className="catalog-search-page-numbers">
        {pageNumbers.map((num) => {
          const pageNum = parseInt(num, 10);
          const isActive = pageNum === currentPage;

          return (
            <p
              key={num}
              id={num}
              className={`catalog-search-page-number ${isActive ? "number-active" : ""}`}
              onClick={!isActive ? () => navigateToNumber(pageNum) : undefined}
            >
              {num}
            </p>
          );
        })}
      </div>

      <p
        className={`catalog-search-page-navigator-navigate ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={navigateNext}
      >
        Next
      </p>
    </div>
  );
};

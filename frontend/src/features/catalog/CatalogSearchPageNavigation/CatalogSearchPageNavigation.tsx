import { useCatalogSearchPagination } from "./useCatalogSearchPagination";
import "./CatalogSearchPageNavigation.css";
import { Button } from "@/shared/ui/Button/Button";

export const CatalogSearchPageNavigation: React.FC = () => {
  const pagination = useCatalogSearchPagination();

  if (!pagination) {
    return null;
  }

  const {
    currentPage,
    totalPages,
    pageNumbers,
    navigatePrevious,
    navigateNext,
    navigateToNumber,
  } = pagination;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="catalog-search-page-navigator">
      <Button
        className={`catalog-search-page-navigator-navigate ${
          isFirstPage ? "disabled" : ""
        }`}
        onClick={navigatePrevious}
      >
        Prev
      </Button>

      <div className="catalog-search-page-numbers">
        {pageNumbers.map((num) => {
          const pageNum = Number(num);
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={num}
              id={num}
              className={`catalog-search-page-number ${
                isActive ? "number-active" : ""
              }`}
              onClick={
                isActive
                  ? undefined
                  : () => navigateToNumber(pageNum)
              }
            >
              {num}
            </Button>
          );
        })}
      </div>

      <Button
        className={`catalog-search-page-navigator-navigate ${
          isLastPage ? "disabled" : ""
        }`}
        onClick={navigateNext}
      >
        Next
      </Button>
    </div>
  );
};
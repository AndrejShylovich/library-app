import { useCatalogSearchPagination } from "./useCatalogSearchPagination";
import "./CatalogSearchPageNavigation.css";
import { Button } from "@/shared/ui/Button/Button";
import { useLocation } from "react-router-dom";

export const CatalogSearchPageNavigation: React.FC = () => {
  const { search } = useLocation();
  const pagination = useCatalogSearchPagination(search);

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
        {pageNumbers.map((item, index) => {
          if (item.type === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="catalog-search-page-ellipsis"
              >
                ...
              </span>
            );
          }

          const isActive = item.value === currentPage;

          return (
            <Button
              key={item.value}
              className={`catalog-search-page-number ${
                isActive ? "number-active" : ""
              }`}
              onClick={
                isActive ? undefined : () => navigateToNumber(item.value)
              }
            >
              {item.value}
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

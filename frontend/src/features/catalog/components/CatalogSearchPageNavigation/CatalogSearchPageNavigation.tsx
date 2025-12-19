import { useSelector } from "react-redux";
import "./CatalogSearchPageNavigation.css";
import type { RootState } from "../../../../store/ReduxStore";
import { useLocation, useNavigate } from "react-router-dom";
import { calculatePaging } from "../../utils/CatalogUtils";

export const CatalogSearchPageNavigation: React.FC = () => {
  const { pagingInformation } = useSelector((state: RootState) => state.book);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  if (!pagingInformation || pagingInformation.totalPages === 0) return null;

  const { currentPage, totalPages } = pagingInformation;

  const updatePageInQuery = (page: number) => {
    const params = new URLSearchParams(search);
    params.set("page", page.toString());
    navigate(`${pathname}?${params.toString()}`);
  };

  const navigatePrevious = () => {
    if (currentPage > 1) updatePageInQuery(currentPage - 1);
  };

  const navigateNext = () => {
    if (currentPage < totalPages) updatePageInQuery(currentPage + 1);
  };

  const navigateToNumber = (page: number) => updatePageInQuery(page);

  const pageNumbers = calculatePaging(pagingInformation);

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
              className={`catalog-search-page-number ${
                isActive ? "number-active" : ""
              }`}
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

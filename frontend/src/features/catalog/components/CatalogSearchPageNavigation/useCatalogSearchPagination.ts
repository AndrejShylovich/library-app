import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/ReduxStore";
import { calculatePaging } from "../../utils/catalog.utils";

export const useCatalogSearchPagination = () => {
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

  return {
    currentPage,
    totalPages,
    pageNumbers,
    navigatePrevious,
    navigateNext,
    navigateToNumber,
  };
};

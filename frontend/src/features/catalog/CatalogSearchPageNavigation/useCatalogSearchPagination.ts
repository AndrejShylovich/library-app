import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import type { RootState } from "../../../shared/store/ReduxStore";

import { calculatePaging } from "../../../shared/lib/utils/catalog.utils";

export const useCatalogSearchPagination = () => {
  const { pagingInformation } = useSelector(
    (state: RootState) => state.book,
  );

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  if (!pagingInformation || pagingInformation.totalPages === 0) {
    return null;
  }

  const { currentPage, totalPages } = pagingInformation;

  const updatePageInQuery = (page: number) => {
    const params = new URLSearchParams(search);

    params.set("page", String(page));

    navigate(`${pathname}?${params}`);
  };

  const navigatePrevious = () => {
    if (currentPage > 1) {
      updatePageInQuery(currentPage - 1);
    }
  };

  const navigateNext = () => {
    if (currentPage < totalPages) {
      updatePageInQuery(currentPage + 1);
    }
  };

  const pageNumbers = calculatePaging(pagingInformation);

  return {
    currentPage,
    totalPages,
    pageNumbers,
    navigatePrevious,
    navigateNext,
    navigateToNumber: updatePageInQuery,
  };
};
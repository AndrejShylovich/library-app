import { useLocation, useNavigate } from "react-router-dom";

import { calculatePaging } from "@/shared/lib/utils/catalog.utils";
import { useQueryBooks } from "@/entities/book/model/hooks/useQueryBooks";

export const useCatalogSearchPagination = (query: string) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const { page } = useQueryBooks(query);

  if (!page || page.totalPages === 0) {
    return null;
  }

  const { currentPage, totalPages } = page;

  const updatePageInQuery = (pageNumber: number) => {
    const params = new URLSearchParams(search);

    params.set("page", String(pageNumber));

    navigate(`${pathname}?${params.toString()}`);
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

  const pageNumbers = calculatePaging(page);

  return {
    currentPage,
    totalPages,
    pageNumbers,
    navigatePrevious,
    navigateNext,
    navigateToNumber: updatePageInQuery,
  };
};

import { useLocation } from "react-router-dom";
import { useMemo } from "react";

import { useQueryBooksQuery } from "@/entities/book/api/bookQueryApi";

export const useCatalogSearch = () => {
  const location = useLocation();

  const search = useMemo(() => location.search, [location.search]);

  const { data, isLoading, error } = useQueryBooksQuery(search, {
    skip: !search,
  });

  return {
    books: data?.items ?? [],
    pagingInformation: data ?? null,
    loading: isLoading,
    error,
  };
};

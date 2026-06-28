import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";

import type {
  AppDispatch,
  RootState,
} from "@/shared/store/ReduxStore";

import { queryBooks } from "@/entities/book/model/bookSlice";

export const useCatalogSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const search = useMemo(
    () => location.search,
    [location.search],
  );

  const { books, loading, pagingInformation } = useSelector(
    (state: RootState) => state.book,
  );

  useEffect(() => {
    if (!search) return;
    dispatch(queryBooks(search));
  }, [search, dispatch]);

  return {
    books,
    loading,
    pagingInformation,
  };
};
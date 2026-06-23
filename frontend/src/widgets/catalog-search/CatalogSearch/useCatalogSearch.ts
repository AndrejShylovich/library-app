import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { queryBooks } from "../../../entities/book/model/bookSlice";

export const useCatalogSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { books, loading, pagingInformation } = useSelector(
    (state: RootState) => state.book,
  );

  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [location.search, dispatch]);

  return {
    books,
    loading,
    pagingInformation,
  };
};

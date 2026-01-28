import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { queryBooks } from "../../../../store/slices/BookSlice";

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

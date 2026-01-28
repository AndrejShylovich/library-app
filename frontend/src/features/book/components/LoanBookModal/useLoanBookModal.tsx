import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";

export const useLoanBookModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentBook = useSelector((state: RootState) => state.book.currentBook);

  const closeModal = useCallback(() => {
    dispatch(setDisplayLoan(false));
  }, [dispatch]);

  return {
    currentBook,
    closeModal,
  };
};


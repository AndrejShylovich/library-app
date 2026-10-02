import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setDisplayLoan } from "@/shared/store/slices/ModalSlice";
import { useBookByBarcode } from "@/entities/book/model/hooks/useBookByBarcode";

export const useLoanBookModal = (barcode?: string) => {
  const dispatch = useDispatch();

  const { book: currentBook } = useBookByBarcode(barcode);

  const closeModal = useCallback(
    () => dispatch(setDisplayLoan(false)),
    [dispatch],
  );

  return {
    currentBook,
    closeModal,
  };
};

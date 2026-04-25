import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";
import { BookMapper } from "../../../../models/mapper/BookMapper";

export const useLoanBookModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentBookDto = useSelector(
    (state: RootState) => state.book.currentBook,
  );
  const currentBook = currentBookDto
    ? BookMapper.toDomain(currentBookDto)
    : undefined;

  const closeModal = useCallback(() => {
    dispatch(setDisplayLoan(false));
  }, [dispatch]);

  return {
    currentBook,
    closeModal,
  };
};

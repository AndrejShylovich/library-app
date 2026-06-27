import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type {
  AppDispatch,
  RootState,
} from "../../../shared/store/ReduxStore";

import { BookMapper } from "../../../entities/book/model/mapper/BookMapper";
import { setDisplayLoan } from "../../../shared/store/slices/ModalSlice";

export const useLoanBookModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentBookDto = useSelector(
    (state: RootState) => state.book.currentBook,
  );

  const currentBook = currentBookDto
    ? BookMapper.toDomain(currentBookDto)
    : undefined;

  const closeModal = useCallback(
    () => dispatch(setDisplayLoan(false)),
    [dispatch],
  );

  return {
    currentBook,
    closeModal,
  };
};
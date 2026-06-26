import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BookMapper } from "../../model/mapper/BookMapper";
import { setCurrentBook } from "../../model/bookSlice";
import { setDisplayLoan } from "../../../../shared/store/slices/ModalSlice";

import type { DomainBook } from "../../model/domain/Book";
import type {
  AppDispatch,
  RootState,
} from "../../../../shared/store/ReduxStore";
import { isBookAvailable } from "../../model/lib/isBookAvailable";



export const useBookCard = (book: DomainBook) => {
  const user = useSelector(
    (state: RootState) => state.user.loggedInUser,
  );
  const available = isBookAvailable(book);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const buttonClass = [
    "book-card-loan-button",
    available ? "available" : "unavailable",
    user?.type === "EMPLOYEE"
      ? available
        ? "checkout"
        : "checkin"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleLoan = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (user?.type !== "EMPLOYEE") {
        return;
      }

      dispatch(setCurrentBook(BookMapper.toDto(book)));
      dispatch(setDisplayLoan(true));
    },
    [book, dispatch, user],
  );

  const displayBook = useCallback(() => {
    navigate(`/resource/${book.barcode}`);
  }, [book.barcode, navigate]);

  return {
    available,
    buttonClass,
    handleLoan,
    displayBook,
  };
};
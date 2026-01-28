import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { setCurrentBook } from "../../../../store/slices/BookSlice";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../../../models/Book";

export const useBookCard = (book: Book) => {
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const available =
    book.records.length === 0 || book.records[0].status === "AVAILABLE";

  let buttonClass = "book-card-loan-button";
  buttonClass += available ? " available" : " unavailable";
  if (user?.type === "EMPLOYEE") {
    buttonClass += available ? " checkout" : " checkin";
  }

  const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (user?.type === "EMPLOYEE") {
      dispatch(setCurrentBook(book));
      dispatch(setDisplayLoan(true));
    }
  };

  const displayBook = () => navigate(`/resource/${book.barcode}`);

  return {
    available,
    buttonClass,
    handleLoan,
    displayBook,
    user,
  };
};

import { useDispatch, useSelector } from "react-redux";
import type { DomainBook } from "../../model/domain/Book";
import type {
  AppDispatch,
  RootState,
} from "../../../../shared/store/ReduxStore";
import { useNavigate } from "react-router-dom";
import { BookMapper } from "../../model/mapper/BookMapper";
import { setCurrentBook } from "../../model/bookSlice";
import { setDisplayLoan } from "../../../../shared/store/slices/ModalSlice";

export const useBookCard = (book: DomainBook) => {
  const user = useSelector(
    (state: RootState) => state.user.loggedInUser,
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
      dispatch(setCurrentBook(BookMapper.toDto(book)));
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

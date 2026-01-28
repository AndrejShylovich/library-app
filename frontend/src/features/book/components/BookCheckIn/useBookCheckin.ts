import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { checkinBook, setCurrentBook } from "../../../../store/slices/BookSlice";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";

export const useBookCheckin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);
  const book = useSelector((state: RootState) => state.book.currentBook);

  const handleCheckin = () => {
    if (book && user) {
      dispatch(checkinBook({ book, employee: user }));
      dispatch(setCurrentBook(undefined));
      dispatch(setDisplayLoan(false));
    }
  };

  return {
    user,
    book,
    handleCheckin,
  };
};

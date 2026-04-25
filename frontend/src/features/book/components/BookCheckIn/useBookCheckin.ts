import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import {
  checkinBook,
  setCurrentBook,
} from "../../../../store/slices/BookSlice";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";
import { useNavigate } from "react-router-dom";

export const useBookCheckin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser,
  );
  const book = useSelector((state: RootState) => state.book.currentBook);
  const navigate = useNavigate();

  const handleCheckin = async () => {
    if (!book || !user) {
      toast.error("Cannot check in the book: no selected book or user.");
      return;
    }

    try {
      await dispatch(checkinBook({ book, employee: user })).unwrap();

      dispatch(setCurrentBook(undefined));
      dispatch(setDisplayLoan(false));
      navigate(`/`);
      toast.success(`The book "${book.title}" has been successfully returned!`);
    } catch (error: unknown) {
      console.error("Checkin failed", error);

      if (error instanceof Error) {
        toast.error(`Error while returning the book`);
      } else {
        toast.error("Failed to return the book. Please try again.");
      }
    }
  };

  return {
    user,
    book,
    handleCheckin,
  };
};

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import { useRef } from "react";
import { toast } from "react-toastify";
import {
  checkoutBook,
  setCurrentBook,
} from "../../../entities/book/model/bookSlice";
import { setDisplayLoan } from "../../../shared/store/slices/ModalSlice";

export const useBookCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(
    (state: RootState) => state.user.loggedInUser,
  );
  const book = useSelector((state: RootState) => state.book.currentBook);

  const libraryCardRef = useRef<HTMLInputElement>(null);

  const handleCheckout = async () => {
    if (!book || !user) return;

    const libraryCard = libraryCardRef.current?.value.trim();
    if (!libraryCard) {
      toast.error("Please enter a valid library card number.");
      return;
    }

    try {
      await dispatch(
        checkoutBook({
          book,
          employee: user,
          libraryCard,
        }),
      ).unwrap();

      dispatch(setCurrentBook(undefined));
      dispatch(setDisplayLoan(false));
      toast.success(
        `The book "${book.title}" has been successfully checked out!`,
      );
      navigate(`/`);
    } catch (error: unknown) {
      console.error("Checkout failed", error);

      if (error instanceof Error) {
        toast.error(`Error during book checkout`);
      } else {
        toast.error("Failed to check out the book. Please try again.");
      }
    }
  };

  return {
    user,
    book,
    libraryCardRef,
    handleCheckout,
  };
};

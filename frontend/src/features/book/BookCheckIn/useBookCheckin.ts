import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type {
  AppDispatch,
  RootState,
} from "../../../shared/store/ReduxStore";

import {
  checkinBook,
  setCurrentBook,
} from "../../../entities/book/model/bookSlice";

import { setDisplayLoan } from "../../../shared/store/slices/ModalSlice";

export const useBookCheckin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, book } = useSelector((state: RootState) => ({
    user: state.user.loggedInUser,
    book: state.book.currentBook,
  }));

  const handleCheckin = async () => {
    if (!book || !user) {
      toast.error(
        "Cannot check in the book: no selected book or user.",
      );
      return;
    }

    try {
      await dispatch(
        checkinBook({
          book,
          employee: user,
        }),
      ).unwrap();

      dispatch(setCurrentBook(undefined));
      dispatch(setDisplayLoan(false));

      navigate("/");

      toast.success(
        `The book "${book.title}" has been successfully returned!`,
      );
    } catch (error) {
      console.error("Checkin failed", error);

      toast.error(
        "Failed to return the book. Please try again.",
      );
    }
  };

  return {
    user,
    book,
    handleCheckin,
  };
};
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { useCheckoutBook } from "@/entities/book/model/hooks/useCheckoutBook";
import { useMe } from "@/entities/user/model/hooks/useMe";

import { setDisplayLoan } from "@/shared/store/slices/ModalSlice";

import type { DomainBook } from "@/entities/book/model/domain/Book";

export const useBookCheckout = (book?: DomainBook) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useMe();

  const [checkoutBook, { isLoading }] = useCheckoutBook();

  const libraryCardRef = useRef<HTMLInputElement>(null);

  const handleCheckout = async () => {
    if (!book || !user) return;

    const libraryCard = libraryCardRef.current?.value?.trim();

    if (!libraryCard) {
      toast.error("Please enter a valid library card number.");
      return;
    }

    try {
      await checkoutBook({
        bookId: book.id,
        employeeId: user.id,
        libraryCard,
      });

      dispatch(setDisplayLoan(false));

      toast.success(
        `The book "${book.title}" has been successfully checked out!`,
      );

      navigate("/");
    } catch (error) {
      console.error("Checkout failed", error);

      toast.error("Failed to check out the book. Please try again.");
    }
  };

  return {
    user,
    book,
    libraryCardRef,
    handleCheckout,
    isLoading,
  };
};

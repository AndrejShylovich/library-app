import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { isBookAvailable } from "../../model/lib/isBookAvailable";
import { useMe } from "@/entities/user/model/hooks/useMe";

import type { DomainBook } from "../../model/domain/Book";

export const useBookCard = (book: DomainBook) => {
  const { user } = useMe();

  const available = isBookAvailable(book);

  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const buttonClass = [
    "book-card-loan-button",
    available ? "available" : "unavailable",
    user?.role === "EMPLOYEE" ? (available ? "checkout" : "checkin") : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleLoan = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (user?.role !== "EMPLOYEE") {
        return;
      }
      e.stopPropagation();

      const next = new URLSearchParams(params);
      next.set("loan", book.barcode);

      setParams(next);
    },
    [user?.role, params, setParams, book.barcode],
  );

  const closeLoan = useCallback(() => {
    navigate("/catalog");
  }, [navigate]);

  const displayBook = useCallback(() => {
    navigate(`/resource/${book.barcode}`);
  }, [book.barcode, navigate]);

  return {
    available,
    buttonClass,
    handleLoan,
    closeLoan,
    displayBook,
  };
};

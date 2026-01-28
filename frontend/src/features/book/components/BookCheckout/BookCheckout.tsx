import type React from "react";
import { useBookCheckout } from "./useBookCheckout";
import "./BookCheckout.css";
import { Input } from "../../../../shared/ui/Input/Input";
import { Button } from "../../../../shared/ui/Button/Button";

export const BookCheckout: React.FC = () => {
  const { user, book, libraryCardRef, handleCheckout } = useBookCheckout();

  if (!book || !user) return <div className="book-checkout" />;

  return (
    <div className="book-checkout">
      <form className="book-checkout-form" onSubmit={(e) => e.preventDefault()}>
        <h3>Loan Book: {book.title}</h3>

        <label className="book-checkout-label">
          Patron Library Card:
          <Input
            className="book-checkout-input"
            placeholder="Library Card ID"
            ref={libraryCardRef}
          />
        </label>

        <label className="book-checkout-label">
          Employee ID:
          <Input
            className="book-checkout-input"
            value={user._id}
            disabled
            aria-label="Employee ID"
          />
        </label>

        <Button
          className="book-checkout-button"
          type="button"
          onClick={handleCheckout}
        >
          Loan Book
        </Button>
      </form>
    </div>
  );
};

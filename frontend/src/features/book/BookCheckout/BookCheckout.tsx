import { useBookCheckout } from "./useBookCheckout";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import "./BookCheckout.css";

import type { DomainBook } from "@/entities/book/model/domain/Book";

type Props = {
  book: DomainBook;
};

export const BookCheckout: React.FC<Props> = ({ book }) => {
  const { user, libraryCardRef, handleCheckout, isLoading } =
    useBookCheckout(book);

  if (!user) {
    return null;
  }

  return (
    <div className="book-checkout">
      <div className="book-checkout-form">
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
            value={user.id}
            readOnly
            aria-label="Employee ID"
          />
        </label>

        <Button
          className="book-checkout-button"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Loan Book"}
        </Button>
      </div>
    </div>
  );
};

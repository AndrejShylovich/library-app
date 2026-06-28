import { useBookCheckout } from "./useBookCheckout";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import "./BookCheckout.css";

export const BookCheckout: React.FC = () => {
  const {
    user,
    book,
    libraryCardRef,
    handleCheckout,
  } = useBookCheckout();

  if (!book || !user) {
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
            value={user._id}
            readOnly
            aria-label="Employee ID"
          />
        </label>

        <Button
          className="book-checkout-button"
          onClick={handleCheckout}
        >
          Loan Book
        </Button>
      </div>
    </div>
  );
};
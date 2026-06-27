import { useBookCheckin } from "./useBookCheckin";
import { Input } from "../../../shared/ui/Input/Input";
import { Button } from "../../../shared/ui/Button/Button";
import "./BookCheckIn.css";

export const BookCheckin: React.FC = () => {
  const { user, book, handleCheckin } = useBookCheckin();

  if (!book || !user) {
    return null;
  }

  return (
    <div className="book-checkin">
      <div className="book-checkin-form">
        <h3>Check In Book: {book.title}</h3>

        <label className="book-checkin-label">
          Employee ID:
          <Input
            className="book-checkin-input"
            value={user._id}
            readOnly
            aria-label="Employee ID"
          />
        </label>

        <Button
          className="book-checkin-button"
          onClick={handleCheckin}
        >
          Check In Book
        </Button>
      </div>
    </div>
  );
};
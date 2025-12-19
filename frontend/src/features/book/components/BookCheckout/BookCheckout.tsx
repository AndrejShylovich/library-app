import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { useRef } from "react";
import { checkoutBook, setCurrentBook } from "../../../../store/slices/BookSlice";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";
import "./BookCheckout.css";

export const BookCheckout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.authentification.loggedInUser);
    const book = useSelector((state: RootState) => state.book.currentBook);

    const libraryCardRef = useRef<HTMLInputElement>(null);

    const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!book || !user) return;

        const libraryCard = libraryCardRef.current?.value?.trim();
        if (!libraryCard) {
            alert("Please enter a valid library card number.");
            return;
        }

        dispatch(
            checkoutBook({
                book,
                employee: user,
                libraryCard,
            })
        );

        dispatch(setCurrentBook(undefined));
        dispatch(setDisplayLoan(false));
    };

    // Если нет данных — показываем пустой контейнер
    if (!book || !user) {
        return <div className="book-checkout" />;
    }

    return (
        <div className="book-checkout">
            <form className="book-checkout-form">
                <h3>Loan Book: {book.title}</h3>

                <label className="book-checkout-label">
                    Patron Library Card:
                    <input
                        className="book-checkout-input"
                        placeholder="Library Card ID"
                        ref={libraryCardRef}
                    />
                </label>

                <label className="book-checkout-label">
                    Employee ID:
                    <input
                        className="book-checkout-input"
                        value={user._id}
                        disabled
                        aria-label="Employee ID"
                    />
                </label>

                <button
                    className="book-checkout-button"
                    onClick={handleCheckout}
                    type="submit"
                >
                    Loan Book
                </button>
            </form>
        </div>
    );
};

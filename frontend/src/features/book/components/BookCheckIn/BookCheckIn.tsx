import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { checkinBook, setCurrentBook } from "../../../../store/slices/BookSlice";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";

import "./BookCheckIn.css";

export const BookCheckin: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.authentification.loggedInUser);
    const book = useSelector((state: RootState) => state.book.currentBook);

    const handleCheckin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (book && user) {
            dispatch(checkinBook({ book, employee: user }));
        }

        // закрываем модалку и очищаем выбранную книгу
        dispatch(setCurrentBook(undefined));
        dispatch(setDisplayLoan(false));
    };

    // Если нет книги или юзера — ничего не рендерим
    if (!book || !user) {
        return <div className="book-checkin" />;
    }

    return (
        <div className="book-checkin">
            <form className="book-checkin-form">
                <h3>Check In Book: {book.title}</h3>

                <label className="book-checkin-label">
                    Employee ID:
                    <input
                        className="book-checkin-input"
                        value={user._id}
                        disabled
                        aria-label="Employee ID"
                    />
                </label>

                <button
                    className="book-checkin-button"
                    onClick={handleCheckin}
                    type="submit"
                >
                    Check In Book
                </button>
            </form>
        </div>
    );
};

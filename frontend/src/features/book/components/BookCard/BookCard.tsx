import { useNavigate } from "react-router-dom";
import type { Book } from "../../../../models/Book";
import { mapAuthorsToString } from "../../utils/BookUtils";
import './BookCard.css';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { setCurrentBook } from "../../../../store/slices/BookSlice";
import { setDisplayLoan } from "../../../../store/slices/ModalSlice";
import { useMemo } from "react";

interface BookCardProps {
    book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const user = useSelector((state: RootState) => state.authentification.loggedInUser);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Доступность книги
    const available = useMemo(() => {
        return book.records.length === 0 || book.records[0].status === 'AVAILABLE';
    }, [book.records]);

    // Класс кнопки
    const buttonClass = useMemo(() => {
        let c = "book-card-loan-button";
        c += available ? " available" : " unavailable";
        if (user?.type === 'EMPLOYEE') {
            c += available ? " checkout" : " checkin";
        }
        return c;
    }, [available, user]);

    const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (user?.type === 'EMPLOYEE') {
            dispatch(setCurrentBook(book));
            dispatch(setDisplayLoan(true));
        }
    };

    const displayBook = () => {
        navigate(`/resource/${book.barcode}`);
    };

    return (
        <div id="book-card" className="book-card" onClick={displayBook}>
            <img className="book-card-cover" src={book.cover} alt={book.title} />
            <div className="book-card-info">
                <h1 className="book-card-title">{book.title}</h1>
                <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
                {/* <p className="book-card-description">{book.description}</p> */}
            </div>
            <button className={buttonClass} onClick={handleLoan}>
                Status: {available ? "AVAILABLE" : "UNAVAILABLE"}
            </button>
        </div>
    );
};

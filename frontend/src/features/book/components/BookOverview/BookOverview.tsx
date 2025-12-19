import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/ReduxStore";

import { BookInformation } from "../BookInformation/BookInformation";
import { BookSubjects } from "../BookSubjects/BookSubjects";
import { BookAdditionalInfo } from "../BookAdditionalInfo/BookAdditionalInfo";
import { BookHistory } from "../BookHistory/BookHistory";

import "./BookOverview.css";

export const BookOverview: React.FC = () => {
    const { currentBook, loading } = useSelector((state: RootState) => state.book);
    const user = useSelector((state: RootState) => state.authentification.loggedInUser);

    // Пока идёт загрузка — возвращаем empty state (или можно показать spinner)
    if (loading) {
        return <div className="book-overview">Loading...</div>;
    }

    // Если нет текущей книги — показываем fallback
    if (!currentBook) {
        return <div className="book-overview">No book selected.</div>;
    }

    return (
        <div className="book-overview">
            <BookInformation book={currentBook} />
            <BookSubjects subjects={currentBook.subjects} />
            <BookAdditionalInfo book={currentBook} />

            {user?.type === "EMPLOYEE" && (
                <BookHistory book={currentBook} />
            )}
        </div>
    );
};

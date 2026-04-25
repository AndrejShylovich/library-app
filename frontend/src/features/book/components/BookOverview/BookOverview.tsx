import type React from "react";
import { BookInformation } from "../BookInformation/BookInformation";
import { BookSubjects } from "../BookSubjects/BookSubjects";
import { BookAdditionalInfo } from "../BookAdditionalInfo/BookAdditionalInfo";
import { BookHistory } from "../BookHistory/BookHistory";
import { useBookOverview } from "./useBookOverview";
import "./BookOverview.css";

export const BookOverview: React.FC = () => {
  const { currentBook, loading, user } = useBookOverview();

  if (loading) return <div className="book-overview">Loading...</div>;
  if (!currentBook)
    return <div className="book-overview">No book selected.</div>;

  return (
    <div className="book-overview">
      <BookInformation book={currentBook} />
      <BookSubjects subjects={currentBook.subjects} />
      <BookAdditionalInfo book={currentBook} />
      {user?.type === "EMPLOYEE" && <BookHistory book={currentBook} />}
    </div>
  );
};

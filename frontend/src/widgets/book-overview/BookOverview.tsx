import type React from "react";

import { useBookOverview } from "./useBookOverview";
import "./BookOverview.css";
import { BookInformation } from "@/entities/book/ui/BookInformation/BookInformation";
import { BookSubjects } from "@/entities/book/ui/BookSubjects/BookSubjects";
import { BookAdditionalInfo } from "@/entities/book/ui/BookAdditionalInfo/BookAdditionalInfo";
import { BookHistory } from "@/entities/book/ui/BookHistory/BookHistory";

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

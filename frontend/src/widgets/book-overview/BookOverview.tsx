import "./BookOverview.css";

import { BookInformation } from "@/entities/book/ui/BookInformation/BookInformation";
import { BookSubjects } from "@/entities/book/ui/BookSubjects/BookSubjects";
import { BookAdditionalInfo } from "@/entities/book/ui/BookAdditionalInfo/BookAdditionalInfo";
import { BookHistory } from "@/entities/book/ui/BookHistory/BookHistory";

import type { DomainBook } from "@/entities/book/model/domain/Book";
import type { DomainUser } from "@/entities/user/model/domain/User";

type Props = {
  book?: DomainBook;
  user?: DomainUser;
  loading?: boolean;
};

export const BookOverview = ({ book, user, loading }: Props) => {
  if (loading) return <div className="book-overview">Loading...</div>;

  if (!book) {
    return <div className="book-overview">No book selected.</div>;
  }

  return (
    <div className="book-overview">
      <BookInformation book={book} />
      <BookSubjects subjects={book.subjects} />
      <BookAdditionalInfo book={book} />

      {user?.role === "EMPLOYEE" && <BookHistory book={book} />}
    </div>
  );
};

import { BookInformation } from "@/entities/book/ui/BookInformation/BookInformation";
import { BOOK_OF_THE_WEEK } from "./bookOfTheWeek.model";

import "./BookOfTheWeek.css";

export const BookOfTheWeek = () => {
  return (
    <section className="book-of-the-week">
      <h2>Book of the Week</h2>
      <BookInformation book={BOOK_OF_THE_WEEK} />
    </section>
  );
};
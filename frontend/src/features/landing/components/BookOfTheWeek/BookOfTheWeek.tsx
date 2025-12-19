import type { Book } from "../../../../models/Book";
import { BookInformation } from "../../../book/components/BookInformation/BookInformation";
import './BookOfTheWeek.css';

const WEEKLY_BOOK: Book = {
  _id: "0316379379",
  barcode: "0316379379",
  cover:
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489176444i/34523174.jpg",
  title: "Into the Drowning Deep",
  authors: ["Mira Grant"],
  description:
    "Seven years ago, the Atargatis set off on a voyage to the Mariana Trench to film a “mockumentary” bringing to life ancient sea creatures of legend. It was lost at sea with all hands. Some have called it a hoax; others have called it a maritime tragedy. Now, a new crew has been assembled. But this time they’re not out to entertain. Some seek to validate their life’s work. Some seek the greatest hunt of all. Some seek the truth. But for the ambitious young scientist Victoria Stewart this is a voyage to uncover the fate of the sister she lost. Whatever the truth may be, it will only be found below the waves. But the secrets of the deep come with a price.",
  subjects: [
    "Women scientists",
    "Fiction",
    "Fiction, science fiction, action & adventure",
    "Fiction, sea stories",
    "Fiction, horror",
  ],
  publicationDate: new Date("2020-01-02"),
  publisher: "Little, Brown Book Group Limited",
  pages: 448,
  genre: "horror",
  records: [],
};

export const BookOfTheWeek: React.FC = () => {
  return (
    <section className="book-of-the-week">
      <h2>Book of the Week</h2>
      <BookInformation book={WEEKLY_BOOK} />
    </section>
  );
};

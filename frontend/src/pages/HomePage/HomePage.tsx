import type { JSX } from "react";
import {
  BookOfTheWeek,
  ContactUs,
  LibraryCard,
  LibraryHours,
  UpcomingEvents,
} from "../../widgets/landing";
import "./HomePage.css";

export default function HomePage(): JSX.Element {
  return (
    <main className="page">
      <div className="home-page-container">
        <LibraryCard />
        <BookOfTheWeek />
        <LibraryHours />
        <UpcomingEvents />
        <ContactUs />
      </div>
    </main>
  );
}

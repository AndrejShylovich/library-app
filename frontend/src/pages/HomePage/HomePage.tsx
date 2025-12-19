import type { JSX } from "react";
import {
  BookOfTheWeek,
  LibraryCard,
  LibraryHours,
  UpcomingEvents,
  ContactUs,
} from "../../features/landing/components";

import "./HomePage.css";

export default function HomePage(): JSX.Element {
  return (
    <main className="page">
      <div className="home-page-container">
        <div className="home-page-row">
          <div className="home-page-block">
            <LibraryCard />
            <BookOfTheWeek />
            <LibraryHours />
            <UpcomingEvents />
            <ContactUs />
          </div>
        </div>
      </div>
    </main>
  );
}

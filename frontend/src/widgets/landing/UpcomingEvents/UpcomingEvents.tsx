import "./UpcomingEvents.css";

interface Event {
  dayTime: string;
  audience: string;
  description: string;
}

const EVENTS: Event[] = [
  {
    dayTime: "Tuesday at 4:00 PM",
    audience: "For Teenagers",
    description:
      "Board Game Club: Strategy games, cooperative games, role-playing games (Dungeons & Dragons)",
  },
  {
    dayTime: "Wednesday at 6:00 PM",
    audience: "For Adults",
    description:
      "Themed AI Meetings: How to use language models in work and creativity, ethics of the digital world",
  },
  {
    dayTime: "Thursday at 10:00 AM",
    audience: "For Children",
    description:
      "Book Detective Club: Children read a book (or excerpt) in advance, then solve plot mysteries and analyze character motives during the meeting",
  },
];

export const UpcomingEvents = () => {
  return (
    <section className="upcoming-events">
      <header className="upcoming-events-header-group">
        <div>
          <span className="upcoming-events-label">This Summer</span>
          <h2>Upcoming Events</h2>
        </div>
      </header>

      <div className="upcoming-events-list">
        {EVENTS.map(({ dayTime, audience, description }) => (
          <article key={dayTime} className="upcoming-events-item">
            <div className="upcoming-events-time">
              {dayTime}
            </div>

            <div className="upcoming-events-content">
              <span className="upcoming-events-audience">
                {audience}
              </span>

              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
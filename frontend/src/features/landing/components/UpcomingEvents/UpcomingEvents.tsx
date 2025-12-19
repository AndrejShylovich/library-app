import { AutoAwesome } from "@mui/icons-material";
import './UpcomingEvents.css';

interface Event {
  dayTime: string;
  audience: string;
  description: string;
}

const EVENTS: Event[] = [
  {
    dayTime: "Tuesday at 4:00 PM",
    audience: "For Teenagers",
    description: "Board Game Club: Strategy games, cooperative games, role-playing games (Dungeons & Dragons)",
  },
  {
    dayTime: "Wednesday at 6:00 PM",
    audience: "For Adults",
    description: "Themed AI Meetings: How to use language models in work and creativity, ethics of the digital world",
  },
  {
    dayTime: "Thursday at 10:00 AM",
    audience: "For Children",
    description: "Book Detective Club: Children read a book (or excerpt) in advance, then solve plot mysteries and analyze character motives during the meeting",
  },
];

export const UpcomingEvents: React.FC = () => {
  return (
    <section className="upcoming-events">
      <div className="upcoming-events-header-group">
        <AutoAwesome sx={{ fontSize: "2.25rem", color: "#3626A8" }} />
        <h2>Upcoming Events</h2>
        <AutoAwesome sx={{ fontSize: "2.25rem", color: "#3626A8" }} />
      </div>

      <h3>This Summer</h3>

      {EVENTS.map(({ dayTime, audience, description }) => (
        <div key={dayTime} className="upcoming-events-item">
          <h4>{dayTime}</h4>
          <ul className="upcoming-events-event">
            <li><b>{audience}</b></li>
            <li><p>{description}</p></li>
          </ul>
        </div>
      ))}
    </section>
  );
};

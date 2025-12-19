import './LibraryHours.css';

const HOURS = [
  { day: "Monday", hours: "10:00-18:00" },
  { day: "Tuesday", hours: "12:00-20:00" },
  { day: "Wednesday", hours: "10:00-18:00" },
  { day: "Thursday", hours: "12:00-20:00" },
  { day: "Friday", hours: "10:00-18:00" },
  { day: "Saturday", hours: "12:00-18:00" },
  { day: "Sunday", hours: "Closed" },
];

export const LibraryHours: React.FC = () => {
  return (
    <section className="library-hours">
      <h3>Library Hours</h3>
      <table className="library-hours-table" id="hours">
        <tbody>
          {HOURS.map(({ day, hours }) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

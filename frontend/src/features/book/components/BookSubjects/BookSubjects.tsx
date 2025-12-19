import "./BookSubjects.css";

interface BookSubjectsProps {
  subjects: string[];
}

export const BookSubjects: React.FC<BookSubjectsProps> = ({ subjects }) => {
  return (
    <div className="book-subjects">
      <h3>Book Subjects:</h3>
      <div className="book-info-subjects-box">
        <p className="hook-info-subject">
          {subjects.join(", ")}
        </p>
      </div>
    </div>
  );
};


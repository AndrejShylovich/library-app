import "./BookSubjects.css";

interface BookSubjectsProps {
  subjects: string[];
}

export const BookSubjects: React.FC<BookSubjectsProps> = ({
  subjects,
}) => {
  if (!subjects.length) {
    return null;
  }

  return (
    <section className="book-subjects">
      <h3>Book Subjects</h3>

      <div className="book-info-subjects-box">
        <p className="book-info-subject">
          {subjects.join(", ")}
        </p>
      </div>
    </section>
  );
};
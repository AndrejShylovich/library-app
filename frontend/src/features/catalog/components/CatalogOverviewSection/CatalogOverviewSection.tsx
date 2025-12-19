import { useNavigate } from "react-router-dom";
import type { Book } from "../../../../models/Book";
import { BookCarousel } from "../../../book/components";

interface CatalogOverviewSectionProps {
  books: Book[];
  label: string;
}

export const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({ books, label }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    const params = new URLSearchParams({ genre: label, subject: label });
    navigate(`/catalog?${params.toString()}`);
  };

  if (!books || books.length === 0) return null;

  return (
    <div className="catalog-overview-section">
      <div className="catalog-overview-section-top">
        <h4>{label}</h4>
        <span className="catalog-overview-section-more" onClick={handleViewMore}>
          View more...
        </span>
      </div>
      <BookCarousel books={books} />
    </div>
  );
};

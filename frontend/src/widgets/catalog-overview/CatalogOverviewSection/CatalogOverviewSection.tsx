import type { DomainBook } from "../../../entities/book/model/domain/Book";
import { BookCarousel } from "../../../entities/book/ui/BookCarousel/BookCarousel";
import { useCatalogOverviewSection } from "./useCatalogOverviewSection";
import "./CatalogOverviewSection.css";

interface CatalogOverviewSectionProps {
  books: DomainBook[];
  label: string;
}

export const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({
  books,
  label,
}) => {
  const { viewMore } = useCatalogOverviewSection(label);

  if (!books || books.length === 0) return null;

  return (
    <div className="catalog-overview-section">
      <div className="catalog-overview-section-top">
        <h4>{label}</h4>
        <span className="catalog-overview-section-more" onClick={viewMore}>
          View more...
        </span>
      </div>
      <BookCarousel books={books} />
    </div>
  );
};

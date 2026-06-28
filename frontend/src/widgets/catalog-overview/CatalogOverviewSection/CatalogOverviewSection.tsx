import type { DomainBook } from "@/entities/book/model/domain/Book";
import { BookCarousel } from "@/entities/book/ui/BookCarousel/BookCarousel";
import { useCatalogOverviewSection } from "./useCatalogOverviewSection";

import "./CatalogOverviewSection.css";

interface CatalogOverviewSectionProps {
  books: DomainBook[];
  label: string;
}

export const CatalogOverviewSection = ({
  books,
  label,
}: CatalogOverviewSectionProps) => {
  const { viewMore } = useCatalogOverviewSection(label);

  if (books.length === 0) return null;

  return (
    <section className="catalog-overview-section">
      <div className="catalog-overview-section-top">
        <h4>{label}</h4>

        <button
          type="button"
          className="catalog-overview-section-more"
          onClick={viewMore}
        >
          View more...
        </button>
      </div>

      <BookCarousel books={books} />
    </section>
  );
};
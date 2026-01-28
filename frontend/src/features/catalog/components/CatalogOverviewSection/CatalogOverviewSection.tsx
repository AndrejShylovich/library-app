import React from "react";
import type { Book } from "../../../../models/Book";
import { BookCarousel } from "../../../book/components";
import { useCatalogOverviewSection } from "./useCatalogOverviewSection";

interface CatalogOverviewSectionProps {
  books: Book[];
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

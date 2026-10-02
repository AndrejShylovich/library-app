import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { CatalogOverview } from "@/widgets/catalog-overview/CatalogOverview/CatalogOverview";
import { CatalogSearch } from "@/widgets/catalog-search/CatalogSearch/CatalogSearch";

import { useBookByBarcode } from "@/entities/book/model/hooks/useBookByBarcode";

import { LoanBookModal } from "@/features/book/LoanBookModal/LoanBookModal";

import "./CatalogPage.css";

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();

  const loanBarcode = params.get("loan");

  const searchState = {
    title: params.get("title"),
    isbn: params.get("barcode"),
    authors: params.get("authors"),
    description: params.get("description"),
    subjects: params.get("subjects"),
    genre: params.get("genre"),
  };

  const isSearchMode = Object.values(searchState).some(Boolean);

  const isModalOpen = Boolean(loanBarcode);

  const { book } = useBookByBarcode(loanBarcode ?? undefined);

  const closeLoanModal = useCallback(() => {
    const newParams = new URLSearchParams(params);
    newParams.delete("loan");
    setParams(newParams);
  }, [params, setParams]);

  return (
    <div className="page">
      <div className="page-container">
        {isSearchMode ? <CatalogSearch /> : <CatalogOverview />}
      </div>

      {isModalOpen && book && (
        <LoanBookModal book={book} onClose={closeLoanModal} />
      )}
    </div>
  );
}

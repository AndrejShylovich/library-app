import { useLocation } from "react-router-dom";

import { CatalogOverview } from "@/widgets/catalog-overview/CatalogOverview/CatalogOverview";

import "./CatalogPage.css";
import { CatalogSearch } from "@/widgets/catalog-search/CatalogSearch/CatalogSearch";

export default function CatalogPage() {
  const { search } = useLocation();

  return (
    <div className="page">
      <div className="page-container">
        {search ? <CatalogSearch /> : <CatalogOverview />}
      </div>
    </div>
  );
}
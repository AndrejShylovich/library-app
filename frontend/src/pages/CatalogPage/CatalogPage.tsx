import { useLocation } from "react-router-dom";

import { CatalogOverview } from "../../widgets/catalog-overview/CatalogOverview/CatalogOverview";
import { CatalogSearch } from "../../widgets/catalog-search/CatalogSearch/CatalogSearch";

import "./CatalogPage.css";

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
import { useLocation } from "react-router-dom";
import { CatalogOverview, CatalogSearch } from "../../features/catalog";
import './CatalogPage.css';

export default function CatalogPage() {
  const { search } = useLocation();

  const isSearchEmpty = search === "";

  return (
    <div className="page">
      <div className="page-container">
        {isSearchEmpty ? <CatalogOverview /> : <CatalogSearch />}
      </div>
    </div>
  );
}

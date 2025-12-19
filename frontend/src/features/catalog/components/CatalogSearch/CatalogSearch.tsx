import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { queryBooks } from "../../../../store/slices/BookSlice";
import { BookCard } from "../../../book/components";
import "./CatalogSearch.css";
import { CatalogAdvancedSearch } from "../CatalogAdvancedSearch/CatalogAdvancedSearch";
import { CatalogSearchPageNavigation } from "../CatalogSearchPageNavigation/CatalogSearchPageNavigation";

export const CatalogSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { books, loading, pagingInformation } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [location.search, dispatch]);

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-search-section">
        <CatalogAdvancedSearch />
      </div>

      {!loading && (
        <>
          <h2>
            Displaying {pagingInformation?.pageCount || 0} books out of {pagingInformation?.totalCount || 0}
          </h2>

          <div className="catalog-search-item-area">
            {books.map((book) => (
              <BookCard key={book.barcode} book={book} />
            ))}
          </div>

          <div className="catalog-search-pages">
            <CatalogSearchPageNavigation />
          </div>
        </>
      )}
    </div>
  );
};

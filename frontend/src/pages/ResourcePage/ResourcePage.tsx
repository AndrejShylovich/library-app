import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { loadBookByBarcode } from "@/entities/book/model/bookSlice";
import { BookOverview } from "@/widgets/book-overview/BookOverview";

import type { AppDispatch, RootState } from "@/shared/store/ReduxStore";

import "./ResourcePage.css";

export default function ResourcePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { barcode } = useParams();

  const error = useSelector((state: RootState) => state.book.error);

  useEffect(() => {
    if (barcode) {
      dispatch(loadBookByBarcode(barcode));
    }
  }, [barcode, dispatch]);

  if (!barcode || error) {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <main className="page">
      <div className="page-container">
        <BookOverview />
      </div>
    </main>
  );
}

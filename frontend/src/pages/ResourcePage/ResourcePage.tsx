import { Navigate, useParams } from "react-router-dom";

import { BookOverview } from "@/widgets/book-overview/BookOverview";

import "./ResourcePage.css";
import { useBookByBarcode } from "@/entities/book/model/hooks/useBookByBarcode";
import { useMe } from "@/entities/user/model/hooks/useMe";

export default function ResourcePage() {
  const { barcode } = useParams();

  const { user } = useMe();

  const { book, isLoading, error } = useBookByBarcode(barcode);

  if (!barcode) {
    return <Navigate to="/catalog" replace />;
  }

  if (error) {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <main className="page">
      <div className="page-container">
        <BookOverview book={book} user={user} loading={isLoading} />
      </div>
    </main>
  );
}

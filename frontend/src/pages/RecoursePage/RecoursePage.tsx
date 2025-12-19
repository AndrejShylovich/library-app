import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/ReduxStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, type JSX } from "react";
import { loadBookByBarcode } from "../../store/slices/BookSlice";
import { BookOverview } from "../../features/book/components";

export default function ResourcePage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { barcode } = useParams();
  const navigate = useNavigate();

  const { error } = useSelector((state: RootState) => state.book);

  // Загружаем книгу при изменении barcode
  useEffect(() => {
    if (barcode) {
      dispatch(loadBookByBarcode(barcode));
    }
  }, [barcode, dispatch]);

  // Перенаправление при ошибке загрузки
  useEffect(() => {
    if (error) {
      navigate("/catalog");
    }
  }, [error, navigate]);

  return (
    <main className="page">
      <div className="page-container">
        <BookOverview />
      </div>
    </main>
  );
}

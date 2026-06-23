import { useEffect, type JSX } from 'react';
import { loadBookByBarcode } from '../../entities/book/model/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../shared/store/ReduxStore';
import { BookOverview } from '../../widgets/book-overview/BookOverview';
import "./ResourcePage.css";

export default function ResourcePage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { barcode } = useParams();
  const navigate = useNavigate();

  const { error } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    if (barcode) {
      dispatch(loadBookByBarcode(barcode));
    }
  }, [barcode, dispatch]);

  useEffect(() => {
    if (error) {
      navigate("/catalog");
    }
  }, [error, navigate]);

  return (
    <main className="page">
      <div className="page-container">
        <BookOverview/>
      </div>
    </main>
  );
}

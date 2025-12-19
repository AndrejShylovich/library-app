// LibraryCard.tsx
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/ReduxStore";
import { setDisplayLibraryCard } from "../../../../store/slices/ModalSlice";
import libraryCard from "../../../../assets/librarycard.png";
import "./LibraryCard.css";

export const LibraryCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDisplayModal = () => {
    dispatch(setDisplayLibraryCard(true));
  };

  return (
    <section className="library-card">
      <h2>Library Card</h2>
      <img src={libraryCard} alt="Library Card" className="library-card-img" />
      <p>
        Learn how to get your library card{" "}
        <span className="get-library-card-link" onClick={handleDisplayModal}>
          here
        </span>
      </p>
    </section>
  );
};

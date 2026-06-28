import "./LibraryCard.css";

import { useLibraryCard } from "./useLibraryCard";
import libraryCard from "@/shared/assets/librarycard.png";

export const LibraryCard = () => {
  const { openLibraryCardModal } = useLibraryCard();

  return (
    <section className="library-card">
      <h2>Library Card</h2>

      <img src={libraryCard} alt="Library Card" className="library-card-img" />

      <p>
        Learn how to get your library card{" "}
        <span className="get-library-card-link" onClick={openLibraryCardModal}>
          here
        </span>
      </p>
    </section>
  );
};

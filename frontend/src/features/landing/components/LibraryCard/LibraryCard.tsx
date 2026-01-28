import React from "react";
import libraryCard from "../../../../assets/librarycard.png";
import "./LibraryCard.css";
import { useLibraryCard } from "./useLibraryCard";

export const LibraryCard: React.FC = () => {
  const { showModal } = useLibraryCard();

  return (
    <section className="library-card">
      <h2>Library Card</h2>
      <img src={libraryCard} alt="Library Card" className="library-card-img" />
      <p>
        Learn how to get your library card{" "}
        <span className="get-library-card-link" onClick={showModal}>
          here
        </span>
      </p>
    </section>
  );
};

import { useNavigate } from "react-router-dom";
import "./CatalogAdvancedSearch.css";
import { useRef } from "react";

export const CatalogAdvancedSearch: React.FC = () => {
  const navigate = useNavigate();

  const fields = {
    isbn: useRef<HTMLInputElement>(null),
    title: useRef<HTMLInputElement>(null),
    authors: useRef<HTMLInputElement>(null),
    description: useRef<HTMLInputElement>(null),
    subjects: useRef<HTMLInputElement>(null),
    genre: useRef<HTMLInputElement>(null),
  };

  const search = () => {
    const params = new URLSearchParams();
    for (const [key, ref] of Object.entries(fields)) {
      const value = ref.current?.value.trim();
      if (value) {
        const queryKey = key === "isbn" ? "barcode" : key;
        params.append(queryKey, value);
      }
    }

    navigate(`/catalog${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="catalog-advanced-search">
      <h2>Advanced Book Search</h2>
      <p>Fill in as many or little fields to narrow down your search results</p>

      <form className="catalog-advanced-search-form">
        <div className="catalog-advanced-form-input-group">
          <p>ISBN</p>
          <input
            id="isbn"
            className="catalog-advanced-form-input"
            placeholder="ISBN"
            ref={fields.isbn}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Title</p>
          <input
            id="title"
            className="catalog-advanced-form-input"
            placeholder="Title"
            ref={fields.title}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Authors</p>
          <input
            id="authors"
            className="catalog-advanced-form-input"
            placeholder="Authors"
            ref={fields.authors}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Description</p>
          <input
            id="description"
            className="catalog-advanced-form-input"
            placeholder="Description"
            ref={fields.description}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Subjects</p>
          <input
            id="subjects"
            className="catalog-advanced-form-input"
            placeholder="Subject"
            ref={fields.subjects}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Genre</p>
          <input
            id="genre"
            className="catalog-advanced-form-input"
            placeholder="Genre"
            ref={fields.genre}
          />
        </div>
      </form>

      <button className="catalog-advanced-search-button" onClick={search}>
        Search
      </button>
    </div>
  );
};

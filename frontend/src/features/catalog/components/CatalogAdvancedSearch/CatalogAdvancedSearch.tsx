import React from "react";
import { useCatalogAdvancedSearch } from "./useCatalogAdvancedSearch";
import "./CatalogAdvancedSearch.css";
import { Input } from "../../../../shared/ui/Input/Input";
import { Button } from "../../../../shared/ui/Button/Button";

export const CatalogAdvancedSearch: React.FC = () => {
  const { fields, search } = useCatalogAdvancedSearch();

  return (
    <div className="catalog-advanced-search">
      <h2>Advanced Book Search</h2>
      <p>Fill in as many or as few fields as you like to narrow your search results</p>

      <form className="catalog-advanced-search-form">
        <div className="catalog-advanced-form-input-group">
          <p>ISBN</p>
          <Input id="isbn" placeholder="ISBN" ref={fields.isbn} className="catalog-advanced-form-input" />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Title</p>
          <Input id="title" placeholder="Title" ref={fields.title} className="catalog-advanced-form-input" />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Authors</p>
          <Input id="authors" placeholder="Authors" ref={fields.authors} className="catalog-advanced-form-input" />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Description</p>
          <Input id="description" placeholder="Description" ref={fields.description} className="catalog-advanced-form-input" />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Subjects</p>
          <Input id="subjects" placeholder="Subject" ref={fields.subjects} className="catalog-advanced-form-input" />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Genre</p>
          <Input id="genre" placeholder="Genre" ref={fields.genre} className="catalog-advanced-form-input" />
        </div>
      </form>

      <Button className="catalog-advanced-search-button" onClick={search}>
        Search
      </Button>
    </div>
  );
};

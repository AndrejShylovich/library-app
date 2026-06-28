import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useCatalogAdvancedSearch } from "./useCatalogAdvancedSearch";
import "./CatalogAdvancedSearch.css";

export const CatalogAdvancedSearch: React.FC = () => {
  const { fields, search } = useCatalogAdvancedSearch();

  const searchFields = [
    {
      id: "isbn",
      label: "ISBN",
      placeholder: "ISBN",
      ref: fields.isbn,
    },
    {
      id: "title",
      label: "Title",
      placeholder: "Title",
      ref: fields.title,
    },
    {
      id: "authors",
      label: "Authors",
      placeholder: "Authors",
      ref: fields.authors,
    },
    {
      id: "description",
      label: "Description",
      placeholder: "Description",
      ref: fields.description,
    },
    {
      id: "subjects",
      label: "Subjects",
      placeholder: "Subject",
      ref: fields.subjects,
    },
    {
      id: "genre",
      label: "Genre",
      placeholder: "Genre",
      ref: fields.genre,
    },
  ];

  return (
    <div className="catalog-advanced-search">
      <h2>Advanced Book Search</h2>

      <p>
        Fill in as many or as few fields as you like to narrow your search
        results
      </p>

      <form className="catalog-advanced-search-form">
        {searchFields.map((field) => (
          <div
            key={field.id}
            className="catalog-advanced-form-input-group"
          >
            <p>{field.label}</p>

            <Input
              id={field.id}
              placeholder={field.placeholder}
              ref={field.ref}
              className="catalog-advanced-form-input"
            />
          </div>
        ))}
      </form>

      <Button
        className="catalog-advanced-search-button"
        onClick={search}
      >
        Search
      </Button>
    </div>
  );
};
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const queryKeys = {
  isbn: "barcode",
} as const;

export const useCatalogAdvancedSearch = () => {
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

      if (!value) {
        continue;
      }

      const queryKey =
        queryKeys[key as keyof typeof queryKeys] ?? key;

      params.append(queryKey, value);
    }

    navigate(
      `/catalog${params.toString() ? `?${params}` : ""}`,
    );
  };

  return {
    fields,
    search,
  };
};
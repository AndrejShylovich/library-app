import { useMemo } from "react";

import { useGetBooksQuery } from "@/entities/book/api/bookQueryApi";

import { BookMapper } from "../mapper/BookMapper";

export const useBooks = () => {
  const { data, ...query } = useGetBooksQuery();

  const books = useMemo(
    () => data?.map((book) => BookMapper.toDomain(book)) ?? [],
    [data],
  );

  return {
    ...query,
    books,
  };
};
import { useMemo } from "react";

import { useQueryBooksQuery } from "@/entities/book/api/bookQueryApi";

import { BookMapper } from "../mapper/BookMapper";

export const useQueryBooks = (queryStr: string) => {
  const query = useQueryBooksQuery(queryStr);

  const page = useMemo(
    () =>
      query.data
        ? {
            ...query.data,
            items: query.data.items.map((item) => BookMapper.toDomain(item)),
          }
        : undefined,
    [query.data],
  );

  return {
    ...query,
    page,
  };
};

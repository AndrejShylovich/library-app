import { useMemo } from "react";

import { useGetBookByBarcodeQuery } from "@/entities/book/api/bookQueryApi";

import { BookMapper } from "../mapper/BookMapper";

export const useBookByBarcode = (barcode?: string) => {
  const query = useGetBookByBarcodeQuery(barcode ?? "", {
    skip: !barcode,
  });

  const book = useMemo(
    () => (query.data ? BookMapper.toDomain(query.data) : undefined),
    [query.data],
  );

  return {
    ...query,
    book,
  };
};
import { useCallback } from "react";

import { useCheckoutBookMutation } from "@/entities/book/api/bookQueryApi";
import { LoanRecordMapper } from "@/entities/loan-record/model/mapper/LoanRecordMapper";

import type { CheckoutBookDto } from "../dto/BookDto";

export const useCheckoutBook = () => {
  const [checkout, state] = useCheckoutBookMutation();

  const checkoutBook = useCallback(
    async (payload: CheckoutBookDto) => {
      const result = await checkout(payload).unwrap();

      return LoanRecordMapper.toDomain(result);
    },
    [checkout],
  );

  return [checkoutBook, state] as const;
};
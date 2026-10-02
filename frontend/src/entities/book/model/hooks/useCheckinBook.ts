import { useCallback } from "react";

import { useCheckinBookMutation } from "@/entities/book/api/bookQueryApi";
import { BookMapper } from "../mapper/BookMapper";
import { UserMapper } from "@/entities/user/model/mapper/UserMapper";

import type { DomainCheckinBookPayload } from "../domain/Book";

export const useCheckinBook = () => {
  const [checkin, state] = useCheckinBookMutation();

  const checkinBook = useCallback(
    async (payload: DomainCheckinBookPayload) => {
      return checkin({
        book: BookMapper.toDto(payload.book),
        employee: UserMapper.toDto(payload.employee),
      }).unwrap();
    },
    [checkin],
  );

  return [checkinBook, state] as const;
};
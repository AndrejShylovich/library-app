import { useSelector } from "react-redux";

import type { RootState } from "../../shared/store/ReduxStore";
import { BookMapper } from "../../entities/book/model/mapper/BookMapper";

export const useBookOverview = () => {
  const currentBookDto = useSelector(
    (state: RootState) => state.book.currentBook,
  );

  const loading = useSelector(
    (state: RootState) => state.book.loading,
  );

  const user = useSelector(
    (state: RootState) => state.user.loggedInUser,
  );

  return {
    currentBook: currentBookDto
      ? BookMapper.toDomain(currentBookDto)
      : undefined,
    loading,
    user,
  };
};
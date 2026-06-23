import { useSelector } from "react-redux";
import type { RootState } from "../../shared/store/ReduxStore";
import { BookMapper } from "../../entities/book/model/mapper/BookMapper";

export const useBookOverview = () => {
  const { currentBook: currentBookDto, loading } = useSelector(
    (state: RootState) => state.book,
  );
  const user = useSelector(
    (state: RootState) => state.user.loggedInUser,
  );

  const currentBook = currentBookDto
    ? BookMapper.toDomain(currentBookDto)
    : undefined;

  return {
    currentBook,
    loading,
    user,
  };
};

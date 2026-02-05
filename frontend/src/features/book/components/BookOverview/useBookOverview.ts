import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/ReduxStore";
import { BookMapper } from "../../../../models/mapper/BookMapper";

export const useBookOverview = () => {
  const { currentBook: currentBookDto, loading } = useSelector(
    (state: RootState) => state.book,
  );
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser,
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

import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/ReduxStore";

export const useBookOverview = () => {
  const { currentBook, loading } = useSelector(
    (state: RootState) => state.book,
  );
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser,
  );

  return {
    currentBook,
    loading,
    user,
  };
};

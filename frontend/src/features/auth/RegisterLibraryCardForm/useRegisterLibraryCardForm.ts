import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "../../../shared/store/slices/ModalSlice";
import { getLibraryCard } from "../../../entities/library-card/model/libraryCardSlice";

export const useRegisterLibraryCardForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelector(
    (state: RootState) => state.user,
  );
  const libraryCard = useSelector(
  (state: RootState) => state.libraryCard.libraryCard,
);

  const createLibraryCard = () => {
    if (loggedInUser) {
      dispatch(getLibraryCard(loggedInUser._id));
    }
  };

  const openLogin = () => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  };

  return {
    loggedInUser,
    libraryCard,
    createLibraryCard,
    openLogin,
  };
};

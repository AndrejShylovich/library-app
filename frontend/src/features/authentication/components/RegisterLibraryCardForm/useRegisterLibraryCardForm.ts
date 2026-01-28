import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { getLibraryCard } from "../../../../store/slices/AuthenticationSlice";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../store/slices/ModalSlice";


export const useRegisterLibraryCardForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser, libraryCard } = useSelector(
    (state: RootState) => state.authentication
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

import { useRef, type KeyboardEvent } from "react";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDisplayLogin } from "../../../shared/store/slices/ModalSlice";

export const useNavbarLogic = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const performSearch = () => {
    const query = searchRef.current?.value.trim();
    if (query) {
      navigate(`/catalog?title=${query}`);
      if (searchRef.current) searchRef.current.value = "";
    }
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch();
  };

  const navigateToProfile = () => {
    if (loggedInUser?._id) navigate(`/profile/${loggedInUser._id}`);
  };

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  };

  return {
    loggedInUser,
    searchRef,
    performSearch,
    handleEnterKey,
    navigateToProfile,
    toggleLogin,
  };
};

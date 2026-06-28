import { useCallback, useRef, type KeyboardEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "@/shared/store/ReduxStore";

import { setDisplayLogin } from "@/shared/store/slices/ModalSlice";

export const useNavbarLogic = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const performSearch = useCallback(() => {
    const input = searchRef.current;
    if (!input) return;

    const query = input.value.trim();
    if (!query) return;

    navigate(`/catalog?title=${encodeURIComponent(query)}`);

    input.value = "";
  }, [navigate]);

  const handleEnterKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        performSearch();
      }
    },
    [performSearch],
  );

  const navigateToProfile = useCallback(() => {
    if (!loggedInUser?._id) return;
    navigate(`/profile/${loggedInUser._id}`);
  }, [navigate, loggedInUser?._id]);

  const toggleLogin = useCallback(() => {
    dispatch(setDisplayLogin(true));
  }, [dispatch]);

  return {
    loggedInUser,
    searchRef,
    performSearch,
    handleEnterKey,
    navigateToProfile,
    toggleLogin,
  };
};

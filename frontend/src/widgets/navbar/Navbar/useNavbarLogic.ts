import { useCallback, useRef, type KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setDisplayLogin } from "@/shared/store/slices/ModalSlice";
import { useMe } from "@/entities/user/model/hooks/useMe";

export const useNavbarLogic = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const { user: loggedInUser } = useMe();

  const dispatch = useDispatch();
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
    if (!loggedInUser?.id) return;

    navigate(`/profile/${loggedInUser.id}`);
  }, [navigate, loggedInUser?.id]);

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

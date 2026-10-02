import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "@/shared/store/slices/ModalSlice";

import { useCreateLibraryCardMutation } from "@/entities/library-card/api/libraryCardQueryApi";
import { useMe } from "@/entities/user/model/hooks/useMe";

export const useRegisterLibraryCardForm = () => {
  const dispatch = useDispatch();

  const { user: loggedInUser } = useMe();

  const [createLibraryCardMutation, { data: libraryCard, isLoading }] =
    useCreateLibraryCardMutation();

  const createLibraryCard = useCallback(async () => {
    if (!loggedInUser?.id) return;

    try {
      await createLibraryCardMutation(loggedInUser.id).unwrap();
    } catch (e) {
      console.error("Failed to create library card:", e);
    }
  }, [createLibraryCardMutation, loggedInUser?.id]);

  const openLogin = useCallback(() => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  }, [dispatch]);

  return {
    loggedInUser,
    libraryCard,
    isLoading,
    createLibraryCard,
    openLogin,
  };
};

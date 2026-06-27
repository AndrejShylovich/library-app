import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type {
  AppDispatch,
  RootState,
} from "../../../shared/store/ReduxStore";

import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "../../../shared/store/slices/ModalSlice";

import { getLibraryCard } from "../../../entities/library-card/model/libraryCardSlice";

export const useRegisterLibraryCardForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loggedInUser, libraryCard } = useSelector(
    (state: RootState) => ({
      loggedInUser: state.user.loggedInUser,
      libraryCard: state.libraryCard.libraryCard,
    }),
  );

  const createLibraryCard = useCallback(() => {
    if (!loggedInUser) return;

    dispatch(getLibraryCard(loggedInUser._id));
  }, [dispatch, loggedInUser]);

  const openLogin = useCallback(() => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  }, [dispatch]);

  return {
    loggedInUser,
    libraryCard,
    createLibraryCard,
    openLogin,
  };
};
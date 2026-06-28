import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/shared/store/ReduxStore";
import { setDisplayLogin } from "@/shared/store/slices/ModalSlice";

export const useLoginModalActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = useCallback(() => {
    dispatch(setDisplayLogin(false));
  }, [dispatch]);

  return { closeModal };
};
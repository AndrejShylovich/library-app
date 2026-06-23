import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../shared/store/ReduxStore";
import { setDisplayLibraryCard } from "../../../shared/store/slices/ModalSlice";

export const useLibraryCardModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return {
    closeModal,
  };
};

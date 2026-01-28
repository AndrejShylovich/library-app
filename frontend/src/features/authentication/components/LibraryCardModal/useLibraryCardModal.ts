import { useDispatch } from "react-redux";
import { setDisplayLibraryCard } from "../../../../store/slices/ModalSlice";
import type { AppDispatch } from "../../../../store/ReduxStore";

export const useLibraryCardModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return {
    closeModal,
  };
};
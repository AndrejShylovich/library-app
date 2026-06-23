import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../shared/store/ReduxStore";
import { setDisplayLibraryCard } from "../../../shared/store/slices/ModalSlice";

export const useLibraryCard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    dispatch(setDisplayLibraryCard(true));
  };

  return {
    showModal,
  };
};

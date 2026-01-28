import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/ReduxStore";
import { setDisplayLibraryCard } from "../../../../store/slices/ModalSlice";


export const useLibraryCard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    dispatch(setDisplayLibraryCard(true));
  };

  return {
    showModal,
  };
};

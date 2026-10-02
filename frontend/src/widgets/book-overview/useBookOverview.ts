import { useBookByBarcode } from "@/entities/book/model/hooks/useBookByBarcode";
import { useMe } from "@/entities/user/model/hooks/useMe";

export const useBookOverview = (barcode?: string) => {
  const { book: currentBook, isLoading } = useBookByBarcode(barcode);

  const { user } = useMe();

  return {
    currentBook,
    loading: isLoading,
    user,
  };
};

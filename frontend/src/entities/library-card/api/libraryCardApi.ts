import { api } from "../../../shared/api/axios";

type LibraryCardResponse = {
  libraryCard: {
    _id: string;
  };
};

export const createLibraryCardApi = async (
  userId: string,
): Promise<string> => {
  const { data } = await api.post<LibraryCardResponse>(
    "/card",
    { user: userId },
  );

  return data.libraryCard._id;
};
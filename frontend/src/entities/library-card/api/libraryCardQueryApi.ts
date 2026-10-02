import { baseApi } from "@/shared/api/baseApi";
import {
  hasData,
  unwrapError,
  invalidResponse,
} from "@/shared/api/queryHelpers";

interface CreateLibraryCardResponse {
  libraryCard: {
    _id: string;
  };
}

const isValidLibraryCardResponse = (
  data: unknown,
): data is CreateLibraryCardResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "libraryCard" in data &&
    typeof data.libraryCard === "object" &&
    data.libraryCard !== null &&
    "_id" in data.libraryCard &&
    typeof data.libraryCard._id === "string"
  );
};

export const libraryCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLibraryCard: builder.mutation<string, string>({
      async queryFn(userId, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: "/card",
          method: "POST",
          data: {
            user: userId,
          },
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (
          !hasData<CreateLibraryCardResponse>(result) ||
          !isValidLibraryCardResponse(result.data)
        ) {
          return invalidResponse("Invalid library card response");
        }

        return {
          data: result.data.libraryCard._id,
        };
      },

      invalidatesTags: ["LibraryCard"],
    }),
  }),
});

export const { useCreateLibraryCardMutation } = libraryCardApi;

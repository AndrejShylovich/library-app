import { baseApi } from "@/shared/api/baseApi";

import {
  hasData,
  invalidResponse,
  unwrapError,
} from "@/shared/api/queryHelpers";

import type {
  BookDto,
  BookPageResult,
  CheckinBookDto,
  CheckoutBookDto,
} from "../model/dto/BookDto";

import type { LoanRecordDto } from "@/entities/loan-record/model/dto/LoanRecordDto";

import { createCheckoutRecord } from "../model/lib/createCheckoutRecord";

import { createCheckinRecord } from "../model/lib/createCheckinRecord";

import { normalizeLoanRecord } from "../model/lib/normalizeLoanRecord";

type BookListResponse = {
  books: BookDto[];
};

type BookPageResponse = {
  page: BookPageResult;
};

type BarcodeSearchResponse = {
  page: {
    items: BookDto[];
  };
};

type CardResponse = {
  libraryCard: {
    user: {
      _id: string;
    };
  };
};

type LoanResponse = {
  record: LoanRecordDto;
};

export const bookQueryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BookDto[], void>({
      query: () => ({
        url: "/book",
      }),

      transformResponse: (response: BookListResponse) => response.books,

      providesTags: ["Book"],
    }),

    queryBooks: builder.query<BookPageResult, string>({
      query: (query) => ({
        url: `/book/query${query}`,
      }),

      transformResponse: (response: BookPageResponse) => response.page,

      providesTags: ["Book"],
    }),

    getBookByBarcode: builder.query<BookDto, string>({
      async queryFn(barcode, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: "/book/query",
          params: {
            barcode,
          },
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (!hasData<BarcodeSearchResponse>(result)) {
          return invalidResponse("Invalid barcode search response");
        }

        const [book] = result.data.page.items;

        if (!book) {
          return {
            error: {
              status: 404,
              data: `Book not found: ${barcode}`,
            },
          };
        }

        return {
          data: book,
        };
      },

      providesTags: (_result, _error, barcode) => [
        {
          type: "Book",
          id: barcode,
        },
      ],
    }),

    checkoutBook: builder.mutation<LoanRecordDto, CheckoutBookDto>({
      async queryFn(payload, _api, _extraOptions, baseQuery) {
        const cardResult = await baseQuery({
          url: `/card/${payload.libraryCard}`,
        });

        const cardError = unwrapError(cardResult);

        if (cardError) {
          return cardError;
        }

        if (!hasData<CardResponse>(cardResult)) {
          return invalidResponse("Invalid card response");
        }

        const patronId = cardResult.data.libraryCard.user._id;

        const loanResult = await baseQuery({
          url: "/loan",
          method: "POST",
          data: createCheckoutRecord(payload, patronId),
        });

        const loanError = unwrapError(loanResult);

        if (loanError) {
          return loanError;
        }

        if (!hasData<LoanResponse>(loanResult)) {
          return invalidResponse("Invalid loan response");
        }

        return {
          data: normalizeLoanRecord(loanResult.data.record),
        };
      },

      invalidatesTags: ["Book", "LoanRecord"],
    }),

    checkinBook: builder.mutation<LoanRecordDto, CheckinBookDto>({
      async queryFn(payload, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: "/loan",
          method: "PUT",
          data: createCheckinRecord(payload),
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (!hasData<LoanResponse>(result)) {
          return invalidResponse("Invalid loan response");
        }

        return {
          data: normalizeLoanRecord(result.data.record),
        };
      },

      invalidatesTags: ["Book", "LoanRecord"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useQueryBooksQuery,
  useGetBookByBarcodeQuery,
  useCheckoutBookMutation,
  useCheckinBookMutation,
} = bookQueryApi;

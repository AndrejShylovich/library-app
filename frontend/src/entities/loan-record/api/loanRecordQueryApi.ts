import { baseApi } from "@/shared/api/baseApi";

import {
  hasData,
  invalidResponse,
  unwrapError,
} from "@/shared/api/queryHelpers";

import type { LoanRecordDto } from "../model/dto/LoanRecordDto";


type LoanHistoryResponse = {
  records: LoanRecordDto[];
};


export const loanRecordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoanHistoryByUser: builder.query<LoanRecordDto[], string>({
      async queryFn(
        userId,
        _api,
        _extraOptions,
        baseQuery,
      ) {
        const result = await baseQuery({
          url: "/loan/query",
          method: "POST",
          data: {
            property: "patron",
            value: userId,
          },
        });


        const error = unwrapError(result);

        if (error) {
          return error;
        }


        if (!hasData<LoanHistoryResponse>(result)) {
          return invalidResponse(
            "Invalid loan history response",
          );
        }


        return {
          data: result.data.records,
        };
      },

      providesTags: ["LoanRecord"],
    }),
  }),
});


export const {
  useGetLoanHistoryByUserQuery,
} = loanRecordApi;
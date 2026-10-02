import { useMemo } from "react";


import { LoanRecordMapper } from "../mapper/LoanRecordMapper";
import { useGetLoanHistoryByUserQuery } from "../../api/loanRecordQueryApi";


export const useLoanHistoryByUser = (
  userId?: string,
) => {
  const query = useGetLoanHistoryByUserQuery(
    userId ?? "",
    {
      skip: !userId,
    },
  );


  const records = useMemo(
    () =>
      query.data?.map(
        LoanRecordMapper.toDomain,
      ) ?? [],
    [query.data],
  );


  return {
    ...query,
    records,
  };
};
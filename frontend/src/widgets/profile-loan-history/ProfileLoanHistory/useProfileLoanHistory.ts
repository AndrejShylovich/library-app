import type { DomainLoanRecord } from "@/entities/loan-record/model/domain/LoanRecord";

import { useLoanHistoryByUser } from "@/entities/loan-record/model/hooks/useLoanHistoryByUser";


interface UseProfileLoanHistoryResult {
  records: DomainLoanRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}


export const useProfileLoanHistory = (
  userId: string | undefined,
): UseProfileLoanHistoryResult => {
  const {
    records,
    isLoading,
    error,
    refetch,
  } = useLoanHistoryByUser(userId);


  return {
    records,
    loading: isLoading,
    error: error
      ? "Failed to load loan history"
      : null,
    refetch,
  };
};
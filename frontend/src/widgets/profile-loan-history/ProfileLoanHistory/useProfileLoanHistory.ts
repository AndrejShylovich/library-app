import { useCallback, useEffect, useState } from "react";
import type { DomainLoanRecord } from "../../../entities/loan-record/model/domain/LoanRecord";
import axios from "axios";

interface UseProfileLoanHistoryResult {
  records: DomainLoanRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useProfileLoanHistory = (
  userId: string | undefined,
): UseProfileLoanHistoryResult => {
  const [records, setRecords] = useState<DomainLoanRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(
    async (controller: AbortController) => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        const res = await axios.post<{ records: DomainLoanRecord[] }>(
          `${VITE_API_URL}/loan/query`,
          { property: "patron", value: userId },
          { signal: controller.signal },
        );
        setRecords(res.data.records ?? []);
      } catch (err) {
        if (!axios.isCancel(err)) setError("Failed to load loan history");
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  const refetch = () => {
    const controller = new AbortController();
    fetchRecords(controller);
    return () => controller.abort();
  };

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    fetchRecords(controller);
    return () => controller.abort();
  }, [userId, fetchRecords]);

  return { records, loading, error, refetch };
};

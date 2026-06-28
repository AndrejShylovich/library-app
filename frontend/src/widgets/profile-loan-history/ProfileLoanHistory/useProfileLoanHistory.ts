import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

import type { DomainLoanRecord } from "@/entities/loan-record/model/domain/LoanRecord";

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

  const controllerRef = useRef<AbortController | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!userId) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post<{ records: DomainLoanRecord[] }>(
        `${VITE_API_URL}/loan/query`,
        {
          property: "patron",
          value: userId,
        },
        {
          signal: controller.signal,
        },
      );

      setRecords(res.data.records ?? []);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("Failed to load loan history");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refetch = useCallback(() => {
    fetchRecords();
  }, [fetchRecords]);

  useEffect(() => {
    fetchRecords();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    refetch,
  };
};
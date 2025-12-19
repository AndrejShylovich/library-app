import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/ReduxStore";
import React, { useEffect, useState, useCallback } from "react";
import { ProfileLoanRecord } from "../ProfileLoanRecord/ProfileLoanRecord";
import axios from "axios";
import type { LoanRecord } from "../../../../models/LoanRecord";

interface LoanQueryResponse {
  records: LoanRecord[];
}

export const ProfileLoanHistory: React.FC = () => {
  const user = useSelector((state: RootState) => state.authentification.profileUser);

  const [records, setRecords] = useState<LoanRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async (userId: string, controller: AbortController) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post<LoanQueryResponse>(
        "http://localhost:8000/loan/query",
        { property: "patron", value: userId },
        { signal: controller.signal }
      );
      setRecords(res.data.records ?? []);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("Failed to load loan history");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const controller = new AbortController();
    fetchRecords(user._id, controller);

    return () => controller.abort();
  }, [user, fetchRecords]);

  if (!user) return null;

  return (
    <section className="profile-loan-history">
      <h3 className="profile-loan-header">
        {user.firstName}'s Item Loan History:
      </h3>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && records.length === 0 && <p>No loan records found.</p>}

      {records.map(record => (
        <ProfileLoanRecord key={record._id} record={record} />
      ))}
    </section>
  );
};

import { useSelector } from "react-redux";

import type { RootState } from "../../../shared/store/ReduxStore";

import { useProfileLoanHistory } from "./useProfileLoanHistory";
import { ProfileLoanRecord } from "../../../entities/loan-record/ui/ProfileLoanRecord/ProfileLoanRecord";

import "./ProfileLoanHistory.css";

export const ProfileLoanHistory = () => {
  const user = useSelector(
    (state: RootState) => state.user.profileUser,
  );

  const { records, loading, error } = useProfileLoanHistory(
    user?._id,
  );

  if (!user) return null;

  const isEmpty = !loading && !error && records.length === 0;

  return (
    <section className="profile-loan-history">
      <h3 className="profile-loan-header">
        {user.firstName}'s Item Loan History:
      </h3>

      {loading && <p>Loading...</p>}

      {!loading && error && (
        <p className="error">{error}</p>
      )}

      {isEmpty && <p>No loan records found.</p>}

      {records.map((record) => (
        <ProfileLoanRecord
          key={record.id}
          record={record}
        />
      ))}
    </section>
  );
};
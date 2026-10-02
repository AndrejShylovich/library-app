import { useProfileLoanHistory } from "./useProfileLoanHistory";
import { ProfileLoanRecord } from "@/entities/loan-record/ui/ProfileLoanRecord/ProfileLoanRecord";

import "./ProfileLoanHistory.css";
import type { DomainUser } from "@/entities/user/model/domain/User";

type Props = {
  profileUser: DomainUser;
};

export const ProfileLoanHistory: React.FC<Props> = ({ profileUser }) => {
  const { records, loading, error } = useProfileLoanHistory(profileUser.id);
  const isEmpty = !loading && !error && records.length === 0;

  return (
    <section className="profile-loan-history">
      <h3 className="profile-loan-header">
        {profileUser.firstName}'s Item Loan History:
      </h3>

      {loading && <p>Loading...</p>}

      {!loading && error && <p className="error">{error}</p>}

      {isEmpty && <p>No loan records found.</p>}

      {records.map((record) => (
        <ProfileLoanRecord key={record.id} record={record} />
      ))}
    </section>
  );
};

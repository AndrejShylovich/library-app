import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/ReduxStore";
import { ProfileLoanRecord } from "../ProfileLoanRecord/ProfileLoanRecord";
import { useProfileLoanHistory } from "./useProfileLoanHistory";

export const ProfileLoanHistory: React.FC = () => {
  const user = useSelector((state: RootState) => state.authentication.profileUser);
  const { records, loading, error } = useProfileLoanHistory(user?._id);

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

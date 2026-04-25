import { Bookmark } from "@mui/icons-material";
import type { DomainLoanRecord as LoanRecord } from "../../../../models/domain/LoanRecord";

import "./ProfileLoanRecord.css";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

interface ProfileLoanRecordProps {
  record: LoanRecord;
}

export const ProfileLoanRecord: React.FC<ProfileLoanRecordProps> = ({
  record,
}) => {
  const returned = record.status === "AVAILABLE";

  return (
    <div className="profile-record">
      <h4 className="profile-record-title">{record.item?.title}</h4>

      <div className="profile-record-meta">
        <span className="profile-record-status">
          {returned ? (
            <>
              <AssignmentTurnedInIcon className="record-icon returned" />
              Returned
            </>
          ) : (
            <>
              <Bookmark className="record-icon loaned" />
              Loaned
            </>
          )}
        </span>

        <span>Loan Date: {new Date(record.loanedDate).toDateString()}</span>

        <span>Return by: {new Date(record.dueDate).toDateString()}</span>

        {record.returnedDate && (
          <span>Returned: {new Date(record.returnedDate).toDateString()}</span>
        )}
      </div>
    </div>
  );
};

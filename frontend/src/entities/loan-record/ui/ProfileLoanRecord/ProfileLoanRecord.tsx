import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Bookmark } from "@mui/icons-material";

import type { DomainLoanRecord } from "../../model/domain/LoanRecord";

import "./ProfileLoanRecord.css";
import { formatDate } from "../../../../shared/lib/utils/date.utils";

interface ProfileLoanRecordProps {
  record: DomainLoanRecord;
}

export const ProfileLoanRecord: React.FC<ProfileLoanRecordProps> = ({
  record,
}) => {
  const isReturned = record.status === "AVAILABLE";

  const status = isReturned ? (
    <>
      <AssignmentTurnedInIcon className="record-icon returned" />
      Returned
    </>
  ) : (
    <>
      <Bookmark className="record-icon loaned" />
      Loaned
    </>
  );

  return (
    <div className="profile-record">
      <h4 className="profile-record-title">{record.item?.title}</h4>

      <div className="profile-record-meta">
        <span className="profile-record-status">{status}</span>

        <span>Loan Date: {formatDate(record.loanedDate)}</span>

        <span>Return by: {formatDate(record.dueDate)}</span>

        {record.returnedDate && (
          <span>Returned: {formatDate(record.returnedDate)}</span>
        )}
      </div>
    </div>
  );
};

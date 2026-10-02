import { useEffect, type JSX, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UpdateUserForm } from "@/widgets/update-user-form/UpdateUserForm/UpdateUserForm";
import { ProfileLoanHistory } from "@/widgets/profile-loan-history/ProfileLoanHistory/ProfileLoanHistory";

import { useFetchUser } from "@/entities/user/model/hooks/useFetchUser";
import { useMe } from "@/entities/user/model/hooks/useMe";

import "./ProfilePage.css";

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { user: loggedInUser, isLoading: meLoading } = useMe();

  const canAccess = useMemo(() => {
    if (meLoading) return true;

    if (!loggedInUser || !userId) return false;

    return loggedInUser.id === userId || loggedInUser.role === "EMPLOYEE";
  }, [loggedInUser, userId, meLoading]);

  const { user: profileUser } = useFetchUser(
    {
      userId: userId!,
      property: "profileUser",
    },
    {
      skip: !userId || !canAccess,
    },
  );

  const profileTitle = profileUser
    ? `${profileUser.firstName} ${profileUser.lastName}'s Profile`
    : "Profile";

  useEffect(() => {
    if (meLoading) return;

    if (!userId || !canAccess) {
      navigate("/");
    }
  }, [userId, canAccess, meLoading, navigate]);

  return (
    <main className="page">
      <div className="page-container">
        <h1>{profileTitle}</h1>

        <div className="profile-page-cols">
          <div className="profile-page-left-column profile-panel">
            <UpdateUserForm profileUser={profileUser} />
          </div>

          <div className="profile-page-right-column profile-panel">
            {profileUser && <ProfileLoanHistory profileUser={profileUser} />}
          </div>
        </div>
      </div>
    </main>
  );
}

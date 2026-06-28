import { useEffect, type JSX } from "react";
import type { AppDispatch, RootState } from "@/shared/store/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "@/entities/user/model/userSlice";
import { UpdateUserForm } from "@/widgets/update-user-form/UpdateUserForm/UpdateUserForm";
import { ProfileLoanHistory } from "@/widgets/profile-loan-history/ProfileLoanHistory/ProfileLoanHistory";
import "./ProfilePage.css";

export default function ProfilePage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { loggedInUser, profileUser } = useSelector(
    (state: RootState) => state.user,
  );

  const canAccess =
    loggedInUser?._id === userId || loggedInUser?.type === "EMPLOYEE";

  const profileTitle = profileUser
    ? `${profileUser.firstName} ${profileUser.lastName}'s Profile`
    : "Profile";

  useEffect(() => {
    if (!userId || !canAccess) {
      navigate("/");
      return;
    }

    dispatch(
      fetchUser({
        userId,
        property: "profileUser",
      }),
    );
  }, [userId, canAccess, dispatch, navigate]);

  return (
    <main className="page">
      <div className="page-container">
        <h1>{profileTitle}</h1>

        <div className="profile-page-cols">
          <div className="profile-page-left-column profile-panel">
            <UpdateUserForm />
          </div>
          <div className="profile-page-right-column profile-panel">
            {profileUser && <ProfileLoanHistory />}
          </div>
        </div>
      </div>
    </main>
  );
}

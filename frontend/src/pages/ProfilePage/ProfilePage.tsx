import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/ReduxStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, type JSX } from "react";
import { fetchUser } from "../../store/slices/AuthentificationSlice";

import "./ProfilePage.css";
import { ProfileLoanHistory, UpdateUserForm } from "../../features/profile";

export default function ProfilePage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { loggedInUser, profileUser } = useSelector(
    (state: RootState) => state.authentification
  );

  const canAccess = loggedInUser?._id === userId || loggedInUser?.type === "EMPLOYEE";

  useEffect(() => {
    if (!userId || !canAccess) {
      navigate("/");
      return;
    }

    dispatch(
      fetchUser({
        userId,
        property: "profileUser",
      })
    );
  }, [userId, canAccess, dispatch, navigate]);

  return (
    <main className="page">
      <div className="page-container">
        <h1>
          {profileUser
            ? `${profileUser.firstName} ${profileUser.lastName}'s Profile`
            : "Profile"}
        </h1>

        <div className="profile-page-cols">
          <div className="profile-page-left-column">
            <UpdateUserForm />
          </div>
          <div className="profile-page-right-column">
            {profileUser && <ProfileLoanHistory />}
          </div>
        </div>
      </div>
    </main>
  );
}

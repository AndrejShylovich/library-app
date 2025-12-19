import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { getLibraryCard } from "../../../../store/slices/AuthentificationSlice";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../store/slices/ModalSlice";

export const RegisterLibraryCardForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser, libraryCard } = useSelector((state: RootState) => state.authentification);

  const handleCreateLibraryCard = () => {
    if (loggedInUser) {
      dispatch(getLibraryCard(loggedInUser._id));
    }
  };

  const handleLoginClick = () => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  };

  if (!loggedInUser) {
    return (
      <div className="register-library-card-container">
        <h3 className="register-library-card-text">
          You must be a member of the library to obtain a library card.
        </h3>
        <h4 className="register-library-card-text">
          Use the button below to login to your account or register for free.
        </h4>
        <button className="register-library-modal-button" onClick={handleLoginClick}>
          Login Here
        </button>
      </div>
    );
  }

  return (
    <div className="register-library-card-container">
      <h3 className="register-library-card-text">
        Welcome {loggedInUser.firstName} {loggedInUser.lastName}!
      </h3>
      <h5 className="register-library-card-text">
        To signup for a new library card, or if you forgot the ID number on your card, use the button below.
      </h5>
      {libraryCard ? (
        <p className="register-library-card-text">Your library card number: {libraryCard}</p>
      ) : (
        <button className="register-library-modal-button" onClick={handleCreateLibraryCard}>
          Get Library Card
        </button>
      )}
    </div>
  );
};

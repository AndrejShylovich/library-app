import type React from "react";
import { useRegisterLibraryCardForm } from "./useRegisterLibraryCardForm";
import { Button } from "../../../../shared/ui/Button/Button";

export const RegisterLibraryCardForm: React.FC = () => {
  const { loggedInUser, libraryCard, createLibraryCard, openLogin } =
    useRegisterLibraryCardForm();

  if (!loggedInUser) {
    return (
      <div className="register-library-card-container">
        <h3 className="register-library-card-text">
          You must be a member of the library to obtain a library card.
        </h3>
        <h4 className="register-library-card-text">
          Use the button below to login to your account or register for free.
        </h4>
        <Button className="register-library-modal-button" onClick={openLogin}>
          Login Here
        </Button>
      </div>
    );
  }

  return (
    <div className="register-library-card-container">
      <h3 className="register-library-card-text">
        Welcome {loggedInUser.firstName} {loggedInUser.lastName}!
      </h3>
      <h5 className="register-library-card-text">
        To signup for a new library card, or if you forgot the ID number on your
        card, use the button below.
      </h5>
      {libraryCard ? (
        <p className="register-library-card-text">
          Your library card number: {libraryCard}
        </p>
      ) : (
        <Button
          className="register-library-modal-button"
          variant="secondary"
          onClick={createLibraryCard}
        >
          Get Library Card
        </Button>
      )}
    </div>
  );
};

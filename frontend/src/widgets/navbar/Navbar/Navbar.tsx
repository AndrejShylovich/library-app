import { Link } from "react-router-dom";

import {
  AccountCircle,
  Book,
  MenuBook,
  Person,
  Search,
} from "@mui/icons-material";

import { ThemeToggle } from "../../../features/theme-toggle/ThemeToggle";
import { Input } from "../../../shared/ui/Input/Input";

import { useNavbarLogic } from "./useNavbarLogic";
import "./Navbar.css";

const iconSx = {
  display: { xs: "block", md: "none" },
  fontSize: "1.4rem",
};

export const Navbar = () => {
  const {
    loggedInUser,
    searchRef,
    performSearch,
    handleEnterKey,
    navigateToProfile,
    toggleLogin,
  } = useNavbarLogic();

  return (
    <nav className="navbar">
      {/* LEFT */}
      <Link to="/" className="navbar-logo-section">
        <Book className="navbar-logo-icon" />
        <h3>My Library</h3>
      </Link>

      <ThemeToggle />

      {/* RIGHT */}
      <div className="navbar-right-section">
        <Link to="/catalog" className="navbar-option">
          <h3>Catalog</h3>
          <MenuBook sx={iconSx} />
        </Link>

        {/* SEARCH */}
        <div className="navbar-search-box">
          <Input
            className="navbar-search-input"
            placeholder="Search Catalog"
            onKeyDown={handleEnterKey}
            ref={searchRef}
          />
          <Search
            onClick={performSearch}
            sx={{ cursor: "pointer", fontSize: "2rem" }}
          />
        </div>

        {/* AUTH */}
        {loggedInUser ? (
          <button
            type="button"
            className="navbar-option"
            onClick={navigateToProfile}
          >
            <h2>{loggedInUser.firstName}</h2>
            <AccountCircle sx={iconSx} />
          </button>
        ) : (
          <button
            type="button"
            className="navbar-option"
            onClick={toggleLogin}
          >
            <h2>Login</h2>
            <Person sx={iconSx} />
          </button>
        )}
      </div>
    </nav>
  );
};
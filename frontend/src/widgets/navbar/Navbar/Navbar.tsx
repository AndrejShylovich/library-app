import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavbarLogic } from "./useNavbarLogic";
import {
  AccountCircle,
  Book,
  MenuBook,
  Person,
  Search,
} from "@mui/icons-material";
import { ThemeToggle } from "../../../features/theme-toggle/ThemeToggle";
import { Input } from "../../../shared/ui/Input/Input";

export const Navbar: React.FC = () => {
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
      <Link to="/" className="navbar-logo-section">
        <Book className="navbar-logo-icon" /> <h3>My Library</h3>
      </Link>
      <ThemeToggle />
      <div className="navbar-right-section">
        <Link to="/catalog" className="navbar-option">
          <h3>Catalog</h3>
          <MenuBook
            className="navbar-option-icon"
            onClick={performSearch}
            sx={{
              display: { xs: "block", md: "none" },
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
          />
        </Link>
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
        {loggedInUser ? (
          <div className="navbar-option" onClick={navigateToProfile}>
            <h2>{loggedInUser.firstName}</h2>
            <AccountCircle
              sx={{ display: { xs: "block", md: "none" }, fontSize: "1.4rem" }}
            />
          </div>
        ) : (
          <div className="navbar-option" onClick={toggleLogin}>
            <h2>Login</h2>
            <Person
              sx={{ display: { xs: "block", md: "none" }, fontSize: "1.4rem" }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

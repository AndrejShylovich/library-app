import { Link } from "react-router-dom";
import { Book, Search } from "@mui/icons-material";
import "./Navbar.css";
import { useNavbarLogic } from "./useNavbarLogic";
import { Input } from "../../../../shared/ui/Input/Input";

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
        <Book sx={{ fontSize: "1rem" }} />
        <h3>My Library</h3>
      </Link>


      <div className="navbar-right-section">
        <Link to="/catalog" className="navbar-option navbar-link">
          <h3>Catalog</h3>
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
          </div>
        ) : (
          <div className="navbar-option" onClick={toggleLogin}>
            <h2>Login</h2>
          </div>
        )}
      </div>
    </nav>
  );
};

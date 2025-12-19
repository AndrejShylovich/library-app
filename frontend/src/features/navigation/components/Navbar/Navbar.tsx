import { useRef, type KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { Link, useNavigate } from "react-router-dom";
import { setDisplayLogin } from "../../../../store/slices/ModalSlice";
import { Book, Search } from "@mui/icons-material";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useSelector((state: RootState) => state.authentification);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const performSearch = () => {
    const query = searchRef.current?.value.trim();
    if (query) {
      navigate(`/catalog?title=${query}`);
      if (searchRef.current) searchRef.current.value = "";
    }
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch();
  };

  const navigateToProfile = () => {
    if (loggedInUser?._id) navigate(`/profile/${loggedInUser._id}`);
  };

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  };

  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <Link to="/" className="navbar-logo-section">
        <Book sx={{ fontSize: "1rem" }} />
        <h3>My Library</h3>
      </Link>

      {/* Main menu + search + profile */}
      <div className="navbar-right-section">
        <Link to="/catalog" className="navbar-option navbar-link">
          <h3>Catalog</h3>
        </Link>

        <div className="navbar-search-box">
          <input
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

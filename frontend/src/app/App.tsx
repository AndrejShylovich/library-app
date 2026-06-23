import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../shared/store/ReduxStore";
import { useEffect } from "react";
import { fetchUser } from "../entities/user/model/userSlice";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ResourcePage from "../pages/ResourcePage/ResourcePage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import HomePage from "../pages/HomePage/HomePage";
import LayoutPage from "../pages/LayoutPage/LayoutPage";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId && !loggedInUser) {
      dispatch(fetchUser({ userId, property: "loggedInUser" }));
    }
  }, [loggedInUser, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/resource/:barcode" element={<ResourcePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

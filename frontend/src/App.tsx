import { useEffect } from "react";

import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/ReduxStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import { fetchUser } from "./store/slices/AuthentificationSlice";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import ResourcePage from "./pages/RecoursePage/RecoursePage";

function App() {
  const loggedInUser = useSelector(
    (state: RootState) => state.authentification.loggedInUser
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && !loggedInUser) {
      dispatch(fetchUser({
        userId,
        property: 'loggedInUser'
      }));
    }
  }, [loggedInUser, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage/>}>
          <Route path="" element={<HomePage/>} />
          <Route path="/catalog" element={<CatalogPage/>} />
          <Route path="/resource/:barcode" element={<ResourcePage/>} />
          <Route path="/profile/:userId" element={<ProfilePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

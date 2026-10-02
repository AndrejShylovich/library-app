import { Routes, Route } from "react-router-dom";

import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import ResourcePage from "@/pages/ResourcePage/ResourcePage";
import CatalogPage from "@/pages/CatalogPage/CatalogPage";
import HomePage from "@/pages/HomePage/HomePage";
import LayoutPage from "@/pages/LayoutPage/LayoutPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />} />

        <Route path="catalog" element={<CatalogPage />} />

        <Route path="resource/:barcode" element={<ResourcePage />} />

        <Route path="profile/:userId" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

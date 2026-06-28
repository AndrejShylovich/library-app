import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import type { RootState } from "@/shared/store/ReduxStore";

import { LoginRegisterModal } from "@/features/auth/LoginRegisterModal/LoginRegisterModal";
import { LibraryCardModal } from "@/features/auth/LibraryCardModal/LibraryCardModal";
import { LoanBookModal } from "@/features/book/LoanBookModal/LoanBookModal";

import { Navbar } from "@/widgets/navbar/Navbar/Navbar";
import { Footer } from "@/widgets/footer/Footer/Footer";

import ErrorBoundary from "@/shared/ui/ErrorBoundary/ErrorBoundary";

import "./LayoutPage.css";
import { PageErrorFallback } from "@/shared/ui/PageErrorFallback/PageErrorFallback";

export default function LayoutPage() {
  const modal = useSelector((state: RootState) => state.modal);

  return (
    <div className="layout-page">
      {modal.displayLogin && <LoginRegisterModal />}
      {modal.displayLibraryCard && <LibraryCardModal />}
      {modal.displayLoan && <LoanBookModal />}

      <Navbar />

      <main className="layout-content">
        <ErrorBoundary fallback={<PageErrorFallback />}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
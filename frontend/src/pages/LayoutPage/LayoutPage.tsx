import type { JSX } from "react";
import type { RootState } from "../../shared/store/ReduxStore";
import { useSelector } from "react-redux";
import { LoginRegisterModal } from "../../features/auth/LoginRegisterModal/LoginRegisterModal";
import { LibraryCardModal } from "../../features/auth/LibraryCardModal/LibraryCardModal";
import { LoanBookModal } from "../../features/book/LoanBookModal/LoanBookModal";
import { Navbar } from "../../widgets/navbar/Navbar/Navbar";
import ErrorBoundary from "../../shared/ui/ErrorBoundary/ErrorBoundary";
import { Outlet } from "react-router-dom";
import { Footer } from "../../widgets/footer/Footer/Footer";
import "./LayoutPage.css";

export default function LayoutPage(): JSX.Element {
  const { displayLogin, displayLibraryCard, displayLoan } = useSelector(
    (state: RootState) => state.modal,
  );

  return (
    <div className="layout-page">
      {displayLogin && <LoginRegisterModal />}
      {displayLibraryCard && <LibraryCardModal />}
      {displayLoan && <LoanBookModal />}

      <Navbar />

      <main className="layout-content">
        <ErrorBoundary
          fallback={
            <div style={{ padding: "2rem" }}>
              <h2>Page Error</h2>
              <p>Please return to the homepage or try again later.</p>
              <button onClick={() => (window.location.href = "/")}>
                Go Home
              </button>
            </div>
          }
        >
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}

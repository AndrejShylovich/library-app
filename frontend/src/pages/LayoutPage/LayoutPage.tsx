import { useSelector } from "react-redux";
import type { RootState } from "../../store/ReduxStore";
import {
  LibraryCardModal,
  LoginRegisterModal,
} from "../../features/authentication/components";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../features/navigation";
import { LoanBookModal } from "../../features/book/components";
import type { JSX } from "react";
import ErrorBoundary from "../../shared/ui/ErrorBoundary/ErrorBoundary";

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

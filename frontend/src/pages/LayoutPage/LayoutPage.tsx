import { useSelector } from "react-redux";
import type { RootState } from "../../store/ReduxStore";
import {
  LibraryCardModal,
  LoginRegisterModal,
} from "../../features/authentification/components";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../features/navigation";
import { LoanBookModal } from "../../features/book/components";
import type { JSX } from "react";

export default function LayoutPage(): JSX.Element {
  const { displayLogin, displayLibraryCard, displayLoan } = useSelector(
    (state: RootState) => state.modal
  );

  return (
    <div className="layout-page">
      {/* Модальные окна */}
      {displayLogin && <LoginRegisterModal />}
      {displayLibraryCard && <LibraryCardModal />}
      {displayLoan && <LoanBookModal />}

      <Navbar />

      {/* Основная область страницы */}
      <main className="layout-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

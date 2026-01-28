import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginRegisterModal } from "./LoginRegisterModal";

vi.mock("./useLoginRegisterModal", () => ({
  useLoginRegisterModal: vi.fn(),
}));

import { useLoginRegisterModal } from "./useLoginRegisterModal";
const mockUseLoginRegisterModal = useLoginRegisterModal as unknown as Mock;

vi.mock("../LoginForm/LoginForm", () => ({
  LoginForm: ({ toggleRegister }: { toggleRegister: () => void }) => (
    <div data-testid="login-form" onClick={toggleRegister}>
      LoginForm
    </div>
  ),
}));

vi.mock("../RegisterForm/RegisterForm", () => ({
  RegisterForm: ({ toggleLogin }: { toggleLogin: () => void }) => (
    <div data-testid="register-form" onClick={toggleLogin}>
      RegisterForm
    </div>
  ),
}));

vi.mock("../../../../shared/ui/Modal/Modal", () => ({
  Modal: ({
    children,
    toggleModal,
  }: {
    children: React.ReactNode;
    toggleModal: () => void;
  }) => (
    <div data-testid="modal">
      <button data-testid="close-modal" onClick={toggleModal}>
        close
      </button>
      {children}
    </div>
  ),
}));

describe("LoginRegisterModal", () => {
  const closeModal = vi.fn();
  const toggleForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders LoginForm when isLogin = true", () => {
    mockUseLoginRegisterModal.mockReturnValue({
      isLogin: true,
      closeModal,
      toggleForm,
    });

    render(<LoginRegisterModal />);

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.queryByTestId("register-form")).not.toBeInTheDocument();
  });

  it("renders RegisterForm when isLogin = false", () => {
    mockUseLoginRegisterModal.mockReturnValue({
      isLogin: false,
      closeModal,
      toggleForm,
    });

    render(<LoginRegisterModal />);

    expect(screen.getByTestId("register-form")).toBeInTheDocument();
    expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
  });

  it("passes toggleForm to LoginForm", () => {
    mockUseLoginRegisterModal.mockReturnValue({
      isLogin: true,
      closeModal,
      toggleForm,
    });

    render(<LoginRegisterModal />);

    fireEvent.click(screen.getByTestId("login-form"));

    expect(toggleForm).toHaveBeenCalled();
  });

  it("passes toggleForm to RegisterForm", () => {
    mockUseLoginRegisterModal.mockReturnValue({
      isLogin: false,
      closeModal,
      toggleForm,
    });

    render(<LoginRegisterModal />);

    fireEvent.click(screen.getByTestId("register-form"));

    expect(toggleForm).toHaveBeenCalled();
  });

  it("passes closeModal to Modal", () => {
    mockUseLoginRegisterModal.mockReturnValue({
      isLogin: true,
      closeModal,
      toggleForm,
    });

    render(<LoginRegisterModal />);

    fireEvent.click(screen.getByTestId("close-modal"));

    expect(closeModal).toHaveBeenCalled();
  });
});

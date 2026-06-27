import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { LoginForm } from "./LoginForm";
import type React from "react";

vi.mock("./useLoginForm", () => ({
  useLoginForm: vi.fn(),
}));

vi.mock("../../../shared/ui/Input/Input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

vi.mock("../../../shared/ui/Button/Button", () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
}));

import { useLoginForm } from "./useLoginForm";

const mockUseLoginForm = useLoginForm as unknown as Mock;

describe("LoginForm", () => {
  const toggleRegister = vi.fn();
  const handleSubmit = vi.fn((e) => e.preventDefault());

  const baseState = {
    email: "",
    password: "",
    error: false,
    loading: false,
    handleEmailChange: vi.fn(),
    handlePasswordChange: vi.fn(),
    handleSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseLoginForm.mockReturnValue(baseState);
  });

  it("renders login form", () => {
    render(<LoginForm toggleRegister={vi.fn()} />);

    expect(screen.getByText("Please Login")).toBeInTheDocument();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("shows error message when error is true", () => {
    mockUseLoginForm.mockReturnValue({
      ...baseState,
      error: true,
    });

    render(<LoginForm toggleRegister={toggleRegister} />);

    expect(
      screen.getByText("Username or password incorrect"),
    ).toBeInTheDocument();
  });

  it("disables submit button when loading", () => {
    mockUseLoginForm.mockReturnValue({
      ...baseState,
      loading: true,
    });

    render(<LoginForm toggleRegister={toggleRegister} />);

    const button = screen.getByRole("button", { name: "Logging in..." });

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Logging in...");
  });

  it("calls handleSubmit on form submit", () => {
    render(<LoginForm toggleRegister={toggleRegister} />);

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls toggleRegister on click", () => {
    render(<LoginForm toggleRegister={toggleRegister} />);

    fireEvent.click(screen.getByText("Create one here"));

    expect(toggleRegister).toHaveBeenCalled();
  });
});

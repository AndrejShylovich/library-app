import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";

vi.mock("./useRegisterForm", () => ({
  useRegisterForm: vi.fn(),
}));

import { useRegisterForm } from "./useRegisterForm";
const mockUseRegisterForm = useRegisterForm as unknown as Mock;

vi.mock("../../../../shared/ui/Input/Input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

vi.mock("../../../../shared/ui/Button/Button", () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
}));

describe("RegisterForm", () => {
  const toggleLogin = vi.fn();
  const handleChange = vi.fn();
  const handleSubmit = vi.fn((e) => e.preventDefault());

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseRegisterForm.mockReturnValue({
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      error: false,
      loading: false,
      registerSuccess: false,
      handleChange,
      handleSubmit,
    });
  });

  it("renders register form", () => {
    render(<RegisterForm toggleLogin={toggleLogin} />);

    expect(screen.getByText("Enter your information")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("first")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("last")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" }),
    ).toBeInTheDocument();
  });

  it("shows error message when error is true", () => {
    mockUseRegisterForm.mockReturnValueOnce({
      ...mockUseRegisterForm(),
      error: true,
    });

    render(<RegisterForm toggleLogin={toggleLogin} />);
    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });

  it("disables submit button when loading", () => {
    mockUseRegisterForm.mockReturnValueOnce({
      ...mockUseRegisterForm(),
      loading: true,
    });

    render(<RegisterForm toggleLogin={toggleLogin} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls handleChange on input change", () => {
    render(<RegisterForm toggleLogin={toggleLogin} />);
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@mail.com" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls handleSubmit on form submit", () => {
    render(<RegisterForm toggleLogin={toggleLogin} />);
    fireEvent.submit(screen.getByRole("button"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("shows success message and calls toggleLogin", () => {
    mockUseRegisterForm.mockReturnValueOnce({
      ...mockUseRegisterForm(),
      registerSuccess: true,
    });

    render(<RegisterForm toggleLogin={toggleLogin} />);

    const loginLink = screen.getByText("Login here.");
    expect(screen.getByText("Registered Successfully.")).toBeInTheDocument();

    fireEvent.click(loginLink);
    expect(toggleLogin).toHaveBeenCalled();
  });
});

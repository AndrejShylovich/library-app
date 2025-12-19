import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { LoginForm } from "./LoginForm";
import * as AuthentificationSlice from "../../../../store/slices/AuthentificationSlice";
import type { AppDispatch } from "../../../../store/ReduxStore";

// Локальный тип для теста
interface LoginUserPayload {
  email: string;
  password: string;
}

// Мокаем async thunk
vi.mock("../../../../store/slices/AuthentificationSlice", () => ({
  loginUser: vi.fn(),
}));

// Создаем мок Redux store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      authentification: (state = { error: null, loading: false, ...initialState }) => state,
    },
  });
};

describe("LoginForm", () => {
  const mockToggleRegister = vi.fn();
  let mockLoginUser: typeof AuthentificationSlice.loginUser;

  beforeEach(() => {
    vi.clearAllMocks();

    // Мок thunk, тип безопасный для TypeScript
    mockLoginUser = vi.fn(() => {
      // Возвращаем функцию thunk
      return async (dispatch: AppDispatch) => {
        const payload: LoginUserPayload = { email: "test@example.com", password: "password123" };
        dispatch({ type: "authentification/loginUser/fulfilled", payload });
        return { type: "authentification/loginUser/fulfilled", payload };
      };
    }) as unknown as typeof AuthentificationSlice.loginUser;

    vi.mocked(AuthentificationSlice.loginUser).mockImplementation(mockLoginUser);
  });

  it("renders login form with all elements", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    expect(screen.getByText("Please Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it("updates email input value on change", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  it("updates password input value on change", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(passwordInput.value).toBe("password123");
  });

  
  it("does not dispatch loginUser when email is empty", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  it("does not dispatch loginUser when password is empty", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  it("displays error message when error is present in state", () => {
    const store = createMockStore({ error: "Invalid credentials" });
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    expect(screen.getByText("Username or password incorrect")).toBeInTheDocument();
  });

  it("does not display error message when error is null", () => {
    const store = createMockStore({ error: null });
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    expect(screen.queryByText("Username or password incorrect")).not.toBeInTheDocument();
  });

  it("displays 'Logging in...' when loading is true", () => {
    const store = createMockStore({ loading: true });
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    expect(screen.getByText("Logging in...")).toBeInTheDocument();
  });

  it("disables submit button when loading is true", () => {
    const store = createMockStore({ loading: true });
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /logging in/i });
    expect(submitButton).toBeDisabled();
  });

  it("calls toggleRegister when register link is clicked", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <LoginForm toggleRegister={mockToggleRegister} />
      </Provider>
    );

    const registerLink = screen.getByText("Create one here.");
    fireEvent.click(registerLink);

    expect(mockToggleRegister).toHaveBeenCalledTimes(1);
  });

});

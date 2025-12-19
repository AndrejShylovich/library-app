import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { RegisterForm } from "./RegisterForm";

// Тип состояния
type AuthState = {
  authentification: {
    loading: boolean;
    error: boolean;
    registerSuccess: boolean;
  };
};

// Мок редьюсера
const mockReducer = (
  state: AuthState = {
    authentification: {
      loading: false,
      error: false,
      registerSuccess: false,
    },
  }
) => state;

// Мок thunk
vi.mock("../../../../store/slices/AuthentificationSlice", () => ({
  registerUser: vi.fn((payload) => ({
    type: "auth/registerUser",
    payload,
  })),
  resetRegisterSuccess: vi.fn(() => ({
    type: "auth/resetRegisterSuccess",
  })),
}));

import { registerUser } from "../../../../store/slices/AuthentificationSlice";

// Функция для создания store
const createStore = (preloadedState?: AuthState) =>
  configureStore({
    reducer: mockReducer,
    preloadedState,
  });

describe("RegisterForm", () => {
  const toggleLoginMock = vi.fn();

  it("рендерит форму регистрации", () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <RegisterForm toggleLogin={toggleLoginMock} />
      </Provider>
    );

    expect(screen.getByText("Enter your information")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("first")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("last")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  it("вызывает registerUser при submit формы", () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <RegisterForm toggleLogin={toggleLoginMock} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("first"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("last"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(registerUser).toHaveBeenCalledWith({
      type: "PATRON",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    });
  });

  it("показывает сообщение об ошибке, если error=true в store", () => {
    const store = createStore({
      authentification: {
        loading: false,
        error: true,
        registerSuccess: false,
      },
    });

    render(
      <Provider store={store}>
        <RegisterForm toggleLogin={toggleLoginMock} />
      </Provider>
    );

    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });

  it("блокирует кнопку при loading=true", () => {
    const store = createStore({
      authentification: {
        loading: true,
        error: false,
        registerSuccess: false,
      },
    });

    render(
      <Provider store={store}>
        <RegisterForm toggleLogin={toggleLoginMock} />
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Register");
  });

  it("показывает успешное сообщение и вызывает toggleLogin при клике на ссылку", () => {
    const store = createStore({
      authentification: {
        loading: false,
        error: false,
        registerSuccess: true,
      },
    });

    render(
      <Provider store={store}>
        <RegisterForm toggleLogin={toggleLoginMock} />
      </Provider>
    );

    expect(screen.getByText(/Registered Successfully/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Login here."));
    expect(toggleLoginMock).toHaveBeenCalled();
  });
});

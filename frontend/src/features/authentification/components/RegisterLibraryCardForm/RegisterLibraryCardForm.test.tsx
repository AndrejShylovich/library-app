import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, type AnyAction } from "@reduxjs/toolkit";
import type { Reducer } from "@reduxjs/toolkit"; // type-only import
import { RegisterLibraryCardForm } from "./RegisterLibraryCardForm";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../store/slices/ModalSlice";

// Тип состояния для Redux store
type AuthState = {
  authentification: {
    loggedInUser: { _id: string; firstName: string; lastName: string } | null;
    libraryCard: string | null;
  };
};

// Правильный мок-редьюсер
const mockReducer: Reducer<AuthState, AnyAction> = (
  state: AuthState | undefined
) => {
  // state по умолчанию
  if (!state) {
    return {
      authentification: {
        loggedInUser: null,
        libraryCard: null,
      },
    };
  }
  return state;
};

vi.mock("../../../../store/slices/AuthentificationSlice", () => ({
  getLibraryCard: vi.fn((userId: string) => ({ type: "auth/getLibraryCard", payload: userId })),
}));

vi.mock("../../../../store/slices/ModalSlice", () => ({
  setDisplayLibraryCard: vi.fn((value: boolean) => ({ type: "modal/setDisplayLibraryCard", payload: value })),
  setDisplayLogin: vi.fn((value: boolean) => ({ type: "modal/setDisplayLogin", payload: value })),
}));

// Функция для создания store
const createStore = (preloadedState?: AuthState) =>
  configureStore({
    reducer: mockReducer,
    preloadedState,
  });

describe("RegisterLibraryCardForm", () => {
  let store = createStore();

  beforeEach(() => {
    store = createStore();
    store.dispatch = vi.fn();
  });

  it("renders login prompt if user is not logged in", () => {
    render(
      <Provider store={store}>
        <RegisterLibraryCardForm />
      </Provider>
    );

    expect(screen.getByText(/You must be a member of the library/i)).toBeInTheDocument();
    expect(screen.getByText(/Login Here/i)).toBeInTheDocument();
  });

  it("dispatches modal actions when login button is clicked", () => {
    render(
      <Provider store={store}>
        <RegisterLibraryCardForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Login Here/i));
    expect(store.dispatch).toHaveBeenCalledWith(setDisplayLibraryCard(false));
    expect(store.dispatch).toHaveBeenCalledWith(setDisplayLogin(true));
  });

  it("renders get library card button if user is logged in but has no card", () => {
    store = createStore({
      authentification: {
        loggedInUser: { _id: "123", firstName: "John", lastName: "Doe" },
        libraryCard: null,
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <RegisterLibraryCardForm />
      </Provider>
    );

    expect(screen.getByText(/Welcome John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Library Card/i)).toBeInTheDocument();
  });

  it("dispatches getLibraryCard when get library card button is clicked", () => {
    store = createStore({
      authentification: {
        loggedInUser: { _id: "123", firstName: "John", lastName: "Doe" },
        libraryCard: null,
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <RegisterLibraryCardForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Get Library Card/i));
    expect(store.dispatch).toHaveBeenCalled(); // Можно добавить проверку payload
  });

  it("renders library card number if user already has one", () => {
    store = createStore({
      authentification: {
        loggedInUser: { _id: "123", firstName: "John", lastName: "Doe" },
        libraryCard: "LIB-456",
      },
    });

    render(
      <Provider store={store}>
        <RegisterLibraryCardForm />
      </Provider>
    );

    expect(screen.getByText(/Your library card number: LIB-456/i)).toBeInTheDocument();
  });
});

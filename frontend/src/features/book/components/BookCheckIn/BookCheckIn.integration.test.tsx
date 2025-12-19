import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, type Store } from "@reduxjs/toolkit";

import authentificationReducer from "../../../../store/slices/AuthentificationSlice";
import bookReducer from "../../../../store/slices/BookSlice";
import modalReducer from "../../../../store/slices/ModalSlice";
import { checkinBook } from "../../../../store/slices/BookSlice";
import { BookCheckin } from "./BookCheckIn";
import type { RootState } from "../../../../store/ReduxStore";

// ------------------------------
// TEST STORE
// ------------------------------
const createTestStore = (preloaded = {}) =>
  configureStore({
    reducer: {
      authentification: authentificationReducer,
      book: bookReducer,
      modal: modalReducer,
    },
    preloadedState: preloaded,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: false,
      }),
  });

// ------------------------------
// MOCK BOOK + USER
// ------------------------------
const mockBook = {
  _id: "123",
  title: "Mock Book",
  barcode: "999",
};

const mockUser = {
  _id: "emp1",
  type: "EMPLOYEE",
};

// ------------------------------
// WRAPPER
// ------------------------------
const renderWithStore = (store: Store<RootState>) =>
  render(
    <Provider store={store}>
      <BookCheckin />
    </Provider>
  );

// ------------------------------
// MOCK DISPATCH SPY
// ------------------------------
vi.mock("../../../../store/slices/BookSlice", async () => {
  const actual = await vi.importActual<
    typeof import("../../../../store/slices/BookSlice")
  >("../../../../store/slices/BookSlice");
  return {
    ...actual,
    checkinBook: vi.fn((payload) => ({
      type: "book/checkinBook",
      payload,
    })),
  };
});

describe("BookCheckin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ------------------------------
  // RENDERING
  // ------------------------------
  it("renders empty div when no user or no book", () => {
    const store = createTestStore({
      authentification: { loggedInUser: undefined },
      book: { currentBook: undefined },
    });

    renderWithStore(store);

    const container = document.querySelector(".book-checkin");
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("Check In Book:")).not.toBeInTheDocument();
  });

  it("renders form when user and book exist", () => {
    const store = createTestStore({
      authentification: { loggedInUser: mockUser },
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    expect(
      screen.getByText(`Check In Book: ${mockBook.title}`)
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Employee ID")).toHaveValue(mockUser._id);
  });

  // ------------------------------
  // BUTTON LOGIC
  // ------------------------------
  it("dispatches checkinBook + closes modal + clears book", () => {
    const store = createTestStore({
      authentification: { loggedInUser: mockUser },
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: "Check In Book" }));

    // --- check dispatch of checkinBook() ---
    expect(checkinBook).toHaveBeenCalledTimes(1);
    expect(checkinBook).toHaveBeenCalledWith({
      book: mockBook,
      employee: mockUser,
    });

    const actions = store.getState();

    // setCurrentBook(undefined) fired
    expect(actions.book.currentBook).toBe(undefined);

    // setDisplayLoan(false) fired
    expect(actions.modal.displayLoan).toBe(false);
  });

  // ------------------------------
  // DOES NOT RUN checkinBook WHEN BOOK OR USER IS MISSING
  // ------------------------------
  it("does not dispatch checkinBook if missing user or book", () => {
    const store = createTestStore({
      authentification: { loggedInUser: undefined }, // нет user
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    // Кнопки НЕТ
    expect(
      screen.queryByRole("button", { name: "Check In Book" })
    ).not.toBeInTheDocument();

    // Компонент сам должен был очистить стейт? — НЕТ.
    // Очищение происходит только при нажатии.
    // Но раз кнопки нет — handleCheckin НЕ вызывается.
    // Поэтому МЫ НЕ очищаем state.

    const state = store.getState();

    // checkinBook НЕ вызывался
    expect(checkinBook).not.toHaveBeenCalled();

    // Но ВАЖНО: компонент НЕ вызывает setCurrentBook и setDisplayLoan
    // потому что они вызываются только внутри handleCheckin.
    // handleCheckin не запускался → state не должен измениться.

    expect(state.book.currentBook).toBe(mockBook);
    expect(state.modal.displayLoan).toBe(true);
  });
});

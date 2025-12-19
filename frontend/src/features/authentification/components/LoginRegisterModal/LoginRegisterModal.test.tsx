import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { LoginRegisterModal } from "./LoginRegisterModal";
import { setDisplayLogin } from "../../../../store/slices/ModalSlice";

const mockStore = configureStore([]);

const initialState = {
  authentification: {
    loggedInUser: null,
  },
};

describe("LoginRegisterModal", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
    localStorage.clear();
  });

  it("renders the LoginForm by default", () => {
    render(
      <Provider store={store}>
        <LoginRegisterModal />
      </Provider>
    );

    // Проверяем заголовок LoginForm
    expect(
      screen.getByRole("heading", { level: 2, name: /Please Login/i })
    ).toBeInTheDocument();

    // Проверяем, что кнопка Login присутствует
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  

  it("dispatches setDisplayLogin(false) when modal is closed", () => {
    render(
      <Provider store={store}>
        <LoginRegisterModal />
      </Provider>
    );

    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    expect(store.dispatch).toHaveBeenCalledWith(setDisplayLogin(false));
  });

  it("sets localStorage and closes modal if loggedInUser exists", () => {
    const userStore = mockStore({
      authentification: { loggedInUser: { _id: "123", name: "Test User" } },
    });
    userStore.dispatch = vi.fn();

    render(
      <Provider store={userStore}>
        <LoginRegisterModal />
      </Provider>
    );

    expect(localStorage.getItem("userId")).toBe("123");
    expect(userStore.dispatch).toHaveBeenCalledWith(setDisplayLogin(false));
  });
});


/*it("toggles to RegisterForm when toggleForm is clicked", () => {
    render(
      <Provider store={store}>
        <LoginRegisterModal />
      </Provider>
    );

    const toggleButton = screen.getByText(/Create one here/i);
    fireEvent.click(toggleButton);

    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });*/
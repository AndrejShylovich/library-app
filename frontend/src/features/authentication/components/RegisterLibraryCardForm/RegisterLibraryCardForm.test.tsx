import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterLibraryCardForm } from "./RegisterLibraryCardForm";
import { useRegisterLibraryCardForm } from "./useRegisterLibraryCardForm";
import type { MockedFunction } from "vitest";

vi.mock("./useRegisterLibraryCardForm", () => ({
  useRegisterLibraryCardForm: vi.fn(),
}));

describe("RegisterLibraryCardForm", () => {
  const openLoginMock = vi.fn();
  const createLibraryCardMock = vi.fn();

  const useRegisterLibraryCardFormMock =
    useRegisterLibraryCardForm as MockedFunction<
      typeof useRegisterLibraryCardForm
    >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login prompt if user is not logged in", () => {
    useRegisterLibraryCardFormMock.mockReturnValue({
      loggedInUser: undefined,
      libraryCard: "",
      openLogin: openLoginMock,
      createLibraryCard: createLibraryCardMock,
    });

    render(<RegisterLibraryCardForm />);

    expect(
      screen.getByText(/you must be a member of the library/i),
    ).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: /login here/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(openLoginMock).toHaveBeenCalledTimes(1);
  });

  it("renders welcome message and library card button if user is logged in but has no card", () => {
    useRegisterLibraryCardFormMock.mockReturnValue({
      loggedInUser: {
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        type: "PATRON",
        email: "john@doe.com",
        password: "123456",
      },
      libraryCard: "",
      openLogin: openLoginMock,
      createLibraryCard: createLibraryCardMock,
    });

    render(<RegisterLibraryCardForm />);

    expect(screen.getByText(/welcome John Doe/i)).toBeInTheDocument();
    const getCardButton = screen.getByRole("button", {
      name: /get library card/i,
    });
    expect(getCardButton).toBeInTheDocument();

    fireEvent.click(getCardButton);
    expect(createLibraryCardMock).toHaveBeenCalledTimes(1);
  });

  it("renders library card number if user has a card", () => {
    useRegisterLibraryCardFormMock.mockReturnValue({
      loggedInUser: {
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        type: "PATRON",
        email: "john@doe.com",
        password: "123456",
      },
      libraryCard: "CARD123",
      openLogin: openLoginMock,
      createLibraryCard: createLibraryCardMock,
    });

    render(<RegisterLibraryCardForm />);

    expect(
      screen.getByText(/your library card number: CARD123/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /get library card/i }),
    ).toBeNull();
  });
});

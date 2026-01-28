import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRegisterLibraryCardForm } from "./useRegisterLibraryCardForm";
import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "../../../../store/slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe("useRegisterLibraryCardForm", () => {
  const dispatchMock = vi.fn();
  const mockUseSelector = vi.mocked(useSelector);

  beforeEach(() => {
    dispatchMock.mockClear();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    mockUseSelector.mockImplementation((selector) =>
      selector({
        authentication: {
          loggedInUser: { _id: "user123" },
          libraryCard: "CARD123",
        },
      }),
    );
  });

  it("returns loggedInUser and libraryCard from selector", () => {
    const { result } = renderHook(() => useRegisterLibraryCardForm());

    expect(result.current.loggedInUser).toEqual({ _id: "user123" });
    expect(result.current.libraryCard).toBe("CARD123");
  });

  it("dispatches getLibraryCard when createLibraryCard is called", () => {
    const { result } = renderHook(() => useRegisterLibraryCardForm());

    act(() => result.current.createLibraryCard());

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it("does not dispatch getLibraryCard if no loggedInUser", () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        authentication: {
          loggedInUser: null,
          libraryCard: "",
        },
      }),
    );

    const { result } = renderHook(() => useRegisterLibraryCardForm());

    act(() => result.current.createLibraryCard());

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("dispatches modal actions when openLogin is called", () => {
    const { result } = renderHook(() => useRegisterLibraryCardForm());

    act(() => result.current.openLogin());

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      setDisplayLibraryCard(false),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setDisplayLogin(true));
  });
});

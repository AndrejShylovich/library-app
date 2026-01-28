import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoginRegisterModal } from "./useLoginRegisterModal";
import { setDisplayLogin } from "../../../../store/slices/ModalSlice";

const dispatchMock = vi.fn();

vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");

  return {
    ...actual,
    useDispatch: () => dispatchMock,
    useSelector: vi.fn(),
  };
});

import { useSelector } from "react-redux";
const mockUseSelector = useSelector as unknown as Mock;

const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

describe("useLoginRegisterModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSelector.mockReturnValue({
      loggedInUser: null,
    });
  });

  it("returns isLogin = true by default", () => {
    const { result } = renderHook(() => useLoginRegisterModal());
    expect(result.current.isLogin).toBe(true);
  });

  it("toggles form state", () => {
    const { result } = renderHook(() => useLoginRegisterModal());

    act(() => {
      result.current.toggleForm();
    });
    expect(result.current.isLogin).toBe(false);

    act(() => {
      result.current.toggleForm();
    });
    expect(result.current.isLogin).toBe(true);
  });

  it("dispatches setDisplayLogin(false) on closeModal", () => {
    const { result } = renderHook(() => useLoginRegisterModal());

    act(() => {
      result.current.closeModal();
    });

    expect(dispatchMock).toHaveBeenCalledWith(setDisplayLogin(false));
  });

  it("closes modal and stores userId when loggedInUser appears", () => {
    const user = { _id: "user-123" };
    mockUseSelector.mockReturnValueOnce({
      loggedInUser: user,
    });

    renderHook(() => useLoginRegisterModal());

    expect(setItemSpy).toHaveBeenCalledWith("userId", "user-123");
    expect(dispatchMock).toHaveBeenCalledWith(setDisplayLogin(false));
  });
});

import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLibraryCardModal } from "./useLibraryCardModal";
import { setDisplayLibraryCard } from "../../../../store/slices/ModalSlice";
import { useDispatch } from "react-redux";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("useLibraryCardModal", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    (useDispatch as unknown as Mock).mockReturnValue(dispatchMock);
  });

  it("should dispatch setDisplayLibraryCard(false) on closeModal", () => {
    const { result } = renderHook(() => useLibraryCardModal());

    act(() => {
      result.current.closeModal();
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(setDisplayLibraryCard(false));
  });
});

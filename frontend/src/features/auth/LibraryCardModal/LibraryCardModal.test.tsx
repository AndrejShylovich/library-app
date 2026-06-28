import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LibraryCardModal } from "./LibraryCardModal";
import { useDispatch } from "react-redux";
import { setDisplayLibraryCard } from "@/shared/store/slices/ModalSlice";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("@/shared/ui/Modal/Modal", () => ({
  Modal: ({
    toggleModal,
    children,
  }: {
    toggleModal: () => void;
    children: React.ReactNode;
  }) => (
    <div>
      <button data-testid="close-modal" onClick={toggleModal}>
        close
      </button>
      {children}
    </div>
  ),
}));

vi.mock("../RegisterLibraryCardForm/RegisterLibraryCardForm", () => ({
  RegisterLibraryCardForm: () => <div data-testid="register-form" />,
}));

describe("LibraryCardModal", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    (useDispatch as unknown as Mock).mockReturnValue(dispatchMock);
  });

  it("should render form and dispatch close action", () => {
    render(<LibraryCardModal />);

    expect(screen.getByTestId("register-form")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-modal"));

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      setDisplayLibraryCard(false),
    );
  });
});
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LibraryCardModal } from "./LibraryCardModal";
import { useLibraryCardModal } from "./useLibraryCardModal";

vi.mock("./useLibraryCardModal", () => ({
  useLibraryCardModal: vi.fn(),
}));

vi.mock("../../../../shared/ui/Modal/Modal", () => ({
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
  const closeModalMock = vi.fn();

  beforeEach(() => {
    closeModalMock.mockClear();
    vi.mocked(useLibraryCardModal).mockReturnValue({
      closeModal: closeModalMock,
    });
  });

  it("should render Modal with RegisterLibraryCardForm", () => {
    render(<LibraryCardModal />);
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  it("should call closeModal when Modal toggles", () => {
    render(<LibraryCardModal />);
    fireEvent.click(screen.getByTestId("close-modal"));
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});

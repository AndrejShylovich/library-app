import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { LibraryCardModal } from "./LibraryCardModal";
import { setDisplayLibraryCard } from "../../../../store/slices/ModalSlice";
import type { Mock } from "vitest";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("../../../../store/slices/ModalSlice", () => ({
  setDisplayLibraryCard: vi.fn(),
}));

vi.mock("../../../../components", () => ({
  Modal: vi.fn(({ toggleModal, children }) => (
    <div data-testid="modal" onClick={toggleModal}>
      {children}
    </div>
  )),
}));

vi.mock("../RegisterLibraryCardForm/RegisterLibraryCardForm", () => ({
  RegisterLibraryCardForm: vi.fn(() => (
    <div data-testid="register-library-card-form">Register Form</div>
  )),
}));

describe("LibraryCardModal", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it("should render Modal component", () => {
    render(<LibraryCardModal />);
    
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("should render RegisterLibraryCardForm inside Modal", () => {
    render(<LibraryCardModal />);
    
    expect(screen.getByTestId("register-library-card-form")).toBeInTheDocument();
  });

  it("should dispatch setDisplayLibraryCard(false) when Modal is closed", () => {
    render(<LibraryCardModal />);
    
    const modal = screen.getByTestId("modal");
    modal.click();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(setDisplayLibraryCard).toHaveBeenCalledWith(false);
  });

  it("should use dispatch from Redux", () => {
    render(<LibraryCardModal />);
    
    expect(useDispatch).toHaveBeenCalled();
  });
});
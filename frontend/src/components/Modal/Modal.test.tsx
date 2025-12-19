// Modal.test.tsx
import { describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
  it("renders children correctly", () => {
    render(
      <Modal toggleModal={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeDefined();
  });

  it("calls toggleModal when clicking on background", () => {
    const toggleModal = vi.fn();
    render(
      <Modal toggleModal={toggleModal}>
        <div>Modal Content</div>
      </Modal>
    );

    const background = screen.getByRole("dialog").parentElement!;
    fireEvent.click(background);

    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it("calls toggleModal when clicking on exit button", () => {
    const toggleModal = vi.fn();
    render(
      <Modal toggleModal={toggleModal}>
        <div>Modal Content</div>
      </Modal>
    );

    const button = screen.getByLabelText("Close modal");
    fireEvent.click(button);

    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it("does not call toggleModal when clicking inside modal content", () => {
    const toggleModal = vi.fn();
    render(
      <Modal toggleModal={toggleModal}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);

    expect(toggleModal).not.toHaveBeenCalled();
  });
});

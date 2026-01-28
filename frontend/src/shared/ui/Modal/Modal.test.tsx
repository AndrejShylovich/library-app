import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal component", () => {
  it("renders children", () => {
    render(
      <Modal toggleModal={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls toggleModal when background is clicked", async () => {
    const toggleModal = vi.fn();
    render(
      <Modal toggleModal={toggleModal}>
        <div>Content</div>
      </Modal>
    );

    const bg = screen.getByRole("dialog").parentElement!;
    await userEvent.click(bg);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it("does not call toggleModal when modal itself is clicked", async () => {
    const toggleModal = vi.fn();
    render(
      <Modal toggleModal={toggleModal}>
        <div>Content</div>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    await userEvent.click(modal);
    expect(toggleModal).not.toHaveBeenCalled();
  });

  it("calls toggleModal when exit button is clicked", async () => {
    const toggleModal = vi.fn();
    render(
      <Modal toggleModal={toggleModal}>
        <div>Content</div>
      </Modal>
    );

    const button = screen.getByRole("button", { name: /close modal/i });
    await userEvent.click(button);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it("modal has role dialog and aria-modal", () => {
    render(
      <Modal toggleModal={vi.fn()}>
        <div>Content</div>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
  });
});

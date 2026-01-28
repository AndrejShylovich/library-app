import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Child Content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    const ProblemChild = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("Please refresh the page or try again later."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /refresh page/i }),
    ).toBeInTheDocument();
  });

  it("renders custom fallback if provided", () => {
    const ProblemChild = () => {
      throw new Error("Custom error");
    };
    const Fallback = <div>Custom fallback</div>;

    render(
      <ErrorBoundary fallback={Fallback}>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom fallback")).toBeInTheDocument();
  });

  it("reloads the page when clicking the reload button", async () => {
    const originalLocation = window.location;

    const mockLocation: Pick<Location, "reload"> = {
      reload: vi.fn(),
    };

    Object.defineProperty(window, "location", {
      configurable: true,
      value: mockLocation,
    });

    const ProblemChild = () => {
      throw new Error("Reload test");
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    const button = screen.getByRole("button", { name: /refresh page/i });
    await userEvent.click(button);

    expect(window.location.reload).toHaveBeenCalled();

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });
});

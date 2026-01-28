import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="primary" size="lg">
        Button
      </Button>,
    );
    const btn = screen.getByText("Button");
    expect(btn).toHaveClass("btn");
    expect(btn).toHaveClass("btn-primary");
    expect(btn).toHaveClass("btn-lg");
  });

  it("applies fullWidth class if fullWidth is true", () => {
    render(<Button fullWidth>Full Button</Button>);
    const btn = screen.getByText("Full Button");
    expect(btn).toHaveClass("btn-full");
  });

  it("accepts additional className", () => {
    render(<Button className="custom-class">Button</Button>);
    const btn = screen.getByText("Button");
    expect(btn).toHaveClass("custom-class");
  });

  it("handles onClick event", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const btn = screen.getByText("Click");

    await userEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders default classes when variant and size are undefined", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByText("Default");
    expect(btn).toHaveClass("btn");
    expect(btn).not.toHaveClass("btn-undefined");
  });
});

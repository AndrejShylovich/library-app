import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input component", () => {
  it("renders with label", () => {
    render(<Input label="Username" id="username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    render(<Input error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("input");
    expect(input).toHaveClass("custom-class");
  });

  it("accepts HTML input props", async () => {
    const handleChange = vi.fn();
    render(
      <Input
        id="email"
        type="email"
        value="test@example.com"
        onChange={handleChange}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.type).toBe("email");
    expect(input.value).toBe("test@example.com");

    await userEvent.clear(input);
    await userEvent.type(input, "hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("supports ref forwarding", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("renders without label or error", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(screen.queryByText(/.+/)).toBeNull(); 
  });
});

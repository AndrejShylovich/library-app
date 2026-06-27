import type {
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";


import "./Button.css";
import { classNames } from "../../lib/classNames";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = ({
  variant,
  size,
  fullWidth = false,
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={classNames(
      "btn",
      variant && `btn-${variant}`,
      size && `btn-${size}`,
      fullWidth && "btn-full",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
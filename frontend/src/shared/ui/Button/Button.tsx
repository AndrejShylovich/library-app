import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const classes = [
    "btn",
    variant ? `btn-${variant}` : "",
    size ? `btn-${size}` : "",
    fullWidth ? "btn-full" : "",
    className,
  ].join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

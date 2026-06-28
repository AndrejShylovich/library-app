import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
} from "react";


import "./Input.css";
import { classNames } from "@/shared/lib/classNames";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId(); 
    const inputId = id || generatedId; 

    return (
      <div className="input-group">
        {label && (
          <label
            htmlFor={inputId}
            className="input-label"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : undefined
          }
          className={classNames(
            "input",
            className,
          )}
          {...props}
        />

        {error && (
          <span
            id={`${inputId}-error`}
            className="input-error"
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
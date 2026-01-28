import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./Input.css";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    return (
      <div className="input-group">
        {label && (
          <label htmlFor={id} className="input-label">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={`input ${className ?? ""}`}
          
          {...rest}
        />

        {error && <span className="input-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

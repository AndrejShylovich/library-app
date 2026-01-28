import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "./useLoginForm";
import { loginUser } from "../../../../store/slices/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent, FormEvent } from "react";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("../../../../store/slices/AuthenticationSlice", () => ({
  loginUser: vi.fn(),
}));

describe("useLoginForm", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        authentication: {
          error: false,
          loading: false,
        },
      }),
    );
  });

  it("should initialize with empty email and password", () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
  });

  it("should update email on handleEmailChange", () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handleEmailChange({
        target: { value: "test@mail.com" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.email).toBe("test@mail.com");
  });

  it("should update password on handlePasswordChange", () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handlePasswordChange({
        target: { value: "123456" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.password).toBe("123456");
  });

  it("should NOT dispatch loginUser if email or password is empty", () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("should dispatch loginUser with email and password on submit", () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handleEmailChange({
        target: { value: "test@mail.com" },
      } as ChangeEvent<HTMLInputElement>);
      result.current.handlePasswordChange({
        target: { value: "123456" },
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      loginUser({
        email: "test@mail.com",
        password: "123456",
      }),
    );
  });

  it("should expose error and loading from selector", () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        authentication: {
          error: true,
          loading: true,
        },
      }),
    );

    const { result } = renderHook(() => useLoginForm());
    expect(result.current.error).toBe(true);
    expect(result.current.loading).toBe(true);
  });
});

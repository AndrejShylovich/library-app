import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRegisterForm } from "./useRegisterForm";
import { registerUser, resetRegisterSuccess } from "../../../../store/slices/AuthenticationSlice";

const dispatchMock = vi.fn();

vi.mock("../../../../store/slices/AuthenticationSlice", () => ({
  registerUser: vi.fn((payload) => payload),
  resetRegisterSuccess: vi.fn(),
}));

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<typeof import("react-redux")>("react-redux");

  return {
    ...actual,
    useDispatch: () => dispatchMock,
    useSelector: vi.fn(),
  };
});

import { useSelector } from "react-redux";
const mockUseSelector = useSelector as unknown as Mock;

const createChangeEvent = (name: string, value: string): React.ChangeEvent<HTMLInputElement> =>
  ({
    target: { name, value },
  } as React.ChangeEvent<HTMLInputElement>);

describe("useRegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseSelector.mockReturnValue({
      error: null,
      loading: false,
      registerSuccess: false,
    });
  });

  it("returns initial form state", () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.formData).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  });

  it("dispatches resetRegisterSuccess on mount", () => {
    renderHook(() => useRegisterForm());
    expect(dispatchMock).toHaveBeenCalledWith(resetRegisterSuccess());
  });

  it("updates formData on handleChange", () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.handleChange(createChangeEvent("email", "test@mail.com"));
    });

    expect(result.current.formData.email).toBe("test@mail.com");
  });

  it("dispatches registerUser with correct payload on submit", () => {
    const { result } = renderHook(() => useRegisterForm());
    const preventDefault = vi.fn();

    act(() => {
      result.current.handleChange(createChangeEvent("firstName", "John"));
      result.current.handleChange(createChangeEvent("lastName", "Doe"));
      result.current.handleChange(createChangeEvent("email", "john@doe.com"));
      result.current.handleChange(createChangeEvent("password", "123456"));
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault,
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(preventDefault).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenLastCalledWith(
      registerUser({
        type: "PATRON",
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        password: "123456",
      }),
    );
  });

  it("returns redux state values", () => {
    mockUseSelector.mockReturnValueOnce({
      error: "error",
      loading: true,
      registerSuccess: true,
    });

    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.error).toBe("error");
    expect(result.current.loading).toBe(true);
    expect(result.current.registerSuccess).toBe(true);
  });
});

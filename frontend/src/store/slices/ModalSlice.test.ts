import { describe, it, expect } from "vitest";
import reducer, {
  setDisplayLogin,
  setDisplayLibraryCard,
  setDisplayLoan,
} from "./ModalSlice";

import type { ModalSliceState } from "./ModalSlice";

describe("ModalSlice", () => {
  const initialState: ModalSliceState = {
    displayLogin: false,
    displayLibraryCard: false,
    displayLoan: false,
  };

  it("should return initial state", () => {
    const next = reducer(undefined, { type: "unknown" });

    expect(next).toEqual(initialState);
  });

  it("setDisplayLogin updates displayLogin", () => {
    const next = reducer(initialState, setDisplayLogin(true));

    expect(next.displayLogin).toBe(true);
    expect(next.displayLibraryCard).toBe(false);
    expect(next.displayLoan).toBe(false);
  });
  it("setDisplayLibraryCard updates displayLibraryCard", () => {
    const next = reducer(initialState, setDisplayLibraryCard(true));

    expect(next.displayLibraryCard).toBe(true);
    expect(next.displayLogin).toBe(false);
    expect(next.displayLoan).toBe(false);
  });
  it("setDisplayLoan updates displayLoan", () => {
    const next = reducer(initialState, setDisplayLoan(true));

    expect(next.displayLoan).toBe(true);
    expect(next.displayLogin).toBe(false);
    expect(next.displayLibraryCard).toBe(false);
  });
});

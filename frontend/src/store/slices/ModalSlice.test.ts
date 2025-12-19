import { describe, it, expect, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import modalReducer, {
  setDisplayLogin,
  setDisplayLibraryCard,
  setDisplayLoan,
} from "./ModalSlice";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
const createTestStore = () =>
  configureStore({
    reducer: {
      modal: modalReducer,
    },
  });

const getInitialState = () => modalReducer(undefined, { type: "unknown" });

// ------------------------------------------------------------
// Test Suite
// ------------------------------------------------------------
describe("ModalSlice (DDD / Redux best practices)", () => {
  // ------------------------------------------------------------
  // Initial State
  // ------------------------------------------------------------
  describe("Initial state", () => {
    it("should represent closed UI by default", () => {
      expect(getInitialState()).toEqual({
        displayLogin: false,
        displayLibraryCard: false,
        displayLoan: false,
      });
    });
  });

  // ------------------------------------------------------------
  // Reducer behavior (pure function)
  // ------------------------------------------------------------
  describe("Reducer behavior", () => {
    it("should open login modal", () => {
      const prevState = getInitialState();

      const nextState = modalReducer(prevState, setDisplayLogin(true));

      expect(nextState).toEqual({
        ...prevState,
        displayLogin: true,
      });
    });

    it("should open library card modal", () => {
      const prevState = getInitialState();

      const nextState = modalReducer(prevState, setDisplayLibraryCard(true));

      expect(nextState).toEqual({
        ...prevState,
        displayLibraryCard: true,
      });
    });

    it("should open loan modal", () => {
      const prevState = getInitialState();

      const nextState = modalReducer(prevState, setDisplayLoan(true));

      expect(nextState).toEqual({
        ...prevState,
        displayLoan: true,
      });
    });

    it("should not affect other modals when one is opened", () => {
      const prevState = getInitialState();

      const nextState = modalReducer(prevState, setDisplayLibraryCard(true));

      expect(nextState.displayLibraryCard).toBe(true);
      expect(nextState.displayLogin).toBe(false);
      expect(nextState.displayLoan).toBe(false);
    });
  });

  // ------------------------------------------------------------
  // Store integration (Redux wiring)
  // ------------------------------------------------------------
  describe("Store integration", () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
      store = createTestStore();
    });

    it("should update state through dispatch", () => {
      store.dispatch(setDisplayLogin(true));

      expect(store.getState().modal.displayLogin).toBe(true);
    });

    it("should handle multiple UI state changes", () => {
      store.dispatch(setDisplayLogin(true));
      store.dispatch(setDisplayLibraryCard(true));
      store.dispatch(setDisplayLoan(true));

      expect(store.getState().modal).toEqual({
        displayLogin: true,
        displayLibraryCard: true,
        displayLoan: true,
      });
    });
  });

  // ------------------------------------------------------------
  // Action creators (contract)
  // ------------------------------------------------------------
  describe("Action creators", () => {
    it("should create correct setDisplayLogin action", () => {
      expect(setDisplayLogin(true)).toEqual({
        type: "modal/setDisplayLogin",
        payload: true,
      });
    });

    it("should create correct setDisplayLibraryCard action", () => {
      expect(setDisplayLibraryCard(false)).toEqual({
        type: "modal/setDisplayLibraryCard",
        payload: false,
      });
    });

    it("should create correct setDisplayLoan action", () => {
      expect(setDisplayLoan(true)).toEqual({
        type: "modal/setDisplayLoan",
        payload: true,
      });
    });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MockedFunction } from "vitest";

import * as libraryCardApi from "../api/libraryCardApi";

import { getLibraryCard } from "./libraryCardSlice";

vi.mock("@/entities/library-card/api/libraryCardApi");

const mockedCreateLibraryCardApi =
  libraryCardApi.createLibraryCardApi as MockedFunction<
    typeof libraryCardApi.createLibraryCardApi
  >;

describe("libraryCardSlice async thunks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getLibraryCard → fulfilled", async () => {
    mockedCreateLibraryCardApi.mockResolvedValue("CARD123");

    const dispatch = vi.fn();

    await getLibraryCard("1")(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "libraryCard/get/fulfilled",
        payload: "CARD123",
      }),
    );
  });

  it("getLibraryCard → rejected", async () => {
    mockedCreateLibraryCardApi.mockRejectedValue(
      new Error("Library card failed"),
    );

    const dispatch = vi.fn();

    await getLibraryCard("1")(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "libraryCard/get/rejected",
      }),
    );
  });
});
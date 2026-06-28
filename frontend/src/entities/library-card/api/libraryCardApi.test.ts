import type { MockedFunction } from "vitest";

import { api } from "@/shared/api/axios";

import { createLibraryCardApi } from "./libraryCardApi";

vi.mock("@/shared/api/axios", () => ({
  api: {
    post: vi.fn(),
  },
}));

const mockedPost = api.post as MockedFunction<typeof api.post>;

describe("libraryCardApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createLibraryCardApi: returns card id", async () => {
    mockedPost.mockResolvedValue({
      data: {
        libraryCard: {
          _id: "card-456",
        },
      },
    });

    const result = await createLibraryCardApi("user-123");

    expect(mockedPost).toHaveBeenCalledWith("/card", {
      user: "user-123",
    });

    expect(result).toBe("card-456");
  });
});
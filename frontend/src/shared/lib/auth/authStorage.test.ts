import { TOKEN_KEY, USER_ID_KEY } from "@/shared/api/axios";
import { clearAuthData, saveAuthData } from "./authStorage";


describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saveAuthData", () => {
    saveAuthData("user-123", "jwt-token");

    expect(localStorage.getItem(TOKEN_KEY)).toBe("jwt-token");
    expect(localStorage.getItem(USER_ID_KEY)).toBe("user-123");
  });

  it("clearAuthData", () => {
    saveAuthData("user-123", "jwt-token");

    clearAuthData();

    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(USER_ID_KEY)).toBeNull();
  });
});
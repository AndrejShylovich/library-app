import { TOKEN_KEY, USER_ID_KEY } from "../../../../shared/api/axios";

export const saveAuthData = (
  userId: string,
  token: string,
): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);
};

export const clearAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};
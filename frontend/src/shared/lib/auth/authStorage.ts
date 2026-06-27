import { TOKEN_KEY, USER_ID_KEY } from "../../api/axios";

export const getToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

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
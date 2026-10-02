import { TOKEN_KEY, USER_ID_KEY } from "@/shared/api/axios";

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token || token === "null" || token === "undefined") {
    return null;
  }

  return token;
};

const listeners = new Set<() => void>();

export const subscribeAuth = (callback: () => void) => {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
};

const notifyAuthChange = () => {
  listeners.forEach((callback) => callback());
};


export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);

  notifyAuthChange();
};


export const saveAuthData = (
  userId: string,
  token: string,
) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);

  notifyAuthChange();
};
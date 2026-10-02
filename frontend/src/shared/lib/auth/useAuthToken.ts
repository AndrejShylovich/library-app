import { useSyncExternalStore } from "react";
import { subscribeAuth, getToken } from "@/shared/lib/auth/authStorage";


export const useAuthToken = () => {
  return useSyncExternalStore(
    subscribeAuth,
    getToken,
  );
};
import { useState, useCallback, useEffect } from "react";
import type { User } from "../../../../../models/User";

export const useEditableUser = (initialUser?: User) => {
  const [user, setUser] = useState<User | undefined>(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUser(initialUser ? { ...initialUser } : undefined);
    setIsEditing(false);
  }, [initialUser]);

  const updateField = useCallback((name: keyof User, value: string) => {
    setIsEditing(true);
    setUser(prev => (prev ? { ...prev, [name]: value } : prev));
  }, []);

  return { user, isEditing, updateField, setUser, setIsEditing };
};

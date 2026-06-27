import { useCallback, useEffect, useState } from "react";
import type { DomainUser } from "../../../../entities/user/model/domain/User";

export const useEditableUser = (initialUser?: DomainUser) => {
  const [user, setUser] = useState<DomainUser | undefined>(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUser(initialUser ? { ...initialUser } : undefined);
    setIsEditing(false);
  }, [initialUser]);

  const updateField = useCallback(
    (name: keyof DomainUser, value: string) => {
      setIsEditing(true);
      setUser((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    [],
  );

  return { user, isEditing, updateField, setUser, setIsEditing };
};
import { useMe } from "@/entities/user/model/hooks/useMe";

interface Props {
  children: React.ReactNode;
}

export const UserInitializer = ({ children }: Props) => {
  
  useMe();

  return children;
};

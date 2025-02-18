import React, { createContext, useState } from "react";
import { ChildrenProps } from "../props/DefineProps";
interface UserContextType {
  User: object | null;
  setUser: (User: object) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);


export function UserContextProvider({ children }: ChildrenProps) {
  const [User, setUser] = useState<object | null>(null);
  return <UserContext.Provider value={{User, setUser}}>{children}</UserContext.Provider>;
}

export default UserContext;

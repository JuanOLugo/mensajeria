import React, { createContext, useState } from "react";
import { ChildrenProps } from "../props/DefineProps";


interface UserType {
  IsOnline: boolean;
  username: string;
  __v: number;
  _id: string;
}

export interface UserContextType {
  User: UserType | null;
  setUser: (User: UserType ) => void;
}


export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserContextProvider({ children }: ChildrenProps) {
  const [User, setUser] = useState<UserType | null>(null);
  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

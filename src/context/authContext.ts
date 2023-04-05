import { AuthContextType, initialState } from "../types/authTypes";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
});

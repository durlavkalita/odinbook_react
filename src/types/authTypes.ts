import { UserType } from "./userTypes";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserType | null;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { token: string; user: UserType } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT_SUCCESS" };

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("odinbook_token") ? true : false,
  token: localStorage.getItem("odinbook_token") || null,
  user: localStorage.getItem("odinbook_user")
    ? JSON.parse(localStorage.getItem("odinbook_user")!)
    : null,
  error: null,
};

import { User } from "./userTypes";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { token: string; user: User } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT_SUCCESS" };

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const token = localStorage.getItem("odinbook_token");
const expiryTime = localStorage.getItem("odinbook_expiryTime");
var isAuthenticated = false;
if (token && expiryTime && new Date().getTime() < parseInt(expiryTime)) {
  isAuthenticated = true;
}
export const initialState: AuthState = {
  isAuthenticated: isAuthenticated,
  token: localStorage.getItem("odinbook_token") || null,
  user: localStorage.getItem("odinbook_user")
    ? JSON.parse(localStorage.getItem("odinbook_user")!)
    : null,
  error: null,
};

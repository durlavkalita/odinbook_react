import { AuthState, AuthAction } from "../types/authTypes";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case "LOGIN_FAILURE":
      console.log("login failed");

      return {
        isAuthenticated: false,
        token: null,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

import Router from "./router";
import { AuthContext } from "./context/authContext";
import { useReducer } from "react";
import { authReducer } from "./reducers/authReducer";
import { initialState } from "./types/authTypes";

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div>
        <Router></Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

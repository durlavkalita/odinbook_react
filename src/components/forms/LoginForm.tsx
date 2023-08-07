import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authServices";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../utility/LoadingSpinner";
import FlashMessage from "../utility/FlashMessage";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginService({
        email,
        password,
      });

      if (response.status == 200) {
        const token = response.data.token;
        const user = response.data.user;
        const tokenExpiryDuration = 86400000;
        const expiryTime = new Date().getTime() + tokenExpiryDuration;
        dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
        window.localStorage.setItem("odinbook_user", JSON.stringify(user));
        window.localStorage.setItem("odinbook_token", token);
        window.localStorage.setItem(
          "odinbook_expiryTime",
          expiryTime.toString()
        );
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "error" });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid Credentials" });
    } finally {
      setIsLoading(false);
    }
    navigate("/");
  };

  const handleTestUser = async () => {
    setIsLoading(true);
    try {
      const response = await loginService({
        email: "test@test.com",
        password: "password",
      });

      if (response.status == 200) {
        const token = response.data.token;
        const user = response.data.user;
        const tokenExpiryDuration = 86400000;
        const expiryTime = new Date().getTime() + tokenExpiryDuration;
        dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
        window.localStorage.setItem("odinbook_user", JSON.stringify(user));
        window.localStorage.setItem("odinbook_token", token);
        window.localStorage.setItem(
          "odinbook_expiryTime",
          expiryTime.toString()
        );
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "error" });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid Credentials" });
    } finally {
      setIsLoading(false);
    }
    navigate("/");
  };

  return (
    <>
      {isLoading && <LoadingSpinner size={32} color="red" />}
      {!isLoading && (
        <div className="py-8 px-4">
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full border-gray-300 border-solid border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full border-gray-300 border-solid border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex justify-center max-w-md mx-auto">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
          {/* register */}
          <div className="flex justify-center max-w-md mx-auto my-4">
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register as new User
            </button>
          </div>
          {/* try it out */}
          <div className="flex justify-center max-w-md mx-auto my-4">
            <button
              onClick={handleTestUser}
              className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Try it out as Test User
            </button>
          </div>
        </div>
      )}
      {state.error && (
        <div>
          <FlashMessage message={state.error}></FlashMessage>
        </div>
      )}
    </>
  );
}

export default LoginForm;

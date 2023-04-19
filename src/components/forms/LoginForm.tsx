import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authServices";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
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
      dispatch({ type: "LOGIN_FAILURE", payload: "error" });
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
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
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
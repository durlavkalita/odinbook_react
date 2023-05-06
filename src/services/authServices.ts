import axios from "axios";
import { env_api_url } from "./getEnvVar";
import { useNavigate } from "react-router-dom";

export const loginService = async (credentials: {
  email: String;
  password: String;
}) => {
  const response = await axios.post(`${env_api_url}/login`, credentials);
  return response;
};

export const logoutService = () => {
  localStorage.removeItem("odinbook_user");
  localStorage.removeItem("odinbook_token");
  localStorage.removeItem("odinbook_expiryTime");
};

export const checkAuthTimeout = (expiryTime: string | null) => {
  const remainingTime = expiryTime
    ? new Date(parseInt(expiryTime)).getTime() - new Date().getTime()
    : 0;

  setTimeout(() => {
    localStorage.removeItem("odinbook_user");
    localStorage.removeItem("odinbook_token");
    localStorage.removeItem("odinbook_expiryTime");
  }, remainingTime);
};

export const autoLogout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("odinbook_user");
  localStorage.removeItem("odinbook_token");
  localStorage.removeItem("odinbook_expiryTime");
  navigate("/login");
};

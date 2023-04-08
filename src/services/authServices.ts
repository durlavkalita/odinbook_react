import axios from "axios";
import { env_api_url } from "./getEnvVar";

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
};

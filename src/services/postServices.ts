import axios from "axios";
import { env_api_url } from "./getEnvVar";

export const get_posts_list = async (token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${env_api_url}/posts`, {
    headers: headers,
  });
  return response;
};

export const logoutService = () => {
  localStorage.removeItem("odinbook_user");
  localStorage.removeItem("odinbook_token");
};

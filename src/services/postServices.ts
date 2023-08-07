import axios from "axios";
const env_api_url = import.meta.env.VITE_BACKEND_API_URL;

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

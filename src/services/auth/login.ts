import axios from "axios";
const base_url = "https://odinbook-backend-bz3g.onrender.com";

const login = async (credentials: { email: String; password: String }) => {
  const response = await axios.post(`${base_url}/login`, credentials);
  return response.data;
};

export default { login };

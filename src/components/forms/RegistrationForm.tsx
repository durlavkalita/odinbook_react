import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { env_api_url } from "../../services/getEnvVar";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const credentials = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const response = await axios.post(`${env_api_url}/register`, credentials);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };

  return (
    <div className="py-8 px-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full border-gray-300 border-solid border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full border-gray-300 border-solid border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
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
        <div className="flex justify-center max-w-md mx-auto">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      <div className="flex justify-center max-w-md mx-auto my-4">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login if existing User
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;

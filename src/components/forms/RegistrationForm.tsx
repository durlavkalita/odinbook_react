import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(firstName, lastName);
    navigate("/");
  };

  return (
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
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;

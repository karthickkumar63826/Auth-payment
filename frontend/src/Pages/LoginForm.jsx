import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

function LoginForm() {
  const initialValue = { email: "", password: "" };

  const [loginData, setLoginData] = useState(initialValue);

  const navigate = useNavigate();

  const { setCurrentuser } = useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/login`,
        loginData
      );
      console.log(response.data.userDetails);
      setCurrentuser(response.data.userDetails);
      navigate("/");
      setLoginData(initialValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={loginData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={loginData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link to="/signup">
              <p>Create a new account!</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

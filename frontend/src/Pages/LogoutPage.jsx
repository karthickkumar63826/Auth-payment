import React from "react";
import { userContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const { setCurrentuser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentuser(null);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Are you sure you want to log out?
        </h2>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;

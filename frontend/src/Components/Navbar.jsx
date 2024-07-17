import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const { currentUser, cartLength, setCartLength } = useContext(userContext);

  useEffect(() => {
    setCartLength(currentUser ? cartLength : 0);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <div className="flex items-center ">
                <Link to={"/"}>
                  <img
                    src="https://banner2.cleanpng.com/lnd/20240711/txp/a8cg0jvqw.webp"
                    alt="Logo"
                    className="h-8 w-auto sm:h-10"
                  />
                </Link>
                <h1 className="font-extrabold px-10">
                  {currentUser && `Welcome ${currentUser.username}`}
                </h1>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {currentUser ? (
              <Link to={"/logout"}>
                <div className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </div>
              </Link>
            ) : (
              <Link to={"/login"}>
                <div className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </div>
              </Link>
            )}
            <div className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative">
              <Link to={currentUser ? "/cart" : "/login"}>
                <FaShoppingCart size={30} />
                <div className="absolute top-0 right-1 text-black">
                  {cartLength}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

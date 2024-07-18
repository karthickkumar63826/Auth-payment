import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const { currentUser, cartLength, setCartLength } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCartLength(currentUser ? cartLength : 0);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center flex-end sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to={"/"}>
                <img
                  src="https://banner2.cleanpng.com/lnd/20240711/txp/a8cg0jvqw.webp"
                  alt="Logo"
                  className="h-8 w-auto sm:h-10"
                />
              </Link>
              <h1 className="font-extrabold px-10 hidden sm:block">
                {currentUser && `Welcome ${currentUser.username}`}
              </h1>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <AiOutlineClose size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <h1 className="font-extrabold px-10 sm:hidden">
              {currentUser && `Welcome ${currentUser.username}`}
            </h1>
            {currentUser ? (
              <>
                <Link
                  to={"/myorders"}
                  className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Orders
                </Link>
                <Link
                  to={"/cart"}
                  className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative"
                >
                  <FaShoppingCart size={30} />
                  <div className="absolute top-0 right-1 text-black">
                    {cartLength}
                  </div>
                </Link>
                <Link
                  to={"/logout"}
                  className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to={"/login"}
                className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {currentUser ? (
            <>
              <Link
                to={"/myorders"}
                className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Orders
              </Link>
              <Link
                to={"/cart"}
                className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium relative"
              >
                <FaShoppingCart size={20} />
                <span className="ml-2">Cart</span>
                <div className="absolute top-0 right-0 text-black">
                  {cartLength}
                </div>
              </Link>
              <Link
                to={"/logout"}
                className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to={"/login"}
              className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

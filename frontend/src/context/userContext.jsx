import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    setCartLength(currentUser ? cartLength : 0);
  }, [setCartLength, currentUser]);

  return (
    <userContext.Provider
      value={{ currentUser, setCurrentuser, cartLength, setCartLength }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

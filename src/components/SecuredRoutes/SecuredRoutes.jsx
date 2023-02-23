import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SecuredRoutes = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isUserLoggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn || isUserLoggedIn !== "true") {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return <div>{isLoggedIn && children}</div>;
};

export default SecuredRoutes;

import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [loggedIn, setloggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("loggedIn");
    setloggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      setloggedIn(isLoggedIn);
    }
  }, []);

  return (
    <>
      {loggedIn && (
        <Nav className="justify-content-end bg-dark" activeKey="/home">
          <Nav.Item>
            <Button variant="danger button" onClick={handleLogOut}>
              Log Out
            </Button>
          </Nav.Item>
        </Nav>
      )}
      {!loggedIn && (
        <Nav className="justify-content-end bg-dark">
          <Nav.Item>
            <Button
              variant="primary button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="success button" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
};

export default Navbar;

import React from "react";

// import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../../assets/logo.png"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const [loggedIn, setloggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("loggedIn");
    setloggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn && isLoggedIn === "true") {
      setloggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bar">
          <Navbar.Brand>
          <Nav.Link href="/">
          <img
              src={logo}
              alt="app-logo"
              className="logo"
            />
          </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
              <Nav.Link href="/ticketList">Ticket List</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2}>
                {loggedIn && (
                  <div>
                    <Nav.Item>
                      <Button variant="danger button" onClick={handleLogOut}>
                        Log Out
                      </Button>
                    </Nav.Item>
                  </div>
                )}

                {!loggedIn && (
                  <div className="buttons">
                    <Nav.Item>
                      <Button
                        variant="success button"
                        onClick={() => navigate("/login")}
                      >
                        Sign In
                      </Button>
                    </Nav.Item>
                  </div>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;

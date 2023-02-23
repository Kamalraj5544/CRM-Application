import { Nav, Navbar, Button } from "react-bootstrap";
import SideMenu from "../SideMenu/SideMenu";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const navigate = useNavigate();

  const [loggedIn, setloggedIn] = useState(false);
  const [visible, setVisible] = useState(false);

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
      <SideMenu visible={visible} setVisible={setVisible} />
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="nav-bar"
      >
        <Navbar.Brand>
          <Nav.Link>
            <img
              src={logo}
              alt="app-logo"
              className="logo"
              onClick={() => setVisible(true)}
            />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/ticketList">Tickets</Nav.Link>
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

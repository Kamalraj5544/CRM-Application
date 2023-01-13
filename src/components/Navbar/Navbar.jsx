import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <>
      <Nav className="justify-content-end bg-dark" activeKey="/home">
        <Nav.Item>
        <Button variant="primary" onClick={() => navigate("/signup")}>SignUp</Button>{' '}
        </Nav.Item>
        <Nav.Item>
        <Button variant="primary">Login</Button>{' '}
        </Nav.Item>
      </Nav>
    </>
  )
}

export default Navbar
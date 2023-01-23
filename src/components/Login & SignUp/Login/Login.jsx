import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handlePostData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user/signin", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            localStorage.setItem("loggedIn", true);
            navigate("/");
          } else {
            setError(true);
          }
        })
        .catch((err) => console.log(err));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img
          src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg"
          alt="app-logo"
        />
      </div>
      <div className="right">
        <h2>Please Login to continue...</h2>
        <hr />

        {error && <Alert variant="danger">Invalid Credentials</Alert>}

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              Please enter your registered email address
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handlePostData();
            }}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

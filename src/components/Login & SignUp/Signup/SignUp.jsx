import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlePostData = async () => {
    let apiResponse;
    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => (apiResponse = response))
        .catch((err) => console.log(err));
      console.log(apiResponse);
      if (apiResponse.ok) {
        navigate("/login");
      }
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
        <h2>Please register to continue...</h2>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address : </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password : </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-grid gap-1">
            <Button
              variant="success"
              type="submit"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                handlePostData();
              }}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

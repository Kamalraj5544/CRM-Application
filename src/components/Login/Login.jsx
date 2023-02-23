import { Button, Form, Alert } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import crm_image from "../../assets/crm-image.jpg"
import "./Login.css";


const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    isActive: true
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
          src={crm_image}
          alt="app-logo"
        />
      </div>
      <div className="right">
        <h2 className="login-header">
          Please Login <FiLogIn /> to continue...
        </h2>
        <hr />

        {error && (
          <Alert variant="danger">
            Invalid Credentials 😥 Please enter correct Email and Password
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address : </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              Please enter your registered email address:
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-grid">
            <Button
              variant="success"
              size="lg"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handlePostData();
              }}
            >
              LOGIN <FiLogIn />
            </Button>
          </div>
        </Form>
        <br />
      </div>
    </div>
  );
};

export default Login;

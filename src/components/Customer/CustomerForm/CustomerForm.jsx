import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const [formDetails, setFormDetails] = useState({
    name: "",
    website: "",
    turnover: "",
    employees: "",
    ceo: "",
    year: "",
  });

  if (name) {
    fetch("http://localhost:4000/api/customer", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((customersData) => {
        const requiredCustomer = customersData.find(
          (data) => data.name === name
        );
        setFormDetails(requiredCustomer);
      });
  }

  const handlePostData = async (data) => {
    try {
      let apiResponse;
      let response = await fetch("http://localhost:4000/api/customer", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        apiResponse = res;
      });
      if (apiResponse.ok) {
        navigate("/");
      } else {
        console.log(apiResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Customer Details</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={formDetails.name}
            onChange={(e) =>
              setFormDetails({ ...formDetails, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the website"
            value={formDetails.website}
            onChange={(e) =>
              setFormDetails({ ...formDetails, website: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Revenue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter revenue"
            value={formDetails.turnover}
            onChange={(e) =>
              setFormDetails({ ...formDetails, turnover: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Number of Employers</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter no.of employees"
            value={formDetails.employees}
            onChange={(e) =>
              setFormDetails({ ...formDetails, employees: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CEO</Form.Label>
          <Form.Control
            type="text"
            placeholder="CEO name"
            value={formDetails.ceo}
            onChange={(e) =>
              setFormDetails({ ...formDetails, ceo: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Established Year</Form.Label>
          <Form.Control
            type="text"
            placeholder="Established Year"
            value={formDetails.year}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                year: e.target.value,
              })
            }
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handlePostData(formDetails);
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CustomerForm;

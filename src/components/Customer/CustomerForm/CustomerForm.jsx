import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const CustomerForm = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    website: "",
    revenue: "",
    noOfEmployees: "",
    CEOname: "",
    establishedYear: "",
  });
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
            value={formDetails.revenue}
            onChange={(e) =>
              setFormDetails({ ...formDetails, revenue: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Number of Employers</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter no.of employees"
            value={formDetails.noOfEmployees}
            onChange={(e) =>
              setFormDetails({ ...formDetails, noOfEmployees: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CEO</Form.Label>
          <Form.Control
            type="text"
            placeholder="CEO name"
            value={formDetails.CEOname}
            onChange={(e) =>
              setFormDetails({ ...formDetails, CEOname: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Established Year</Form.Label>
          <Form.Control
            type="text"
            placeholder="Established Year"
            value={formDetails.establishedYear}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                establishedYear: e.target.value,
              })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CustomerForm;

import { Button, Form, Container } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../../Navbar/NavBar";
import "./CustomerForm.css";

const CustomerForm = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();
  const { customerName } = useParams();

  const [formDetails, setFormDetails] = useState({
    name: "",
    website: "",
    turnover: "",
    employees: "",
    ceo: "",
    year: "",
    status: "",
  });

  useEffect(() => {
    if (customerName) {
      fetch("http://localhost:4000/api/customer/" + customerName)
        .then((res) => res.json())
        .then((customersData) => {
          console.log(customersData);
          setFormDetails(customersData);
          setIsUpdate(true);
        });
    }
  }, []);

  const handlePostData = async () => {
    const methodName = customerName ? "PUT" : "POST";
    try {
      let response = await fetch("http://localhost:4000/api/customer", {
        method: methodName,
        body: JSON.stringify(formDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => (res.ok ? navigate("/") : console.log(res)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Container fluid>
        <div className="form-container">
          <h1 className="center-header">Enter Customer Details</h1>
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={formDetails.name}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter website"
                value={formDetails.website}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, website: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRevenue">
              <Form.Label>Revenue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter turnover"
                value={formDetails.turnover}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, turnover: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNoOfEmp">
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

            <Form.Group className="mb-3" controlId="formBasicCEO">
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

            <Form.Group className="mb-3" controlId="formBasicYear">
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
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={(e) => {
                  e.preventDefault();
                  setFormDetails({
                    ...formDetails,
                    status: e.target.value,
                  });
                }}
              >
                {/* <option>Status</option>. */}
                <option aria-label="Default select example" value="New">
                  New
                </option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="floatRight"
              onClick={(event) => {
                event.preventDefault();
                handlePostData();
              }}
            >
              {isUpdate ? "Update customer" : "Create customer"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default CustomerForm;

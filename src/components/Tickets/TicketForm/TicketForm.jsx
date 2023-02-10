
import NavBar from "../../Navbar/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container,Button,Form } from 'react-bootstrap';

const TicketForm = () => {
    const [formDetails, setFormDetails] = useState({
        customer: "",
        desc: "",
        assignedTo: "",
        raisedOn: "",
        status: "",
      });

      const navigate = useNavigate();

      const handlePostData = () => {
        fetch("http://localhost:4000/api/ticket",{
            method: "POST",
            body: JSON.stringify(formDetails),
            headers:{
                "Content-Type": "application/json",
            }
        }).then(response => {
            if(response.ok) {
                navigate("/ticketList")
            }else{
                console.log(response);
            }
        })
      }
  return (
    <>
      <NavBar />
      <Container fluid>
        <div className="form-container">
          <h1 className="center-header">Enter ticket Details</h1>
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={formDetails.customer}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, customer: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={formDetails.desc}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, desc: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAssigination">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter who is assigned"
                value={formDetails.assignedTo}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, assignedTo: e.target.value })
                }
              />
            </Form.Group>



            <Form.Group className="mb-3" controlId="formBasicRaisedDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                value={formDetails.raisedOn}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, raisedOn: e.target.value })
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
                <option value="Assigned">Assigned</option>
                <option value="InProgress">In Progress</option>
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
              Create Ticket
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default TicketForm;

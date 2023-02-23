import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Button, Form } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";

import NavBar from "../../Navbar/NavBar";

const TicketForm = () => {
  const [ticket, setTicket] = useState({
    customer: "Select a customer",
    desc: "",
    assignedTo: "Select a user",
    raisedOn: "",
    status: "Status of ticket",
  });

  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const statusArray = ["New", "Assigned", "In Progress", "Resolved"];

  const navigate = useNavigate();
  const { description } = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/api/customer")
      .then((response) => response.json())
      .then((responsedata) => setCustomers(responsedata))
      .catch((error) => console.log(error));

    fetch("http://localhost:4000/api/user")
      .then((response) => response.json())
      .then((responsedata) => setUsers(responsedata))
      .catch((error) => console.log(error));

    handleEdit();
  }, []);

  const handleEdit = async () => {
    if (description) {
      let res = await fetch("http://localhost:4000/api/ticket/" + description)
        .then((response) => response.json())
        .then((responsedata) => {
          setTicket(responsedata);
          console.log(ticket);
        })
        .catch((error) => console.log(error));
    }
  };

  const handlePostData = () => {
    // console.log(description);
    let methodName = description ? "PUT" : "POST";
    console.log(ticket);
    fetch("http://localhost:4000/api/ticket", {
      method: methodName,
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        navigate("/ticketList");
      } else {
        console.log(response);
      }
    });
  };

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
              <div>
                <Dropdown
                  value={ticket.customer}
                  onChange={(e) => {
                    setTicket({
                      ...ticket,
                      customer: e.target.value.name,
                    });
                  }}
                  options={customers}
                  optionLabel="name"
                  placeholder={ticket.customer}
                  disabled={description}
                  filter
                  className="w-full"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={ticket.desc}
                onChange={(e) => setTicket({ ...ticket, desc: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAssigination">
              <Form.Label>Assigned To</Form.Label>
              <div>
                <Dropdown
                  value={ticket.assignedTo}
                  onChange={(e) => {
                    setTicket({
                      ...ticket,
                      assignedTo: e.target.value.name,
                    });
                  }}
                  options={users}
                  optionLabel="name"
                  placeholder={ticket.assignedTo}
                  filter
                  className="w-full"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <div>
                <Dropdown
                  value={ticket.status}
                  onChange={(e) => {
                    setTicket({
                      ...ticket,
                      status: e.target.value,
                    });
                  }}
                  options={statusArray}
                  placeholder={ticket.status}
                  className="w-full"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRaisedDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                disabled={description}
                type="date"
                placeholder="Date"
                value={ticket.raisedOn}
                onChange={(e) =>
                  setTicket({ ...ticket, raisedOn: e.target.value })
                }
              />
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
              {description ? "Update ticket" : "Create ticket"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default TicketForm;

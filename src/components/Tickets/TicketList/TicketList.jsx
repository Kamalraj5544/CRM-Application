import NavBar from "../../Navbar/NavBar/NavBar";
import TicketDashboard from "../TicketDashboard/TicketDashboard";

import { Table, Button, Form, InputGroup } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+"ticket")
      .then((response) => response.json())
      .then((responseData) => {
        setFilteredTickets(responseData);
        setTickets(responseData);
      })
      .catch((error) => console.log(error));
    console.log(tickets);
  }, []);

  const handleEdit = (desc) => {
    navigate("/ticketForm/" + desc);
  };

  const handleSearch = (desc) => {
    let filtered = tickets.filter((ticket) =>
      ticket.desc.toLowerCase().includes(desc.toLowerCase())
    );
    setFilteredTickets(filtered);
  };

  const statusBgColor = (status) => {
    if (status === "New") return "new-tickets";
    else if (status === "Assigned") return "assigned-tickets";
    else if (status === "In Progress") return "inProgress-tickets";
    else if (status === "Resolved") return "resolved-tickets";
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div>
          <div className="list-header">
            <div>
              <h2 className="center-header">Ticket List Of Customers</h2>
              <hr />
            </div>
            <div className="dashboard">
              <TicketDashboard tickets={tickets} />
            </div>
            <hr />
            <div className="sub-header">
              <div>
                <Button
                  variant="primary"
                  onClick={() => navigate("/ticketForm")}
                >
                  Raise ticket
                </Button>
              </div>
              <div>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Search description..."
                    aria-describedby="basic-addon2"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    <RiSearchLine />
                  </Button>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <Table variant="light">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Raised date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket, i) => (
              <tr>
                <td>{ticket.customer}</td>
                <td>{ticket.desc}</td>
                <td className={statusBgColor(ticket.status)}>
                  {ticket.status}
                </td>
                <td>{ticket.assignedTo}</td>
                <td>{ticket.raisedOn}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(ticket.desc)}
                  >
                    edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TicketList;

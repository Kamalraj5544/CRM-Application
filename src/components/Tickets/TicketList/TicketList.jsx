import NavBar from "../../Navbar/NavBar";
import { Table, Button,Form,InputGroup } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/ticket")
      .then((response) => response.json())
      .then((responseData) => {
        setFilteredTickets(responseData)
        setTickets(responseData);
      })
      .catch((error) => console.log(error));
    console.log(tickets);
  }, []);

  const handleEdit = (desc) => {
    navigate("/ticketForm/" + desc);
  };

  const handleSearch = (desc) => {
      let filtered = tickets.filter(ticket => ticket.desc.toLowerCase().includes(desc.toLowerCase()));
      setFilteredTickets(filtered);
  }

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div>
          <h2 className="center-header">Ticket List Of Customers</h2>
          <div className="sub-header">
            <Button variant="primary" onClick={() => navigate("/ticketForm")}>
              Raise ticket
            </Button>
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

          <hr />
        </div>
        <Table hover variant="dark">
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
                <td>{ticket.status}</td>
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

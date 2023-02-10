import NavBar from "../../Navbar/NavBar";
import {Table,Button} from 'react-bootstrap';

import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";


const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/api/ticket").then((response) => response.json()).then((responseData) => {
            setTickets(responseData);
    }).catch(error => console.log(error));
    }, [])
    
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
      <div>
            <Button variant="primary" onClick={() => navigate("/ticketForm")}>
              Raise ticket
            </Button>
          </div>
        <h2 className="center-header">Ticket List Of Customers</h2>
        <hr />
        <Table hover variant="dark">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Assigned To</th>
          <th>Raised date</th>
        </tr>
      </thead>
      <tbody>
          {tickets.map((ticket,i) => (
            <tr>
            <td>{ticket.customer}</td>
            <td>{ticket.desc}</td>
            <td>{ticket.status}</td>
            <td>{ticket.assignedTo}</td>
            <td>{ticket.raisedOn}</td>
            </tr>
          ))}
      </tbody>
    </Table>
      </div>
    </div>
  );
};

export default TicketList;

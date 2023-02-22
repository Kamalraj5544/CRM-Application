import "./TicketDashboard.css";

const TicketDashboard = ({ tickets }) => {
  const totalTickets = tickets.length;

  const newTickets = tickets.filter((c) => c.status === "New").length;

  const inProgressTickets = tickets.filter(
    (c) => c.status === "In Progress"
  ).length;

  const assignedTickets = tickets.filter((c) => c.status === "Assigned").length;

  const resolvedTickets = tickets.filter((c) => c.status === "Resolved").length;

  return (
    <div className="dashboard-container">
      <div className="total-tickets tile">
        <div className="leftFloat">
          <div>Total</div>
        </div>
        <hr />
        <div className="rightFloat">{totalTickets}</div>
      </div>
      <div className="new-tickets tile">
        <div className="leftFloat">New</div>
        <hr />
        <div className="rightFloat">{newTickets}</div>
      </div>
      <div className="inProgress-tickets tile">
        <div className="leftFloat">In Progress</div>
        <hr />
        <div className="rightFloat">{inProgressTickets}</div>
      </div>
      <div className="assigned-tickets tile">
        <div className="leftFloat">Assigned</div>
        <hr />
        <div className="rightFloat">{assignedTickets}</div>
      </div>
      <div className="resolved-tickets tile">
        <div className="leftFloat">Resolved</div>
        <hr />
        <div className="rightFloat">{resolvedTickets}</div>
      </div>
    </div>
  );
};

export default TicketDashboard;

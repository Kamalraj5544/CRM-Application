import "./Dashboard.css";

const Dashboard = ({ customers }) => {
    
  const totalCustomer = customers.length;
  const newCustomers = customers.filter((c) => c.status === "New").length;
  const acceptedCustomers = customers.filter(
    (c) => c.status === "Accepted"
  ).length;
  const rejectedCustomers = customers.filter(
    (c) => c.status === "Rejected"
  ).length;

  return (
    <div className="dashboard-container">
      <div className="total-customers tile">
        <h3>Total</h3>
        <h4>{totalCustomer}</h4>
      </div>
      <div className="new-customers tile">
        <h3>New</h3>
        <h4>{newCustomers}</h4>
      </div>
      <div className="accpeted-customers tile">
        <h3>Accepted</h3>
        <h4>{acceptedCustomers}</h4>
      </div>
      <div className="rejected-customers tile">
        <h3>Rejected</h3>
        <h4>{rejectedCustomers}</h4>
      </div>
    </div>
  );
};

export default Dashboard;

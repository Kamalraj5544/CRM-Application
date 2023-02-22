import "./Dashboard.css";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/customer")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData))
      .catch((error) => console.error(error));
  }, []);

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
        <div className="leftFloat">
          <div>Total</div>
        </div>
        <hr />
        <div className="rightFloat">{totalCustomer}</div>
      </div>
      <div className="new-customers tile">
        <div className="leftFloat">New</div>
        <hr />
        <div className="rightFloat">{newCustomers}</div>
      </div>
      <div className="accpeted-customers tile">
        <div className="leftFloat">Accepted</div>
        <hr />
        <div className="rightFloat">{acceptedCustomers}</div>
      </div>
      <div className="rejected-customers tile">
        <div className="leftFloat">Rejected</div>
        <hr />
        <div className="rightFloat">{rejectedCustomers}</div>
      </div>
    </div>
  );
};

export default Dashboard;

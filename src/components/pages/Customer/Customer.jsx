import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerForm from "../../Customer/CustomerForm/CustomerForm";
import CustomerList from "../../Customer/CustomerList/CustomerList";

const Customer = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/form" element={<CustomerForm />} />
          <Route path="/form/:name" element={<CustomerForm />} />
          <Route path="/" element={<CustomerList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Customer;

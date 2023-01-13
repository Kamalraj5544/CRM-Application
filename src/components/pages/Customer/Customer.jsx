import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerForm from "../../Customer/CustomerForm/CustomerForm";
import CustomerList from "../../Customer/CustomerList/CustomerList";
import SignUp from "../../Login & SignUp/Signup/SignUp";

const Customer = () => {
  return (
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/form" element={<CustomerForm />} />
          <Route path="/form/:name" element={<CustomerForm />} />
          <Route path="/" element={<CustomerList />} />
        </Routes>
      </Router>
  );
};

export default Customer;

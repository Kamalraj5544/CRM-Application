import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerForm from "../../Customer/CustomerForm/CustomerForm";
import CustomerList from "../../Customer/CustomerList/CustomerList";
import SignUp from "../../Login & SignUp/Signup/SignUp";
import Login from "../../Login & SignUp/Login/Login";
import SecuredRoutes from "../../SecuredRoutes/SecuredRoutes";

const Customer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/form"
          element={
            <SecuredRoutes>
              <CustomerForm />
            </SecuredRoutes>
          }
        />
        <Route
          path="/form/:name"
          element={
            <SecuredRoutes>
              <CustomerForm />
            </SecuredRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default Customer;

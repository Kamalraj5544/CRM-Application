import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CustomerForm from "../../Customer/CustomerForm/CustomerForm";
import CustomerList from "../../Customer/CustomerList/CustomerList";
import Login from "../../Login/Login";
import SecuredRoutes from "../../SecuredRoutes/SecuredRoutes";
import TicketForm from "../../Tickets/TicketForm/TicketForm";
import TicketList from "../../Tickets/TicketList/TicketList";
import UserForm from "../../Users/UserForm/UserForm";
import UserList from "../../Users/UserList/UserList";

const Customer = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SecuredRoutes>
              <CustomerList />
            </SecuredRoutes>
          }
        />
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
          path="/form/:customerName"
          element={
            <SecuredRoutes>
              <CustomerForm />
            </SecuredRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <SecuredRoutes>
              <UserList />
            </SecuredRoutes>
          }
        />
        <Route
          path="/userForm"
          element={
            <SecuredRoutes>
              <UserForm />
            </SecuredRoutes>
          }
        />
        <Route
          path="/ticketList"
          element={
            <SecuredRoutes>
              <TicketList />
            </SecuredRoutes>
          }
        />
        <Route
          path="/ticketForm"
          element={
            <SecuredRoutes>
              <TicketForm />
            </SecuredRoutes>
          }
        />

        <Route
          path="/ticketForm/:description"
          element={
            <SecuredRoutes>
              <TicketForm />
            </SecuredRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default Customer;

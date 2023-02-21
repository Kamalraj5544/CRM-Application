import { useEffect, useState } from "react";

import { InputGroup, Form, Button, Alert, Table } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import Dashboard from "../CustomerDashboard/Dashboard";
import NavBar from "../../Navbar/NavBar";
import "./CustomerList.css";
import PaginationTab from "../../Pagination/PaginationTab";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [pages, setPages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadPage(1);
  }, []);

  const loadPage = (pageNo) => {
    fetch("http://localhost:4000/api/customer/page/" + pageNo)
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData.records);
        setFilteredCustomers(responseData.records);
        const totalPages = Math.ceil(responseData.totalCount / 100);
        const pages = new Array(totalPages).fill(0);
        setPages(pages);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (name) => {
    navigate("/form/" + name);
  };

  const handleDelete = (customer) => {
    fetch(`http://localhost:4000/api/customer/${customer.name}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData);
        setFilteredCustomers(responseData);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (searchinput) => {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchinput.toLowerCase())
      );
      setFilteredCustomers(filtered);
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="list-header">
          <div className="dashboard">
            <Dashboard />
          </div>
          <hr />
          <div className="sub-header">
            <div>
              <Button variant="primary" onClick={() => navigate("/form")}>
                Register Customer
              </Button>
            </div>
            <div>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Search customer..."
                  aria-label="Search customer..."
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

        <h1 className="center-header">Customer Details</h1>
        <Table variant="light" className="app__table" responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Website</th>
              <th>CEO</th>
              <th>Established Year</th>
              <th>Revenue</th>
              <th>Number of Employees</th>
              <th>Status</th>
              <th>Edit customer</th>
              <th>Delete customer</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length !== 0 &&
              filteredCustomers.map((customer, i) => (
                <tr key={`${customer} + ${i}`}>
                  <td>{customer.name}</td>
                  <td>{customer.website}</td>
                  <td>{customer.ceo}</td>
                  <td>{customer.year}</td>
                  <td>{customer.turnover}</td>
                  <td>{customer.employees}</td>
                  <td
                    className={
                      customer.status === "New"
                        ? "status-new"
                        : customer.status === "Accepted"
                        ? "status-accepted"
                        : "status-rejected"
                    }
                  >
                    {customer.status}
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(customer.name);
                      }}
                      className="btn btn-warning floatRight"
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(customer);
                      }}
                      className="btn btn-danger floatRight"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {filteredCustomers.length === 0 && (
          <Alert key="primary" variant="warning" className="alert">
            There is no customer details to show.
          </Alert>
        )}

        <PaginationTab pages={pages} loadPage={loadPage} />
      </div>
    </div>
  );
};

export default CustomerList;

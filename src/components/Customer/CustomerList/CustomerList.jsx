import { useEffect, useState } from "react";

import { InputGroup, Form, Button, Alert, Table } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
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
    fetch("http://localhost:4000/api/customer/page/" + pageNo, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setCustomers(responseData.records);
        setFilteredCustomers(responseData.records);
        const totalPages = Math.ceil(
          responseData.totalCount / 100
        );
        // console.log(totalPages);
        const pages = new Array(totalPages).fill(0);
        setPages(pages);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (name) => {
    navigate("/form/" + name);
  };

  const handleDelete = (detail) => {
    try {
      fetch(`http://localhost:4000/api/customer/${detail.name}`, {
        method: "DELETE",
      }).then((response) => console.log(response));

      setTimeout(() => {
        fetch("http://localhost:4000/api/customer", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseData) => {
            setCustomers(responseData);
          })
          .catch((error) => console.log(error));
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (searchinput) => {
    if (!searchinput) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchinput.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } 
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="list-header">
          <div className="dashboard">
            <Dashboard customers={customers} />
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
        <Table variant="dark" className="app__table" responsive>
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
              filteredCustomers.map((detail, i) => (
                <tr key={`${detail} + ${i}`}>
                  <td>{detail.name}</td>
                  <td>{detail.website}</td>
                  <td>{detail.ceo}</td>
                  <td>{detail.year}</td>
                  <td>{detail.turnover}</td>
                  <td>{detail.employees}</td>
                  <td
                    className={
                      detail.status === "New"
                        ? "status-new"
                        : detail.status === "Accepted"
                        ? "status-accepted"
                        : "status-rejected"
                    }
                  >
                    {detail.status}
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(detail.name);
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
                        handleDelete(detail);
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

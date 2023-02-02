import { useEffect, useState } from "react";

import { Button, Alert, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import NavBar from "../../Navbar/NavBar";
import "./CustomerList.css";

const CustomerList = () => {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/customer", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setDetails(responseData);
      })
      .catch((error) => console.log(error));
    navigate("/");
  }, []);

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
            setDetails(responseData);
          })
          .catch((error) => console.log(error));
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div>
          <Button variant="primary" onClick={() => navigate("/form")}>
            Register Customer
          </Button>
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
            {details.length !== 0 &&
              details.map((detail, i) => (
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

        {details.length === 0 && (
          <Alert key="primary" variant="warning" className="alert">
            There is no customer details to show.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CustomerList;

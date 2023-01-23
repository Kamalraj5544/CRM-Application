import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

import "./CustomerList.css";
import Navbar from "../../Navbar/Navbar";

const CustomerList = () => {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    console.log(isLoggedIn);

    if(isLoggedIn && isLoggedIn === "true") {
      fetch("http://localhost:4000/api/customer", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setDetails(responseData);
      })
      .catch((error) => console.log(error));
      navigate("/");
    }else{
      console.log("not Logged in")
      navigate("./login");
    }
    
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
      <Navbar />
      <div className="container-fluid">
        <div>
          <Button className="btn btn-success" onClick={() => navigate("/form")}>
            Register Customer
          </Button>
        </div>
        <Table striped bordered hover className="app__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Website</th>
              <th>Revenue</th>
              <th>Number of Employers</th>
              <th>CEO</th>
              <th>Established Year</th>
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
                  <td>{detail.turnover}</td>
                  <td>{detail.ceo}</td>
                  <td>{detail.employees}</td>
                  <td>{detail.year}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(detail.name);
                      }}
                      className="btn btn-warning"
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
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}

            {details.length === 0 && (
              <Alert key="primary" variant="primary">
                There is no data to display
              </Alert>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerList;

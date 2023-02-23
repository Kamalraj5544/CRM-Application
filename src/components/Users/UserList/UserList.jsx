import { Button, Alert, Table } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../Navbar/NavBar";

const UserList = () => {
  const [usersAvailable, setUsersAvailable] = useState([]);
  const navigate = useNavigate();

  const handleIsActive = (username, isActive) => {
    fetch(
      process.env.REACT_APP_API_URL +
        `user/${isActive ? "deActivate" : "activate"}/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setUsersAvailable(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUsersAvailable(responseData);
        // console.log(responseData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div>
          <Button variant="primary" onClick={() => navigate("/userForm")}>
            Register user
          </Button>
        </div>
        <Table bordered hover variant="light" className="app__table" responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>IsActive</th>
            </tr>
          </thead>
          <tbody>
            {usersAvailable.length !== 0 &&
              usersAvailable.map((user, i) => (
                <tr key={`${user} + ${i}`}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      <Button
                        variant={user.isActive ? "danger" : "success"}
                        onClick={() =>
                          handleIsActive(user.username, user.isActive)
                        }
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {usersAvailable.length === 0 && (
          <Alert key="primary" variant="warning" className="alert">
            There is no users to show.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UserList;

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


const CustomerList = () => {
  const [details, setDetails] = useState([])
  useEffect(() => {

    fetch('http://localhost:4000/api/customer',{
      method : 'GET',
    }).then(response => response.json()).then(
      (responseData) => {setDetails(responseData)}
      ).catch((error) => console.log(error))

  }, [])
  
  return (
    <div className='container'>
      <Button className='btn btn-success' >
        <Link to="./form" style={{
          textDecoration : 'none',
          color : 'white'
        }}>Register Form</Link>
      </Button>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Website</th>
          <th>Revenue</th>
          <th>Number of Employers</th>
          <th>CEO</th>
          <th>Established Year</th>
        </tr>
      </thead>
      <tbody>
      {details.map((detail,i) => (
        <tr key={`${detail} + ${i}`}>
          <td>{detail.name}</td>
          <td>{detail.website}</td>
          <td>{detail.turnover}</td>
          <td>{detail.ceo}</td>
          <td>{detail.employees}</td>
          <td>{detail.year}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    </div>
  )
}

export default CustomerList
import React from 'react'
import Table from 'react-bootstrap/Table';
import details from '../../../Customer.json'

const CustomerList = ({}) => {
  return (
    <div className='container'>
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
          <td>{detail.revenue}</td>
          <td>{detail.CEOname}</td>
          <td>{detail.noOfEmployers}</td>
          <td>{detail.establishedYear}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    </div>
  )
}

export default CustomerList
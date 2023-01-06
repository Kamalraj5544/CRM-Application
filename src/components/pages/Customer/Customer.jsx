import React from 'react'
import CustomerForm from '../../Customer/CustomerForm/CustomerForm'
import CustomerList from '../../Customer/CustomerList/CustomerList'

const Customer = () => {
  return (
    <div className='container'>
        <CustomerForm />
        <CustomerList />
    </div>
  )
}

export default Customer
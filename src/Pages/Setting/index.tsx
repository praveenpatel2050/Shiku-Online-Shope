import React from 'react'
import BankAccountCard from './bankAccount';
const Setting = () => {
  const bankAccount = {
    accountNumber: '1234567890123456',
    balance: 5000,
    ownerName: 'John Doe',
    ifscCode: '123456bp'
  };
  return (
    <div>
    <div>
      <h1>Bank Account</h1>
      <BankAccountCard bankAccount={bankAccount} />
    </div>
    </div>
  )
}

export default Setting

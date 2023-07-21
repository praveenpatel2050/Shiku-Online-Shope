import React from 'react';
import Typography from '../../_component/ui/Typography';
import BankAccountCard from './bankAccount';
import UserProfile from './profileUser';
const Setting = () => {
  const bankAccount = {
    accountNumber: '1234567890123334',
    balance: 5000,
    ownerName: 'Praveen Kumar',
    ifscCode: '123456bp'
  };
  return (
    <div>
    <div>
      <UserProfile />
    </div>
    </div>
  )
}

export default Setting

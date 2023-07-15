import React from 'react';
import Typography from '../../_component/ui/Typography';
import BankAccountCard from './bankAccount';
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
    <Typography variant="h4" marked="left" component="h2" sx={{ flexGrow: 1, margin: '10px 20px' }}>
                      Bank Accounts:
                    </Typography>
      <BankAccountCard bankAccount={bankAccount} />
    </div>
    </div>
  )
}

export default Setting

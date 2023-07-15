import React from 'react';
import { Card, CardContent,  } from '@mui/material';
import Typography from '../../_component/ui/Typography';
interface BankAccount {
  accountNumber: string;
  balance: number;
  ownerName: string;
  ifscCode: string;
}

interface BankAccountCardProps {
  bankAccount: BankAccount;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({ bankAccount }) => {
  const maskedAccountNumber = bankAccount.accountNumber.slice(0, -4).replace(/\d/g, '*') + bankAccount.accountNumber.slice(-4);

  return (
    <Card sx={{maxWidth: '400px', margin: '20px', borderRadius: '10px', backgroundColor: "#F5FFFA", }}>
      <CardContent>
        <Typography variant="h6"  >
          Bank Account Details
        </Typography>
        <Typography color="textSecondary" sx={{margin: '10px 0px'}} variant="h5" gutterBottom>
          Owner: {bankAccount.ownerName}
        </Typography>
        <Typography variant="h5" >
          Account Number: {maskedAccountNumber}
        </Typography>
        <Typography variant="h5" sx={{margin: '10px 0px'}} >
          Ifsc: {bankAccount.ifscCode}
        </Typography>
        <Typography variant="h5" >
          Balance: {bankAccount.balance}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;

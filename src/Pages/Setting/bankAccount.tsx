import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Bank Account Details
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Owner: {bankAccount.ownerName}
        </Typography>
        <Typography variant="body2" component="p">
          Account Number: {maskedAccountNumber}
        </Typography>
        <Typography variant="body2" component="p">
          Ifsc: {bankAccount.ifscCode}
        </Typography>
        <Typography variant="body2" component="p">
          Balance: {bankAccount.balance}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;

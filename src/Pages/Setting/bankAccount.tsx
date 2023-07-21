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
        
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;

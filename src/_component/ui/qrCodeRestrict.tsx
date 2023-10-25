import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import QrCodeImage from '../../assets/qrcodepayment.png'
import { Button } from '@mui/material';
import Typography from './Typography';
interface QRCodePopupProps {
    closeModal: () => void;
    handleLogout: () => void;
    amount: any
}  
  
  const QRCodePopup: React.FC<QRCodePopupProps> = ({closeModal, amount, handleLogout}) => {
    const [isOpen, setIsOpen] = useState(true);

    // Generate the text for the QR code
    const qrText = `Scan this QR code to pay ${amount} and create your account.`;
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={QrCodeImage} alt='payment qr code' />
          <Typography sx={{ textTransform: 'capitalize'}} variant="h6">{qrText}</Typography>
          <Typography sx={{ textTransform: 'capitalize'}} variant="h6">After Payment Your Account Open With in 18 Hours</Typography>
          <Button  sx={{ marginTop: '20px', textTransform: 'capitalize', fontSize: 20, textDecoration: 'underline'}} onClick={handleLogout}>
            Back To Homepage
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePopup;

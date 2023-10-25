import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import QrCodeImage from '../../assets/qrcodepayment.png'
import { Button } from '@mui/material';
import Typography from './Typography';
interface QRCodePopupProps {
    closeModal: () => void;
    amount: any
}
  
  const QRCodePopup: React.FC<QRCodePopupProps> = ({closeModal, amount}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleCloseModal = () => {
      setIsOpen(false);
      setTimeout(closeModal, 500); // Close modal after the ease-out animation (500ms)
    };
    // Generate the text for the QR code
    const qrText = `Scan this QR code to pay ${amount} and create your account.`;
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={QrCodeImage} alt='payment qr code' />
          <Typography sx={{ textTransform: 'capitalize'}} variant="h6">{qrText}</Typography>
          <Typography sx={{ textTransform: 'capitalize'}} variant="h6">After Payment Your Account Open With in 18 Hours</Typography>
          <Button variant="contained" color="success" sx={{ marginTop: '20px'}} onClick={handleCloseModal}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePopup;

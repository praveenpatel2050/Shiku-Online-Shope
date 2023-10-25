import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import QrCodeImage from '../../assets/qrcodepayment.png'
import { Button } from '@mui/material';
import Typography from './Typography';
interface WithdrwalRequestPopupProps {
    closeModal: () => void;
    withdrawalText: string;
}
  
const WithdrwalRequestPopup: React.FC<WithdrwalRequestPopupProps> = ({closeModal, withdrawalText}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleCloseModal = () => {
      setIsOpen(false);
      setTimeout(closeModal, 500); // Close modal after the ease-out animation (500ms)
    };
    // Generate the text for the QR code

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ textTransform: 'capitalize'}} variant="h6">{withdrawalText}</Typography>
          <Button variant="contained" color="success" sx={{ marginTop: '20px'}} onClick={handleCloseModal}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrwalRequestPopup;

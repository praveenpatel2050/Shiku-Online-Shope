import React from 'react';
import { Snackbar } from "@mui/material";

interface PopupProps {
    open: boolean;
    message: string;
    onClose: () => void,
    color: string
  }
  
  const Popup: React.FC<PopupProps> = ({ open, message, onClose, color }) => {
    const handleClose = () => {
      onClose(); // Call the provided onClose callback when the snackbar is closed
    };
  
  return (
    <Snackbar
      message={message}
      open={open}
      onClose={handleClose}
      autoHideDuration={2000} 
      anchorOrigin={{
        vertical: 'top',
        horizontal: "center",
      }}
      sx={{
        "& .MuiSnackbarContent-root": {
          background: `${color}`, // Customize the background color
          color: "#fff", // Customize the text color
          textAlign: "center", // Center the text horizontally
        },
      }}
    />
  );
};

export default Popup;
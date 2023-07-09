import React, { useState } from 'react';
import {
  TextField, Button, Table,
  TableBody,
  TableCell,
  TableContainer,
  AppBar,
  Toolbar,
  TableRow, Box, Paper,
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "../../_component/ui/Typography";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
interface AccountInfo {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}

const theme = createTheme();

const AccountInfo: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [submitted, setSubmitted] = useState(true);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleEdit = () => {
    console.log("edit button Cliked")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = '/api/account-info'; // Replace with your API endpoint

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountInfo),
    })
      .then(response => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          console.error('Error:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          margin: "10px 20px",
          padding: "20px",
          maxWidth: "100%",
          backgroundColor: "white",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "5px",
        }}
      >
        {submitted ? (
          <>


            <TableContainer component={Paper}>
              <Box sx={{ flexGrow: 1, }}>
                <AppBar position="static" sx={{ backgroundColor: '#fff', color: 'black', boxShadow: 'none' }}>
                  <Toolbar>
                    <Typography variant="h4" marked="left" component="h2" sx={{ flexGrow: 1 }}>
                      Account Information:
                    </Typography>
                    {/* <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <BorderColorIcon />
                    </IconButton> */}
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "8px" }}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  </Toolbar>
                </AppBar>
              </Box>
              <Table>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        Bank Name:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        {accountInfo.bankName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        Account Holder Name:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        {accountInfo.accountHolderName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        Account Number:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        {accountInfo.accountNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        IFSC Code:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        {accountInfo.ifscCode}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (

          <form onSubmit={handleSubmit}>
            <TextField
              label="Bank Name"
              name="bankName"
              value={accountInfo.bankName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Account Holder Name"
              name="accountHolderName"
              value={accountInfo.accountHolderName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Account Number"
              name="accountNumber"
              value={accountInfo.accountNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="IFSC Code"
              name="ifscCode"
              value={accountInfo.ifscCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                margin: "10px auto",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            //onClick={handleSearch}
            >
              Submit Details
            </Button>
          </form>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AccountInfo;
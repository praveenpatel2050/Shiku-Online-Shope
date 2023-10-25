
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  AppBar,
  Toolbar,
  TableRow,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import addBankAccountApi from "../../Api/bankAccount";
import Typography from "../../_component/ui/Typography";
import { SingleUserApi, UpdateBankAccountApi } from "../../Api/user";

interface AccountInfo {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}

const theme = createTheme();

const AccountInfo: React.FC = () => {
  const [formData, setFormData] = useState<AccountInfo>({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const fetchAccountInfo = async () => {
    try {
      const url = "/user/userInfo";
      const response: any = await SingleUserApi(url);
      if (response.ok) {
        const data = await response.json();
        const accountInfo = data.userInfoData;
        if (accountInfo && accountInfo.bankAccountId.length > 0) {
          const bankInfo = accountInfo.bankAccountId[0];
          setFormData(bankInfo);
          setSubmitted(true);
        }
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const validateForm = () => {
    const { bankName, accountHolderName, accountNumber, ifscCode } = formData;
    return (
      bankName !== "" &&
      accountHolderName !== "" &&
      accountNumber !== "" &&
      ifscCode !== "" &&
      /^\d{12}$/.test(accountNumber)
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const url = "/user/addBankAccount";
      const response: any = await addBankAccountApi(url, formData);
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const url = "/user/updateBankAccount";
      await UpdateBankAccountApi(url, formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
    setIsEditMode(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          margin: "10px 20px",
          padding: "20px",
          maxWidth: "100%",
          background: "#F5FFFA",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "5px",
          "@media (min-width: 200px) and (max-width: 600px)": {
            padding: "0px",
            margin: "10px",
          },
        }}
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            {submitted ? (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar
                    position="static"
                    sx={{
                      backgroundColor: "#F5FFFA",
                      color: "black",
                      boxShadow: "none",
                    }}
                  >
                    <Toolbar>
                      <Typography
                        variant="h4"
                        marked="left"
                        component="h2"
                        sx={{
                          flexGrow: 1,
                          "@media (min-width: 200px) and (max-width: 600px)": {
                            fontSize: 19,
                          },
                        }}
                      >
                        Account Information:
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          margin: "8px",
                          "@media (min-width: 200px) and (max-width: 600px)": {
                            margin: "4px",
                            padding: "2px 0px",
                          },
                        }}
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
                          {formData.bankName}
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
                          {formData.accountHolderName}
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
                          {formData.accountNumber}
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
                          {formData.ifscCode}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            ) : (
              <div>
                <TextField
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="IFSC Code"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    margin: "10px auto",
                    height: "40px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  onClick={(event) => {
                    isEditMode ? handleUpdate(event) : handleSubmit(event);
                  }}
                >
                  {isEditMode ? "Update" : "Submit"}
                </Button>
              </div>
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AccountInfo;

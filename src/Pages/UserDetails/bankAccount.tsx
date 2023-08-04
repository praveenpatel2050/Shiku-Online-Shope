import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SingleUserApi } from '../../Api/user';
import { UserBankData, bankInitialState } from '../Setting/constant';

const UserBankAccount = () => {
  const [userId, setUserId] = useState("");
    const [bankAccount, setBankAccount] = useState<UserBankData>(bankInitialState);

    const getMode = () => {
        const path = window.location.href;
        const pathArray = path.split("/");
        if (pathArray[pathArray.length - 2] === "user") {
          const referralId = pathArray[pathArray.length - 1];
          setUserId(referralId);
        }
      };
    
      useEffect(() => {
        getMode();
      }, []);

      const fetchBankAccount = async () => {
        try {
          const url = `/user/userInfo?userId=${userId}`;
          const response: any = await SingleUserApi(url);
          const jsonData = await response.json();
          const userData = jsonData.userInfoData;
          const bankData = userData.bankAccountId;
          setBankAccount(bankData[0]);
          // }
        } catch (error) {
          console.error("Error", error);
        }
      };

      useEffect(() => {
        if (userId) {
          fetchBankAccount();
        }
      }, [userId,]);    

  return (
    <Box
      sx={{
        margin: "20px",
        "@media (min-width: 200px) and (max-width: 600px)": {
          margin: "5px",
        },
      }}
    >

          <Box
            className="card card-profile"
            sx={{
              padding: "10px",
              backgroundColor: "#F5FFFA",
            }}
          >
            {bankAccount && Object.keys(bankAccount).length > 0 ? (
              <>
                <Typography variant="h6">Bank Account Details</Typography>
                <Typography
                  color="textSecondary"
                  sx={{ margin: "10px 0px" }}
                  variant="h5"
                  gutterBottom
                >
                  Owner: {bankAccount.accountHolderName}
                </Typography>
                <Typography variant="h5">
                  Account Number: {bankAccount.accountNumber}
                </Typography>
                <Typography variant="h5" sx={{ margin: "10px 0px" }}>
                  Bank Name: {bankAccount.bankName}
                </Typography>
                <Typography variant="h5">
                  IFSC Code: {bankAccount.ifscCode}
                </Typography>
              </>
            ) : (
              <Typography
                sx={{ textTransform: "capitalize", color: "red", fontSize: 20 }}
              >
                {" "}  Bank Account Not Added !{" "}
              </Typography>
            )}
          </Box>    
    </Box>
  )
}

export default UserBankAccount
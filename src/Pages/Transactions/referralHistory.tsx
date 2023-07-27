import React, { useState, useEffect } from "react";
import { Box, Card } from "@mui/material";
import { referralColumns, referralinititalState, ReferralUsers } from "./constant";
import { Tables } from "../../_component/ui/table";
import { ReferralTransactionApi } from "../../Api/user";

const ReferralHistory = () => {
  const [transactions, setTransactions] = useState<ReferralUsers[]>([]);
  const fetchUsers = async () => {
    try {
      const url = "/user/referralTransactions";
      const {transactionData} = await ReferralTransactionApi(url);
      setTransactions(transactionData);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ margin: "15px", 
    "@media (min-width: 200px) and (max-width: 600px)": {
    margin: "5px",
  },  }}>
          <Card sx={{overflowX: "scroll"}}>
          <Box sx={{ minWidth: 500 }}>
            <Tables columns={referralColumns} data={transactions} pagination={true} />
          </Box>
        </Card>
    </Box>
  );
};

export default ReferralHistory;

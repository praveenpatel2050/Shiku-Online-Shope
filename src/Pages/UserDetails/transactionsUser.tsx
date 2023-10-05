import  { useState, useEffect, useMemo } from "react";
import { Box, Card } from "@mui/material";
import {
  referralColumns,
  ReferralUsers,
} from "../Transactions/constant"
import Tables from "../../_component/ui/table";
import { ReferralTransactionApi } from "../../Api/user";

const TransactionUser = () => {
  const [transactions, setTransactions] = useState<ReferralUsers[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userId, setUserId] = useState("");

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

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const fetchUsers = async () => {
    try {
      const url = `/user/referralTransactions?userId=${userId}`;
      const { transactionData } = await ReferralTransactionApi(url);
      setTransactions(transactionData);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useMemo(() => {
    if (userId) {
      fetchUsers();
    }
  }, [userId]);

  return (
    <Box
      sx={{
        margin: "15px",
        "@media (min-width: 200px) and (max-width: 600px)": {
          margin: "5px",
        },
      }}
    >
      <Card sx={{ overflowX: "scroll" }}>
        <Box sx={{ minWidth: 500 }}>
          <Tables
            columns={referralColumns}
            data={transactions}
            pagination={true}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default TransactionUser;

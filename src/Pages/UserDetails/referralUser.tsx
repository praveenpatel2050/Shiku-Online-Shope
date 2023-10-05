import  { useEffect, useMemo, useState } from 'react'
import { columns } from "../Reffral Users/constant";
import Tables from "../../_component/ui/table";
import { Box, Card, Typography } from '@mui/material';
import { listUserApi } from '../../Api/user';

export interface RefrralUsers {
  userName: string;
  mobileNumber: number | string;
  paymentStatus: string;
  totalItem: number | string;
  deliveryStatusText: number | string;
}

const ReferralListByUser = () => {
  const [users, setUsers] = useState<RefrralUsers[]>([]);
  const [isNoUser, setIsNoUser] = useState(false);
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
      const url = `/user/reflUserList?userId=${userId}`;
      const response: any = await listUserApi(url);
      if (response.ok) {
        const jsonData = await response.json();
        if (
          jsonData &&
          jsonData.refUserList &&
          jsonData.refUserList.length > 0
        ) {
          // Update the "Delivery Status" field for each user
          const modifiedUsers = jsonData.refUserList.map(
            (user: { deliveryStatus: string }) => ({
              ...user,
              deliveryStatusText:
                user.deliveryStatus === "0" ? "Pending" : "Delivered",
            })
          );
          setUsers(modifiedUsers);
        } else {
          setIsNoUser(true);
        }
      } else if (response.status === 404) {
        setIsNoUser(true);
      }
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
        margin: "20px",
        "@media (min-width: 200px) and (max-width: 600px)": {
          margin: "5px",
        },
      }}
    >
       {isNoUser ? (
        <Typography variant="h6" align="center">
          There are no users added by user
        </Typography>
      ) : (
        <Card sx={{ overflowX: "scroll" }}>
          <Box sx={{ minWidth: 800 }}>
            {/* Pass the modified users data with the updated "Delivery Status" */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: 25,
                marginLeft: 2,
                textTransform: "capitalize",
                "@media (min-width: 200px) and (max-width: 600px)": {
                  fontSize: 11,
                },
              }}
            >
              Referral Users
            </Typography>
            <Tables
              columns={columns}
              data={users}
              pagination={true}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      )}
      </Box>
  )
}

export default ReferralListByUser
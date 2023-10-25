import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  AppBar,
  Toolbar,
  capitalize,
  Checkbox,
} from "@mui/material";

import Tables from "../../_component/ui/table";
import { columns } from "./constant";
import { AllUserListApi } from "../../Api/admin";

export interface RefrralUsers {
  _id: string;
  userName: string;
  mobileNumber: number | string;
  totalItem: number | string;
  planItemName: string;
}
const UserRequest = () => {
  const [users, setUsers] = useState<RefrralUsers[]>([]);
  const [isNoUser, setIsNoUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
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

  const handleCheckboxChange = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      // If it's already selected, remove it from the array
      setSelectedUserIds((prevSelectedUserIds) =>
        prevSelectedUserIds.filter((id) => id !== userId)
      );
    } else {
      // If it's not selected, add it to the array
      setSelectedUserIds((prevSelectedUserIds) => [...prevSelectedUserIds, userId]);
    }
  }
 const handleCheckboxSubmit = () => {
  console.log("selectedUserIds", selectedUserIds)
 }

  const fetchUsers = async () => {
    try {
      const url = "/user/list?paymentStatus=0";
      const response: any = await AllUserListApi(url);
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData && jsonData.userList && jsonData.userList.length > 0) {
          // Update the "Delivery Status" field for each user
          const modifiedUsers = jsonData.userList.map(
            (user: { deliveryStatus: string; paymentStatus: string }) => ({
              ...user
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

  useEffect(() => {
    fetchUsers();
    // console.log("fetchUSer" users.deliveryStatus)
  }, []);

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
        sx={{
          flexGrow: 1,
          marginBottom: "20px",
          "@media (min-width: 200px) and (max-width: 600px)": {
            marginBottom: "10px",
          },
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "#F5FFFA", color: "black" }}
        >
          <Toolbar
            sx={{
              "@media (min-width: 200px) and (max-width: 600px)": {
                padding: "0px 8px",
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: 25,
                textTransform: 'capitalize',
                "@media (min-width: 200px) and (max-width: 600px)": {
                  fontSize: 11,
                },
              }}
            > 
              Pending User Payment
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {isNoUser ? (
        <Typography variant="h6" align="center" sx={{ textTransform: 'capitalize' }}>
          There no payment request pending.
        </Typography>
      ) : (
        <>
          <Card sx={{ overflowX: "scroll" }}>
            <Box sx={{ minWidth: 800 }}>
              {/* Pass the modified users data with the updated "Delivery Status" */}
              <Tables
                columns={columns}
                data={users}
                pagination={true}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onCheckboxChange={handleCheckboxChange}
              />
            </Box>
          </Card>
          <Button
            sx={{
              width: '140px',
              margin: '20px 0px',
              letterSpacing: '1px', 
              fontSize: 20,
              "@media (min-width: 200px) and (max-width: 600px)": {
                padding: "2px 12px",
                fontSize: "0.7rem",
              },
            }}
            onClick={handleCheckboxSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </>
      )}
      
    </Box>
  );
};

export default UserRequest;

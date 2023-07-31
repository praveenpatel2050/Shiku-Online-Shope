import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  AppBar,
  Toolbar,
  SvgIcon,
} from "@mui/material";

import Tables  from "../../_component/ui/table";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { AllUserListApi } from "../../Api/admin";
import { columns } from "./constant";

export interface RefrralUsers {
  userName: string;
  mobileNumber: number | string;
  paymentStatus: string;
  totalItem: number | string;
  deliverySatus: number | string;
}
const AllUserList = () => {
  const [users, setUsers] = useState<RefrralUsers[]>([]);
  const [isNoUser, setIsNoUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const url = "/user/list";
      const response: any = await AllUserListApi(url);
      if (response.ok) {
        const jsonData = await response.json();
        if (
          jsonData &&
          jsonData.userList &&
          jsonData.userList.length > 0
        ) {
          // Update the "Delivery Status" field for each user
          const modifiedUsers = jsonData.userList.map(
            (user: { deliverySatus: number }) => ({
              ...user,
              deliveryStatusText:
                user.deliverySatus === 0 ? "Pending" : "Delivered",
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
    console.log("fetchUSer")
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
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: 11,
              },
            }}
          >
            My Team 
          </Typography>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PersonAddAlt1Icon />
              </SvgIcon>
            }
            sx={{
              "@media (min-width: 200px) and (max-width: 600px)": {
                padding: "2px 12px",
                fontSize: "0.7rem",
              },
            }}
            onClick={() => navigate(`/adduser/`)}
            variant="contained"
          >
            Add Users
          </Button>
        </Toolbar>
      </AppBar>
    </Box>

    {isNoUser ? (
      <Typography variant="h6" align="center">
        There are no users added by you. <br />
        Click Add Users Button For Add Users
      </Typography>
    ) : (
      <Card sx={{ overflowX: "scroll" }}>
        <Box sx={{ minWidth: 800 }}>
          {/* Pass the modified users data with the updated "Delivery Status" */}
          <Tables columns={columns} data={users} pagination={true} page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}  />
        </Box>
      </Card>
    )}
  </Box>
  )
}

export default AllUserList
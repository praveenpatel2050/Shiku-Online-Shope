import { useState, FC, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { columns } from "../Reffral Users/constant";
import Tables from "../../_component/ui/table";
import { useNavigate } from "react-router-dom";
import { listUserApi } from "../../Api/user";

export interface RefrralUsers {
  userName: string;
  mobileNumber: number | string;
  paymentStatus: string;
  totalItem: number | string;
  deliveryStatusText: number | string;
}
interface IList {
    userId: string
}

const ReffralUsers: FC<IList>  = ( userId) => {
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
            (user: { deliverySatus: string }) => ({
              ...user,
              deliveryStatusText:
                user.deliverySatus === "0" ? "Pending" : "Delivered",
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
          </Toolbar>
        </AppBar>
      </Box>

      {isNoUser ? (
        <Typography variant="h6" align="center">
          There are no users added by user
        </Typography>
      ) : (
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
            />
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ReffralUsers;

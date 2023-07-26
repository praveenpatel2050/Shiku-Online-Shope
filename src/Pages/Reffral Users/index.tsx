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
import { columns } from "./constant";
import { Tables } from "../../_component/ui/table";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { listUserApi } from "../../Api/user";

export interface RefrralUsers {
  userName: string;
  mobileNumber: number | string;
  paymentStatus: string;
  totalItem: number | string;
  deliverySatus: number | string;
}

const ReffralUsers = () => {
  const [users, setUsers] = useState<RefrralUsers[]>([]);
  const [isNoUser, setIsNoUser] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const url = "/user/reflUserList";
      const response: any = await listUserApi(url, users);
      if (response.ok) {
        const jsonData = await response.json();
        if (
          jsonData &&
          jsonData.refUserList &&
          jsonData.refUserList.length > 0
        ) {
          // Update the "Delivery Status" field for each user
          const modifiedUsers = jsonData.refUserList.map(
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
                Referral Users
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
          <Card sx={{ overflow: "scroll" }}>
            <Box sx={{ minWidth: 800 }}>
              {/* Pass the modified users data with the updated "Delivery Status" */}
              <Tables columns={columns} data={users} />
            </Box>
          </Card>
        )}
      </Box>
  );
};

export default ReffralUsers;

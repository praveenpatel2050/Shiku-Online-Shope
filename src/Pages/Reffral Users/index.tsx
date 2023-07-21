import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Button,
  Typography,
  AppBar,
  Toolbar,
  SvgIcon
} from "@mui/material";
import { columns } from "./constant";
import { Tables } from "../../_component/ui/table";
import { Link, useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { listUserApi } from "../../Api/user";
import { getReferralBy } from "../../_component/other/referralBy";

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
  const [referraBy, setReferralBy] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getReferralCode = async () => {
      const referralCode = await getReferralBy();
      setReferralBy(referralCode);
    };
    getReferralCode();
  }, []);
  const fetchUsers = async () => {
    try {
      const url = "/user/reflUserList";
      const response: any = await listUserApi(url, users);
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData && jsonData.refUserList && jsonData.refUserList.length > 0) {
          // Update the "Delivery Status" field for each user
          const modifiedUsers = jsonData.refUserList.map((user: { deliverySatus: number; }) => ({
            ...user,
            deliveryStatusText: user.deliverySatus === 0 ? "Pending" : "Delivered"
          }));
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
    <>
      <div style={{ margin: "20px" }}>
        <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: "#F5FFFA", color: "black" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontSize: 25 }}
              >
                Referral Users
              </Typography>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PersonAddAlt1Icon />
                  </SvgIcon>
                }
                onClick={() => navigate(`/adduser/${referraBy}`)}
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
          <Card>
            <Box sx={{ minWidth: 800, overflow: "scroll" }}>
              {/* Pass the modified users data with the updated "Delivery Status" */}
              <Tables columns={columns} data={users} />
            </Box>
          </Card>
        )}

      </div>
    </>
  );
};

export default ReffralUsers;

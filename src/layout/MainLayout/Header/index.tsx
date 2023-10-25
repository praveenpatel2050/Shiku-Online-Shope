/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Toolbar,
} from "@mui/material";

import User1 from "../../../assets/hanumanjii.jpg";
import { useAppDispatch } from "../../../hooks/hook";
import { logout } from "../../../store/userAuth/authSlice";
import Typography from "../../../_component/ui/Typography";
import { SingleUserApi } from "../../../Api/user";
import QRCodePopup from '../../../_component/ui/qrCodeRestrict';

interface HeaderProps {
  user: any;
  handleDrawerToggle: () => void;
}




const Header = ({ user, handleDrawerToggle }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<number | string>();
  const handleOnLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const url = `/user/userInfo`;
        const response: any = await SingleUserApi(url);
        const jsonData = await response.json();
        const userData = jsonData.userInfoData;
        console.log('userData', userData)
        if (userData.paymentStatus == 0) {
          console.log("true");
          setAmount(userData.totalAmount)
          // setIsModalOpen(true)
        } else if (userData.paymentStatus == "1") {
          console.log("false");
        } else {
          console.log("nothing coming");
        }
        // }
      } catch (error) {
        console.error("Error", error);
      }
    };
    UserInfo();
  }, []);

  return (
    <>
    <AppBar
      enableColorOnDark
      position="fixed"
      elevation={0}
      sx={{ backgroundColor: "background.paper", padding: "0px" }}
    >
      <Toolbar
        sx={{
          "@media (min-width: 200px) and (max-width: 560px)": {
            paddingLeft: "2px",
            margin: "0px 5px",
          },
        }}
      >
        {/* logo section */}
        <Box
          sx={{
            display: "flex",
            width: 228,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: '.3rem',
              // flexGrow: { md: 1 },
              color: "#1C2472",
            }}
          >
            <span>Upper</span>
            <span style={{ color: "#6F7BF7" }}>Digital</span>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
              "@media (min-width: 200px) and (max-width: 560px)": {
                padding: "2px",
                margin: "0px 5px",
              },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* header search  */}

        {/* Profile */}
        <Chip
          sx={{
            ml: "auto",
            height: "48px",
            alignItems: "center",
            borderRadius: "24px",
            cursor: "pointer",
            lineHeight: 0,
            "@media (min-width: 200px) and (max-width: 560px)": {
              fontSize: "0.675rem",
              margin: "0px 5px",
              height: "35px",
            },
          }}
          icon={
            <Avatar
              src={User1}
              sx={{
                "@media (min-width: 200px) and (max-width: 560px)": {
                  width: "30px",
                  height: "30px",
                },
              }}
            />
          }
          label={<Typography>{user?.name}</Typography>}
          variant="outlined"
        />
        <Button
          disableElevation
          variant="contained"
          sx={{
            ml: 2,
            "@media (min-width: 200px) and (max-width: 560px)": {
              fontSize: "0.675rem",
              margin: "0px 5px 0px 0px",
              padding: "5px ",
            },
          }}
          onClick={handleOnLogout}
        >
          {"Logout"}
        </Button>
      </Toolbar>
    </AppBar>
    {isModalOpen && <QRCodePopup handleLogout={handleOnLogout} amount={amount} closeModal={closeModal} />}
    </>
  );
};

export default Header;

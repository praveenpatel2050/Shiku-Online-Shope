import  { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ShikuOnlineLogo from "../../../assets/logo.png";
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
import { useNavigate } from "react-router-dom";
import { OrderData } from "../../../Pages/NewUser/constant";
import { OrderIdGenerate } from "../../../Api/payment";

interface HeaderProps {
  user: any;
  handleDrawerToggle: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface RazorpayResponse {
  razorpay_payment_id: string;
}
const orderInitialState: any = {
  requestAmount: 0,
};

const Header = ({ user, handleDrawerToggle }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState<string>("");
  const [orderData, _setOrderData] = useState<OrderData>(orderInitialState);

  const handleOnLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
  };
  const navigate = useNavigate();

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(amount: number | null) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_V4tGgwJD2STEcq",
      currency: "INR",
      amount: amount !== null ? amount * 100 : 0,
      name: "Shiku Online Shopee",
      description: "Thanks for purchasing",
      image: ShikuOnlineLogo,
      order_id: orderId,
      handler: function (response: RazorpayResponse) {
        alert("Payment Successfully");
        console.log(response)
        navigate("/dashboard");
      },

      prefill: {
        name: "Shiku Online Shopee",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const url = `/user/userInfo`;
        const response: any = await SingleUserApi(url);
        const jsonData = await response.json();
        const userData = jsonData.userInfoData;
        if (userData.paymentStatus == "2") {
          const orderIdUrl = "/user/createOrder";
          // setAmount(userData.totalAmount);
          // console.log("amount", amount);
          try {
            const orderResponse: any = await OrderIdGenerate(orderIdUrl, orderData);
            const jsonData = await orderResponse.json();
            if (jsonData) {
              navigate(`adduser/paynow/${jsonData.id}`)
              setOrderId(jsonData.id)
              displayRazorpay(userData.totalAmount);
            }
          } catch (error) {
            console.error("Error", error);
          }
          console.log("true");
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
  );
};

export default Header;

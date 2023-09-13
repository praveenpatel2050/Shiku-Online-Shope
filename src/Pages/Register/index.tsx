import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import Typography from "../../_component/ui/Typography";
import {
  FormData,
  OrderData,
  SignUpFormData,
  addUserFormField,
} from "../NewUser/constant";
import { RegisterUserApi } from "../../Api/user";
import { useNavigate } from "react-router-dom";
import ShikuOnlineLogo from "../../assets/logo.png";
import { login, selectAuth } from "../../store/userAuth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Navigate } from "react-router-dom";
import Popup from "../../_component/ui/popup";

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

const Register = () => {
  const [referralBy, setReferralBy] = useState<string>("");

  const navigate = useNavigate();
  const getMode = () => {
    const path = window.location.href;
    const pathArray = path.split("/");
    if (pathArray[pathArray.length - 2] === "register") {
      const referralId = pathArray[pathArray.length - 1];
      setReferralBy(referralId);
    }
  };

  useEffect(() => {
    getMode();
    // setMobileNumber();
    setFormData((prevFormData) => ({
      ...prevFormData,
      referralCode: referralBy,
    }));
  }, [referralBy]);

  const handleChange = (name: keyof FormData, value: string) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    updatedFormData.planAmount =
      updatedFormData.planItemName === "belt" ||
      updatedFormData.planItemName === "watch"
        ? 100
        : updatedFormData.planItemName === "smart Watch"
        ? 1000
        : 10;
    updatedFormData.totalAmount =
      updatedFormData.planAmount * updatedFormData.totalItem;
    orderData.requestAmount = updatedFormData.totalAmount;
    setAmount(updatedFormData.totalAmount);
    setMobileNumber(formData.mobileNumber);
    setPassword(formData.password);
    setFormData(updatedFormData);
  };

  const initialState = {
    userName: "",
    password: "",
    // mobileNumber: undefined as number | undefined,
    mobileNumber: null,
    planAmount: "",
    planItemName: "",
    totalAmount: 0,
    totalItem: 0,
    cartAmount: "0",
    paymentStatus: "0",
    referralCode: `${referralBy}`,
  };

  const [formData, setFormData] = useState<SignUpFormData>(initialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [openPopup, setOpenPopup] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");
  const [orderData, setOrderData] = useState<OrderData>(orderInitialState);
  const [mobileNumber, setMobileNumber] = useState<number | null >(null);
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const auth: any = useAppSelector(selectAuth);

  const validateForm = () => {
    const errors: { [key: string]: boolean } = {};
    for (const field of addUserFormField) {
      const { name, label } = field;
      if (!formData[name as keyof FormData]) {
        errors[name] = true;
        console.log(`Error: ${label} is required.`);
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const url = "/user/signup";
      const response: any = await RegisterUserApi(url, formData);
      const jsonData = await response.json();

      console.log(jsonData);
      if (jsonData.status == 201 || jsonData.status == 200) {
        console.log("mobileNumber", mobileNumber, password);
        const url = "/user/login";
        console.log("new user");
        dispatch(login({ mobileNumber, password, url }));
      } else if (jsonData.status == 409) {
        console.log("user already exits with this mobile number");
        setOpenPopup(true);
      }
      console.log("formData", formData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (auth.isLoggedIn) {
    if (localStorage.getItem("refreshed")) {
      localStorage.removeItem("refreshed");
      window.location.reload();
    }
    return <Navigate to="/dashboard" replace />;
  }

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

  async function displayRazorpay(amount: number) {
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
      amount: amount * 100,
      name: "Shiku Online Shopee",
      description: "Thanks for purchasing",
      image: ShikuOnlineLogo,
      order_id: orderId,
      handler: function (response: RazorpayResponse) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
        // navigate('/login')
      },

      prefill: {
        name: "Shiku Online Shopee",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          padding: "0px",
          "@media (min-width: 0px)": {
            maxWidth: "844px",
          },
        }}
      >
        <Box
          sx={{
            padding: "10px",
            width: "100%",
            marginTop: "20px",
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            "@media (min-width: 200px) and (max-width: 560px)": {
              padding: "10px",
              width: "99%",
            },
        }}
        >
          <Box
            className="row"
            sx={{
              marginLeft: "0px",
              "@media (min-width: 200px) and (max-width: 560px)": {
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px",
                width: "100%",
                padding: "20px",
                borderRadius: "5px",
              },
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                margin: "0px 0px 8px 0px",
                "@media (min-width: 200px) and (max-width: 600px)": {
                  fontSize: 24,
                },
              }}
            >
              Register
            </Typography>
            {addUserFormField.map((item: any, index: number) => {
              const { label, name, type, inputProps, sx, InputLabelProps } =
                item;
              const error = formErrors[name] || false;
              if (type === "select") {
                return (
                  <FormControl
                    key={index}
                    sx={{
                      width: "25ch",
                      margin: "8px",
                    }}
                  >
                    <InputLabel>{label}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name={name}
                      value={formData[name as keyof FormData]}
                      label={label}
                      onChange={(event) =>
                        handleChange(
                          name as keyof FormData,
                          event.target.value as string
                        )
                      }
                      sx={sx}
                      error={error}
                    >
                      {item?.option?.map(
                        (
                          option: { label: string; value: string },
                          index: number
                        ) => {
                          return (
                            <MenuItem key={index} value={option.value}>
                              {option.label}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                );
              }
              return (
                <>
                  <TextField
                    fullWidth
                    key={index}
                    error={error}
                    id="outlined-controlled"
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name as keyof FormData]}
                    inputProps={inputProps ?? {}}
                    InputLabelProps={InputLabelProps ?? {}}
                    onChange={(event) =>
                      handleChange(name as keyof FormData, event.target.value)
                    }
                    sx={{
                      "@media (min-width: 200px) and (max-width: 560px)": {
                        marginBottom: "20px",
                        width: "100%",
                      },
                    }}
                  />
                </>
              );
            })}
            <TextField
              disabled
              label="Referral Code"
              name="referralCode"
              value={formData.referralCode}
            ></TextField>
            <Box className="footer-btn" sx={{ padding: "0px 8px" }}>
              <Stack direction={"row"}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{
                    margin: "8px 0px",
                    width: "90px",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="reset"
                  sx={{ margin: "8px 20px", width: "90px" }}
                  onClick={() => setFormData(initialState)}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
      <Popup
        open={openPopup}
        message="User Already Exits"
        onClose={() => setOpenPopup(false)}
        color="red"
      />
    </>
  );
};

export default Register;

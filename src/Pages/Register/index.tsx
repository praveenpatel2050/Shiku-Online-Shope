/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
import { Plan, registerInitialState } from "../NewUser/constant";
import {
  FormData,
  SignUpFormData,
  addUserFormField,
} from "../NewUser/constant";
import { RegisterUserApi } from "../../Api/user";
import { selectAuth } from "../../store/userAuth/authSlice";
import { useAppSelector } from "../../hooks/hook";
import { Navigate } from "react-router-dom";
import { productListApi } from "../../Api/plan";
import QRCodePopup from "../../_component/ui/qrCodePopup";
import AppAppBar from "../../_component/ui/AppBar";

const Register = () => {
  const [referralBy, setReferralBy] = useState<string>("");
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
    if (name === "planItemName") {
      const selectedPlan = plans.find((plan) => plan._id === value);
      console.log("selectedPlan", selectedPlan);
      const planAmounts = selectedPlan?.price || 0;
      console.log("planAmount", planAmounts);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        planAmount: planAmounts,
        referralCode: referralBy,
      }));
      console.log("formData.planAmount", formData.planAmount);
    } else {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };

      (updatedFormData.totalAmount =
        formData.planAmount * updatedFormData.totalItem),
        console.log("totalItem", updatedFormData.totalItem);
      console.log("totalAmount", updatedFormData.totalAmount);
      setAmount(updatedFormData.totalAmount);
      console.log("updatedformData", updatedFormData);
      setFormData(updatedFormData);
    }
  };

  const [formData, setFormData] =
    useState<SignUpFormData>(registerInitialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [amount, setAmount] = useState<number>(0);
  // const [mobileNumber] = useState<number | null>(null);
  // const [password] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(
    localStorage.getItem("isButtonDisabled") === "true"
  );
  const [plans, setPlans] = useState<Plan[]>([]);
  // const dispatch = useAppDispatch();
  const auth: any = useAppSelector(selectAuth);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const url = "/product/list";
        const response: any = await productListApi(url);
        const data = await response.json();
        console.log("data", data.productData);
        if (data) {
          setPlans(data.productData);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "isButtonDisabled",
      isPaymentButtonDisabled.toString()
    );
  }, [isPaymentButtonDisabled]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentButtonClick = () => {
    setPaymentButtonDisabled(true);
  };

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
      console.log(amount);
      if (jsonData.status == 201 || jsonData.status == 200) {
        // const url = "/user/login";
        setPaymentButtonDisabled(false);
        setAmount(formData.totalAmount);
        setUserCreated(true);
        // dispatch(login({ mobileNumber, password, url }));
        openModal();
      } else if (jsonData.status == 409) {
        console.log("user already exits with this mobile number");
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

  // async function displayRazorpay(amount: number) {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("You are offline... Failed to load Razorpay SDK");
  //     return;
  //   }

  //   const options = {
  //     key: "rzp_test_V4tGgwJD2STEcq",
  //     currency: "INR",
  //     amount: amount * 100,
  //     name: "Shiku Online Shopee",
  //     description: "Thanks for purchasing",
  //     image: ShikuOnlineLogo,
  //     order_id: orderId,
  //     handler: function (response: RazorpayResponse) {
  //       alert(response.razorpay_payment_id);
  //       alert("Payment Successfully");
  //       // navigate('/login')
  //     },

  //     prefill: {
  //       name: "Shiku Online Shopee",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  return (
    <>
      <AppAppBar />
      <Container
        component="main"
        sx={{
          padding: "0px",
          width: '50%',
          "@media (min-width: 200px) and (max-width: 560px)": {
            width: "99%",
            margin: "auto",
            overflow: 'hidden',
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            padding: "10px",

            "& .MuiTextField-root": { m: 1, width: "25ch" },
            "@media (min-width: 200px) and (max-width: 560px)": {
              padding: "10px",
              width: "99%",
              margin: "auto",
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
                alignItems: "left",
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
                marginBottom: "30px",
                marginTop: '20px',
                "@media (min-width: 200px) and (max-width: 600px)": {
                  fontSize: 24,
                marginTop: '10px',

                },
              }}
            >
              Sign Up
            </Typography>

            {addUserFormField.map((item: any, index: number) => {
              const { label, name, type, inputProps, sx, InputLabelProps } =
                item;
              const error = formErrors[name] || false;

              if (type === "select") {
                return (
                  <>
                    <FormControl sx={{ width: "25ch", margin: "8px" }}>
                      <InputLabel>{`plan`}</InputLabel>
                      <Select
                        sx={{ color: "#33333" }}
                        value={formData.planId}
                        name="planItemName"
                        // onChange={(e: any) => handlePlanChange(e)}
                        onChange={(event) =>
                          handleChange("planItemName", event.target.value)
                        }
                      >
                        {plans.map((plan) => (
                          <MenuItem key={plan._id} value={plan._id}>
                            {plan.productName} of ₹{plan.price}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                  </>
                );
              }
              return (
                <TextField
                  key={index}
                  error={error}
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
              );
            })}

            <Box className="footer-btn" sx={{ padding: "0px 8px" }}>
              <Stack
                direction={"row"}
                sx={{
                  "@media (max-width: 560px)": {
                    flexDirection: "column",
                    width: "25ch",
                  },
                  "@media (min-width: 561px)": {
                    "& > :not(:last-child)": {
                      marginRight: "10px", // Add margin between buttons on larger screens
                    },
                  },
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    margin: "8px 0px",
                    textTransform: "capitalize",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  type="reset"
                  sx={{
                    margin: "8px 0px",
                    textTransform: "capitalize",
                    color: "black",
                    backgroundColor: "#F88379",
                    "&:hover": {
                      backgroundColor: "#FA8072",
                    },
                  }}
                  onClick={() => setFormData(registerInitialState)}
                >
                  Reset
                </Button>

                {userCreated && (
                  <>
                    <Button
                      onClick={handlePaymentButtonClick}
                      variant="contained"
                      type="submit"
                      sx={{
                        margin: "8px 0px",
                        textTransform: "capitalize",
                      }}
                      disabled={isPaymentButtonDisabled}
                    >
                      Payment Done
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      sx={{
                        margin: "8px 0px",
                        backgroundColor: "#F88379",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "#FA8072",
                        },
                      }}
                      onClick={openModal}
                    >
                      Retry Payment
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
      {isModalOpen && <QRCodePopup amount={amount} closeModal={closeModal} />}
    </>
  );
};

export default Register;

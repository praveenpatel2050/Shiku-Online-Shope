import React, { useState, useEffect} from "react";
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
import Typography from "../../_component/ui/Typography"
import { FormData, SignUpFormData, addUserFormField } from "../NewUser/constant";
import { RegisterUserApi } from "../../Api/user";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
}

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
    console.log("refferel",referralBy);

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
    setFormData(updatedFormData);
  };

  const initialState = {
    userName: "",
    password: "",
    mobileNumber: "",
    // gender: "",
    // dob: "",
    // address: "",
    planAmount: '100',
    planItemName: '',
    totalItem: "",
    totalAmount: '1000',
    cartAmount: '0',
    paymentStatus: '0',
    referralCode: `${referralBy}`,
  };

  const [formData, setFormData] = useState<SignUpFormData>(initialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});



  const amount = 100

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
      navigate("/login")
    } catch (error) {
      console.error("Error", error);
    }
  };

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
    
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('You are offline... Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: 'rzp_test_VdGdvprTKB8u1w',
      currency: 'INR',
      amount: amount * 100,
      name: 'Code with akky',
      description: 'Thanks for purchasing',
      image: 'https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png',
      handler: function (response: RazorpayResponse) {
        alert(response.razorpay_payment_id);
        alert('Payment Successfully');
      },
      prefill: {
        name: 'code with akky',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
        <Container component="main" maxWidth="xs" sx={{
      padding: "0px",
      "@media (min-width: 0px)": {
        maxWidth: "844px",
      },}}>
       <Box
        sx={{
          padding: "10px",
          width: "100%",
          marginTop: "20px",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          "@media (min-width: 200px) and (max-width: 560px)": {
            padding: "10px",
            width: "99%",
            margin: "auto",
          },
        }}
      > 
          <Box className="row" sx={{
            marginLeft: '0px',
            "@media (min-width: 200px) and (max-width: 560px)": {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              maxWidth: '400px',
              width: '100%',
              padding: '20px',
              borderRadius: '5px',
            },
          }}>
                 <Typography component="h1" variant="h4" sx={{ margin: '0px 0px 8px 10px',"@media (min-width: 200px) and (max-width: 600px)": {
            fontSize: 24,
          },}}>
          Register
        </Typography>
            {addUserFormField.map((item: any, index: number) => {
              const { label, name, type, inputProps, sx, InputLabelProps } = item;
              const error = formErrors[name] || false
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
                      onChange={(event) => handleChange(name as keyof FormData, event.target.value as string) }
                      sx={sx}
                      error={error}
                    >
                      {item?.option?.map(
                        (
                          option: { label: string; value: string },
                          index: number,
                        ) => {
                          return (
                            <MenuItem key={index} value={option.value}>
                              {option.label}
                            </MenuItem>
                          );
                        },
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
                    onChange={(event) => handleChange(name as keyof FormData, event.target.value)}
                    sx={{
                      "@media (min-width: 200px) and (max-width: 560px)": {
                        marginBottom: '20px', width: '100%'
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
            >
            </TextField>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '223px', margin: "8px 8px" }}
              onClick={() => displayRazorpay(amount)}
            >
              Pay Now
            </Button>
            <Box className="footer-btn" sx={{padding: '0px 8px'}}>
              <Stack direction={"row"}>

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{
                    margin: "8px 0px", width: "100px"
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="reset"
                  sx={{ margin: "8px 20px", width: "100px" }}
                  onClick={() => setFormData(initialState)}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
         </Box>
      </Box>
      </Container>
    </>
  );
};

export default Register;
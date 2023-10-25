import { useEffect, useState } from "react";
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
import { addUserFormField } from "./constant";
import { FormData, OrderData } from "./constant";
import { addUserApi } from "../../Api/user";
import Popup from "../../_component/ui/popup";
import { OrderIdGenerate } from "../../Api/payment";
import QRCodePopup from "../../_component/ui/qrCodePopup";
import { productListApi } from "../../Api/plan";

const initialState: any = {
  userName: "",
  password: "",
  mobileNumber: "",
  planAmount: "",
  planItemName: "",
  totalAmount: 0,
  totalItem: 0,
  cartAmount: "0",
  paymentStatus: "0",
};
interface Plan {
  _id: string;
  productName: string;
  imageUrl: string;
  price: number;
  mrp: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const orderInitialState: any = {
  requestAmount: 0,
};
      // const planAmount = selectedPlan
      //   ? selectedPlan.price
      //     ? parseInt(selectedPlan.price)
      //     : 0
      //   : 0;

const NewUser = () => {

  const handleChange = (name: keyof FormData, value: string) => {
    // if (name === "planItemName") {
      const selectedPlan = plans.find((plan) => plan._id === value);
      console.log('selectedPlan', selectedPlan)
      const planAmount = selectedPlan?.price || 0;
      console.log('planAmount', planAmount);

      const updatedFormData = {
        ...formData,
        [name]: value,
        planAmount: planAmount,
      };
      console.log('totalItem', updatedFormData.totalItem)
      updatedFormData.totalAmount = planAmount * formData.totalItem,
      setFormData(updatedFormData)
      console.log('formData w', formData)
    // }
         
  };
  
  const handlePlanChange = (event: any) => {
    const selectedPlanId = event.target.value as string; // Assuming planId is of type string
    setFormData({
      ...formData,
      planId: selectedPlanId,
    });
  }; 
     
  // scraping
  ("");
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [openPopup, setOpenPopup] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [orderData, _setOrderData] = useState<OrderData>(orderInitialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(
    localStorage.getItem("isButtonDisabled") === "true"
  );
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    // Fetch the list of plans from an API
    const fetchPlans = async () => {
      try {
        const url = "/product/list";
        const response: any = await productListApi(url);
        const data = await response.json();
        console.log("data", data.productData);
        if (data) {
          setPlans(data.productData); // Set the plans state with the fetched data
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchPlans(); // Call the fetchPlans function when the component mounts
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
      const url = "/user/add";
      const response: any = await addUserApi(url, formData);
      console.log("amount", amount);
      console.log(formData.totalAmount);
      // if (response) {
      //   const orderIdUrl = "/user/createOrder";
      //   try {
      //     const orderResponse: any = await OrderIdGenerate(
      //       orderIdUrl,
      //       orderData
      //     );
      //     const jsonData = await orderResponse.json();
      //     if (jsonData) {
      //       openModal();
      //       setPaymentButtonDisabled(false);
      //       setUserCreated(true);
      //     }
      //   } catch (error) {
      //     console.error("Error", error);
      //   }
      // }
      // setFormData(response);
      console.log("formData", formData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <Container
        sx={{
          background: "#f5f5f5", // Average color of the background image.
          backgroundPosition: "center",
          marginBottom: "20px",
          borderRadius: "5px", // Add a border radius to the container
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
          width: "60%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          "@media (min-width: 200px)": {
            maxWidth: "100%",
          },
          "@media (min-width: 200px) and (max-width: 560px)": {
            padding: "10px",
            width: "99%",
            margin: "auto",
          },
          // Ensure the container takes the full height of the viewport
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
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: 25,
                margin: "10px 10px",
                "@media (min-width: 200px) and (max-width: 560px)": {
                  fontSize: 18,
                  alignText: "center",
                },
              }}
            >
              Add New User
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
                sx={{ color: '#33333'}}
                  value={formData.planId}
                  name="planItemName"
                  // onChange={(e: any) => handlePlanChange(e)}
                  onChange={(event) =>
                    handleChange('planItemName', event.target.value)
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
              <Stack direction={"row"}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{
                    margin: "8px 0px",
                    width: "90px",
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
                    margin: "8px 20px",
                    textTransform: "capitalize",
                    width: "90px",
                    color: "black",
                    backgroundColor: "#F88379",
                    "&:hover": {
                      backgroundColor: "#FA8072",
                    },
                  }}
                  onClick={() => setFormData(initialState)}
                >
                  Reset
                </Button>
                <Popup
                  open={openPopup}
                  message="Data Added Successfully"
                  onClose={() => setOpenPopup(false)}
                  color="green"
                />
                {userCreated && (
                  <>
                    <Button
                      onClick={handlePaymentButtonClick}
                      variant="contained"
                      color="success"
                      type="submit"
                      sx={{
                        margin: "8px 0px",
                        width: "150px",
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
                        margin: "8px 20px",
                        width: "160px",
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

export default NewUser;
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { addUserFormField, Plan, initialState } from "./constant";
import { FormData } from "./constant";
import { addUserApi } from "../../Api/user";
import Popup from "../../_component/ui/popup";
import QRCodePopup from "../../_component/ui/qrCodePopup";
import { productListApi } from "../../Api/plan";

const NewUser = () => {
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
      console.log("updatedformData", updatedFormData);
      setFormData(updatedFormData);
    }
  };

  // scraping
  ("");
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [openPopup, setOpenPopup] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(
    localStorage.getItem("isButtonDisabled") === "true"
  );
  const [plans, setPlans] = useState<Plan[]>([]);

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
      const url = "/user/add";
      const response: any = await addUserApi(url, formData);
      console.log("amount", amount);
      setAmount(formData.totalAmount);
      if (response) {
        openModal();
        setPaymentButtonDisabled(false);
        setUserCreated(true);
      }
      // setFormData(response);
      console.log("formData", formData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <Container
        sx={{// Average color of the background image.
          backgroundPosition: "center",
          marginBottom: "20px",
          borderRadius: "20px", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: '30px',
          width: "50%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          "@media (min-width: 200px)": {
            maxWidth: "100%",
          },
          "@media (min-width: 200px) and (max-width: 560px)": {
            padding: "10px",
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
        width: '25ch'
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
      onClick={() => setFormData(initialState)}
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
            textTransform: "capitalize"
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
      <Popup
                  open={openPopup}
                  message="Data Added Successfully"
                  onClose={() => setOpenPopup(false)}
                  color="green"
                />
    </>
  );
};

export default NewUser;
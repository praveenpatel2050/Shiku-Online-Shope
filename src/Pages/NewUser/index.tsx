import React, { useState, } from "react";
import {
  Box,
  TextField,

  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Typography from "../../_component/ui/Typography"
import { Link } from "react-router-dom";
import { addUserFormField } from "./constant";
import { FormData } from "./constant";
const NewUser = () => {
  const initialState = {
    _id: "",
    UserName: "",
    email: "",
    password: "",
    mobileNumber: "",
    fatherName: "",
    aadharNumber: "",
    gender: "",
    dob: "",
    address: "",
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (event: any) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
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
      const url = "/schoolAdmin/addStudent";
      // const response: any = await addStudentApi(url, formData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
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
          sx={{
            "@media (min-width: 200px) and (max-width: 560px)": {
              margin: '0 auto',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '100vh',
            }
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
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: 25,
                margin: "10px 10px",
                "@media (min-width: 200px) and (max-width: 560px)": {
                  fontSize: 18,
                  alignText: 'center'
                },
              }}
            >
              Add New User
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
                      onChange={handleChange}
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
                    key={index}
                    error={error}
                    id="outlined-controlled"
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name as keyof FormData]}
                    inputProps={inputProps ?? {}}
                    InputLabelProps={InputLabelProps ?? {}}
                    onChange={handleChange}
                    sx={{
                      "@media (min-width: 200px) and (max-width: 560px)": {
                        marginBottom: '20px', width: '100%'
                      },
                    }}
                  />

                </>
              );
            })}
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '222px', margin: "8px" }}
            >
              Pay Now
            </Button>
            <Box className="footer-btn">
              <Stack direction={"row"}>

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{
                    margin: "8px 8px", width: "100px"
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="reset"
                  sx={{ margin: "8px 8px", width: "100px" }}
                  onClick={() => setFormData(initialState)}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewUser;
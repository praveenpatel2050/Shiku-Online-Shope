import  { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { login, selectAuth } from "../../store/userAuth/authSlice";
import { adminLogin } from "../../store/adminAuth/authSlice";
interface ILoginFormInput {
  mobileNumber: number;
  password: string;
}

const schema = yup.object({
  mobileNumber: yup.number().required("Enter a valid Mobile Number"),
  password: yup.string().required("Enter a valid password"),
});

const Login = () => {
  const [error, showError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_loginUser, setLoginUser] = useState<string>("");
  const [adminlogin, setAdminLogin] = useState<boolean>(false);
  // redux store
  const dispatch = useAppDispatch();
  const auth: any = useAppSelector(selectAuth);

  const getMode = () => {
    const path = window.location.href;
    const pathArray = path.split("/");
    const user = pathArray[pathArray.length - 1];
    if (user === "superuser") {
      setAdminLogin(true);
    }
    setLoginUser(user);
  };

  useEffect(() => {
    if (auth.error) {
      showError(true);
      setMessage(`${auth.error}`);
      setIsLoading(false);
    }
  }, [auth.error, message]);

  useEffect(() => {
    if (!localStorage.getItem("refreshed")) {
      localStorage.setItem("refreshed", "true");
    } else {
      localStorage.removeItem("refreshed");
    }
    getMode();
  }, []);

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema),
  });
  const url = adminlogin ? "/admin/login" : "/user/login";
  const onSubmit: SubmitHandler<ILoginFormInput> = ({
    mobileNumber,
    password,
  }) => {
    setMessage("");
    setIsLoading(true);
    if (adminlogin) {
      dispatch(adminLogin({ mobileNumber, password, url }));
    } else {
      dispatch(login({ mobileNumber, password, url }));
    }
  };

  if (auth.isLoggedIn) {
    if (localStorage.getItem("refreshed")) {
      localStorage.removeItem("refreshed");
      window.location.reload();
    }
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        padding: "0px",
      }}
    >
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => {
          showError(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => {
            showError(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          padding: "0px",
          flexDirection: "column",
          alignItems: "center",
          "@media (min-width: 200px) and (max-width: 600px)": {
            marginTop: 4,
          },
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            marginBottom: "30px",
            "@media (min-width: 200px) and (max-width: 600px)": {
              fontSize: 24,
            },
          }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ margin: '8px 20px' }}
        >
          <Controller
            name="mobileNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="number"
                label="Mobile Number"
                size="medium"
                autoFocus
                required
                fullWidth
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field }) => (
              <TextField
                id="password"
                label="Password"
                type="text"
                size="medium"
                margin="normal"
                required
                fullWidth
                // error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 5, height: "45px" }}
            disabled={isLoading}
          >
            {isLoading && <CircularProgress color="secondary" />}
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

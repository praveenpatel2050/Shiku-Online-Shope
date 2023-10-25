import type { RootState, AppDispatch } from "../index";
import { getLocalData, setLocalData } from "../../helpers/storage";

import AuthService from "../../Api/login";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Define types for authSlice

interface User {
  id: string;
  adminName: string;
  mobileNumber: number;
  level: number;
  stage: number;
  cartAmount: number;
  role: string;
  // referralCode: string;
  // Add role property
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: Error | string | null;
}

const user = getLocalData("user");
// Define the initial state
const initialState: AuthState = {
  user: user,
  error: null,
  ...(user ? { isLoggedIn: true } : { isLoggedIn: false }),
};

export const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: AuthState, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      setLocalData("user", action.payload);
    },
    loginFail: (
      state: AuthState,
      action: PayloadAction<string | undefined>,
    ) => {
      state.isLoggedIn = false;
      state.user = null;
      if (action?.payload) state.error = action.payload;
    },
    logout: (state: AuthState) => {
      state.isLoggedIn = false;
      state.user = null;
      AuthService.logout();
    },
  },
});

// actions
export const { loginSuccess, loginFail, logout } = adminAuthSlice.actions;

export const adminLogin =
  ({
    mobileNumber,
    password, 
    url
  }: {
    mobileNumber: number;
    password: string;
    url: string;
  }) =>
  async (dispatch: AppDispatch) => {

    try {
      // Make API call based on the selected role
        const response = await AuthService.login(mobileNumber, password, url);
        const token = response.token;
        const data = response.adminData;
        const data1: User = {
          id: data._id,
          adminName: data.name,
          mobileNumber: data.mobileNumber,
          level: data.level,
          stage: data.stage,
          cartAmount: data.cartAmount,
          role: data.role,
        //   referralCode: data.referralCode,
        }
        sessionStorage.setItem("token", token);
        return dispatch(loginSuccess(data1));
    } catch (err) {
      dispatch(loginFail("Mobile Number or password is incorrect. Please try again."));
    }
  };

// selector
export const selectAuth = (state: RootState) => state.auth;

// reducer
export default adminAuthSlice.reducer;

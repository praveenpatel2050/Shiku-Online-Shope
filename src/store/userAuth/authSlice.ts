import type { RootState, AppDispatch } from "../index";
import { getLocalData, setLocalData } from "../../helpers/storage";

import AuthService from "../../Api/login";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Define types for authSlice

interface User {
  id: string;
  name: string;
  mobileNumber: number;
  level: number;
  stage: number;
  planItemName: number;
  totalAmount: number;
  cartAmount: number;
  paymentStatus: string;
  role: string;
  referralCode: string;
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

export const authSlice = createSlice({
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
export const { loginSuccess, loginFail, logout } = authSlice.actions;

export const login =
  ({
    mobileNumber,
    password, 
    url
  }: {
    mobileNumber: number | null;
    password: string;
    url: string;
  }) =>
  async (dispatch: AppDispatch) => {

    try {
      // Make API call based on the selected role
        const response = await AuthService.login(mobileNumber, password, url);
        const token = response.token;
        const data = response.userData;
        const data1: User = {
          id: data._id,
          name: data.name,
          mobileNumber: data.mobileNumber,
          level: data.level,
          stage: data.stage,
          planItemName: data.pamItemName,
          totalAmount: data.totalAmount,
          cartAmount: data.cartAmount,
          paymentStatus: data.paymentStatus,
          role: data.role,
          referralCode: data.referralCode,
        }
        sessionStorage.setItem("token", token);
        return dispatch(loginSuccess(data1));
    } catch (err: any) {
      dispatch(loginFail("Mobile Number or password is incorrect. Please try again."));
    }
  };

// selector
export const selectAuth = (state: RootState) => state.auth;

// reducer
export default authSlice.reducer;

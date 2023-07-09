import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import layoutReducer from "./layout/layoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, layout: LayoutState}
export type AppDispatch = typeof store.dispatch;

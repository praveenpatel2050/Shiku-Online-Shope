import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface LayoutState {
  drawerOpen: boolean;
  selectedTab: number;
}

const initialState: LayoutState = {
  drawerOpen: true,
  selectedTab: 0,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setDrawer: (state: LayoutState, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    setSelectedTab: (state: LayoutState, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
  },
});

// action
export const { setDrawer, setSelectedTab } = layoutSlice.actions;

// selector
export const selectLayout = (state: RootState) => state.layout;

// reducer
export default layoutSlice.reducer;

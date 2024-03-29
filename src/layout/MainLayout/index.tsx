import  { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

import Header from "./Header/index";
import Sidebar from "./Sidebar";

import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { selectAuth } from "../../store/userAuth/authSlice";
import { selectLayout, setDrawer } from "../../store/layout/layoutSlice";
import type { Theme } from "../../Theme/index";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  minHeight: "calc(100vh - 65px)",
  marginTop: "65px",
  marginLeft: `-${drawerWidth}px`,
  backgroundColor: theme.palette.grey[50],
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const MainLayout = () => {
  // theme
  const matchDownMd = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  // redux
  const { drawerOpen } = useAppSelector(selectLayout);
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    dispatch(setDrawer(!drawerOpen));
  };

  useEffect(() => {
    dispatch(setDrawer(!matchDownMd));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: "flex" }}>
      <Header handleDrawerToggle={handleDrawerToggle} user={user} />
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
      <Main
        open={drawerOpen}
        sx={{
          width: "calc(100vw - 257px)",
        }}
      >
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;

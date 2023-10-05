
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../Theme/index";

const MinimalLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default MinimalLayout;

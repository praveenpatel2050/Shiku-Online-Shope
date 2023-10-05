import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import UserRoutes from "./Routes/UserRole";
import store from "./store/index";
import theme from "./Theme/index";
import { getRole } from "./_component/other/utils";
import "./App.css";
import AdminRoutes from "./Routes/AdminRole";

const App = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    const userRole = getRole();
    setRole(userRole);
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {role == "USER" ? <UserRoutes /> : <AdminRoutes />}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;

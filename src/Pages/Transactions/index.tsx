import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReffralUsers from "./referralHistory";
import CashHistory from "./cashHistory";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, backgroundColor: "#fafafa" }}>{children}</Box>
      )}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const Transactions = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        position: "relative",
        minHeight: 200,
        padding: '0px'
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab
            label="Reffered Transactions"
            sx={{
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: "0.6rem",
              },
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Cash Transactions"
            sx={{
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: "0.6rem",
              },
            }}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ReffralUsers />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <CashHistory />
      </TabPanel>
    </Box>
  );
};

export default Transactions;

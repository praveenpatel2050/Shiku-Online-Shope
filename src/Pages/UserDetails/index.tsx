import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import {
  UserFormData,
  userInitialState,
} from "../Setting/constant";
import { SingleUserApi } from "../../Api/user";
import { AppBar, Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import ReferralListByUser from "./referralUser";
import UserBankAccount from "./bankAccount";
import UserProfileUpdate from "./profile";
import TransactionUser from "./transactionsUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from '@mui/icons-material/Call';
import { styleIcon } from "../Wallet";

export interface CardProps {
  icon: JSX.Element;
  length: any;
  label: string;
  navigate: string;
}

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

const cardData: CardProps[] = [
  {
    icon: (
      <AccountCircleIcon
      sx={{ ...styleIcon, color: 'gray' }}
      />
    ),
    length: `username`,
    label: "Earnings",
    navigate: "/transactions",
  },
  {
    icon: (
      <CallIcon
      sx={{ ...styleIcon, color: 'green' }}
      />
    ),
    length: `8529626232`,
    label: "Mobile Number",
    navigate: "/referralusers",
  },
];

const UserDetails = () => {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState<UserFormData>(userInitialState);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };
  const getMode = () => {
    const path = window.location.href;
    const pathArray = path.split("/");
    if (pathArray[pathArray.length - 2] === "user") {
      const referralId = pathArray[pathArray.length - 1];
      setUserId(referralId);
    }
  };

  useEffect(() => {
    getMode();
  }, []);


  const fetchBankAccount = async () => {
    try {
      const url = `/user/userInfo?userId=${userId}`;
      const response: any = await SingleUserApi(url);
      const jsonData = await response.json();
      const userData = jsonData.userInfoData;
      const bankData = userData.bankAccountId;
      setFormData(userData);
      // }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBankAccount();
    }
  }, [userId,]);

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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          "@media (min-width: 600px)": {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          },
        }}
      >
             {cardData.map((card, index) => {
          return (
              <Box key={index} sx={{ marginTop: "10px", }}>
              <Card
                sx={{
                  background: "#F5FFFA",
                  height: "auto",
                  paddingBottom: "0px",
                          "@media (min-width: 200px) and (max-width: 600px)": {
                          padding: '0px',
                          height: "auto",
                        }, 
                }}
              >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "0px",
                      padding: "10px",
                    }}
                  >
                    {card.icon}
                    <div>
                      <Typography
                        variant="h6"
                        sx={{
                          flexGrow: 1,
                          fontSize: 29,
                          "@media (min-width: 200px) and (max-width: 560px)": {
                            fontSize: 21,
                          },
                        }}
                      >
                        {card.length}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                        // onClick={() => {
                        //   navigate(`${card.navigate}`); // Move the navigation functionality to the label
                        // }}
                      >
                        {card.label}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Box>
          );
        })}
        </Box>
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
            label="Referral Users"
            sx={{
              textTransform: 'capitalize',
              fontSize: "1.25rem",
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: "0.6rem",
              },
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Reffered Transactions"
            sx={{
              textTransform: 'capitalize',
              fontSize: "1.25rem",
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: "0.6rem",
              },
            }}
            {...a11yProps(1)}
          />
          <Tab
            label="Bank Account"
            sx={{
              textTransform: 'capitalize',
              fontSize: "1.25rem",
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: "0.6rem",
              },
            }}
            {...a11yProps(2)}
          />
          <Tab
            label="User Detail Update"
            sx={{
              textTransform: 'capitalize',
              fontSize: "1.25rem",
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: "0.6rem",
              },
            }}
            {...a11yProps(3)} 
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ReferralListByUser />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <TransactionUser />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <UserBankAccount />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <UserProfileUpdate />
      </TabPanel>
    </Box>
  );
};

export default UserDetails;
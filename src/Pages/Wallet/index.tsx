import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent } from "@mui/material";
import Typography from "../../_component/ui/Typography";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RedeemIcon from '@mui/icons-material/Redeem';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { SingleUserApi } from '../../Api/user';
import WithdrwalRequestPopup from '../../_component/ui/withdrwaRequest';

export interface CardProps {
  icon: JSX.Element;
  length: any;
  label: string;
}

export const styleIcon = {
  width: 66,
  height: 76,
  margin: "0px 10px 0px 10px",
  "@media (min-width: 200px) and (max-width: 600px)": {
    width: 50,
    height: 60,
  },
};

const Wallet = () => {
  const [cartAmount, setCartAmount] = useState(0);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankData, setBankData] = useState({});


  const openModal = () => {
    // if (Object.keys(bankData).length >= 1) {
      setIsModalOpen(true);
    // } else {
    //    console.log("else")
    // }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };
  const withdrawalText =
    Object.keys(bankData).length === 0
      ? "Please add your bank account before making a withdrawal."
      : `Withdrawal request of amount ${withdrawableAmount} placed. Amount will be credited within 18 hours.`;

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const url = `/user/userInfo`;
        const response: any = await SingleUserApi(url);
        const jsonData = await response.json();
        const userData = jsonData.userInfoData;
        setBankData(userData.bankAccountId);
        setCartAmount(userData.cartAmount)
        // Calculate withdrawable amount (100 less than cart amount, minimum 0)
        const calculatedWithdrawableAmount = Math.max(0, cartAmount - 100);
        setWithdrawableAmount(calculatedWithdrawableAmount);
        console.log(userData);
      } catch (error) {
        console.error("Error", error);
      }
    };
    UserInfo();
  }, []);

  const cardData: CardProps[] = [
    {
      icon: (
        <AccountBalanceIcon
          sx={{ ...styleIcon, color: "green" }}
        />
      ),
      length: `${cartAmount}`,
      label: "Cart Account Balance",
    },
    {
      icon: (
        <RedeemIcon
          sx={{ ...styleIcon, color: "orange" }}
        />
      ),
      length: "500",
      label: "Total Referral Earning",
    },
    {
      icon: (
        <CardMembershipIcon
          sx={{ ...styleIcon, color: '#87CEFA' }}
        />
      ),
      length: `${withdrawableAmount}`,
      label: "Withdrawable Balance",
    },
  ];

  return (
    <Box
      sx={{
        margin: "10px",
        "@media (min-width: 200px) and (max-width: 560px)": {
          margin: "10px",
        },
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
            <React.Fragment key={index}>
              <Box key={index} sx={{ marginBottom: "10px" }}>
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
                      <Typography variant="h5">
                        {card.label} {card.label === "Withdrawable Balance" && cartAmount > 100 && (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              margin: '0px 10px 5px 10px',
                              "@media (min-width: 200px) and (max-width: 560px)": {
                                padding: "2px 12px",
                                margin: '0px 0px 5px 0px',
                                fontSize: "0.775rem",
                              },
                            }}
                            onClick={openModal}
                          >
                            Request Withdrawal
                          </Button>
                        )}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
      {isModalOpen && <WithdrwalRequestPopup withdrawalText={withdrawalText} closeModal={closeModal} />}
    </Box>
  );
}

export default Wallet;
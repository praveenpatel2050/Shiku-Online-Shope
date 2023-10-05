import React from 'react'
import { Box, Button, Card, CardContent, } from "@mui/material"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Typography from "../../_component/ui/Typography"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RedeemIcon from '@mui/icons-material/Redeem';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
export interface CardProps {
  icon: JSX.Element;
  length: any;
  label: string;
}
export const styleIcon =
{
  width: 66,
  height: 76,
  margin: "0px 10px 0px 10px",  
 "@media (min-width: 200px) and (max-width: 600px)": {
  width: 50,
  height: 60,                    
  }, 
};

const Wallet = () => {



  const cardData: CardProps[] = [
    {
      icon: (
        <AccountBalanceIcon
        sx={{ ...styleIcon, color: "green" }}
        />
      ),
      length: "1500",
      label: "Cart Account Balance",
    },
    {
      icon: (
        <CurrencyRupeeIcon
        sx={{ ...styleIcon, color: 'gold' }}
        />
      ),
      length: "1500",
      label: "Total Amount Balance",
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
      length: `1400`,
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
                    <Typography variant="h5" >
                      {card.label} {card.label === "Withdrawable Balance" && (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ margin: '0px 10px 5px 10px',
                          "@media (min-width: 200px) and (max-width: 560px)": {
                            padding: "2px 12px",
                            margin: '0px 0px 5px 0px',
                            fontSize: "0.775rem",
                          }, }}
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
  </Box>
  )
}

export default Wallet

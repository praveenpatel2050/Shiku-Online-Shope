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
const Wallet = () => {
  const cardData: CardProps[] = [
    {
      icon: (
        <AccountBalanceIcon
          sx={{
            width: 66,
            height: 76,
            margin: "0px 10px 0px 10px",
            color: 'green'
          }}
        />
      ),
      length: "1500",
      label: "Current Account Balance",
    },
    {
      icon: (
        <CurrencyRupeeIcon
          sx={{
            width: 66,
            height: 76,
            margin: "0px 10px 0px 10px",
            color: 'gold'
          }}
        />
      ),
      length: "1500",
      label: "Total Withdraw Amount",
    },
    {
      icon: (
        <RedeemIcon
          sx={{
            width: 66,
            height: 76,
            margin: "0px 10px 0px 10px",
            color: 'orange'
          }}
        />
      ),
      length: "500",
      label: "Total Referral Earning",
    },
    {
      icon: (
        <CardMembershipIcon
          sx={{
            width: 66,
            height: 76,
            margin: "0px 20px 0px 10px",
            color: '#87CEFA',
          }}
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
                  height: "6.5rem",
                  paddingBottom: "0px",
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
                          sx={{ margin: '0px 10px 0px 10px' }}
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

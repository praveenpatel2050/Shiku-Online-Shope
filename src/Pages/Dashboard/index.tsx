import React from 'react'
import { Box, Button, Card, CardContent, } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Typography from "../../_component/ui/Typography"
import { Link } from 'react-router-dom';
export interface CardProps {
  icon: JSX.Element;
  length: any;
  label: string;
}
const Dashboard = () => {
  const cardData: CardProps[] = [
    {
      icon: (
        <CurrencyRupeeIcon
          sx={{
            width: 66,
            height: 76,
            margin: "0px 10px 0px 10px",
          }}
        />
      ),
      length: "1500",
      label: "Earnings",
    },
    {
      icon: (
        <AccountCircleIcon
          sx={{
            width: 76,
            height: 76,
            color: 'gray',
            margin: "0px 20px 0px 10px",
          }}
        />
      ),
      length: `15`,
      label: "Total Referral User",
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
                    background: "#fff",
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
                        {card.label}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
      <Link to="/newuser" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          size="large"
          component="a"
          sx={{ minWidth: 200 }}
        >
          Add New User
        </Button>
      </Link>
    </Box>
  )
}

export default Dashboard

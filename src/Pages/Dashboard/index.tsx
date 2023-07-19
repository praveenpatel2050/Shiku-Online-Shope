import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Container } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Typography from "../../_component/ui/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getReferralBy } from "../../_component/other/referralBy";
import { getTotalAmount } from "../../_component/other/cards";
export interface CardProps {
  icon: JSX.Element;
  length: any;
  label: string;
  navigate: string;
}

const totalAmount = getTotalAmount();

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
      length: `${totalAmount}`,
      label: "Earnings",
      navigate: '/transactions'
    },
    {
      icon: (
        <AccountCircleIcon
          sx={{
            width: 76,
            height: 76,
            color: "gray",
            margin: "0px 20px 0px 10px",
          }}
        />
      ),
      length: `15`,
      label: "Total Referral User",
      navigate: '/referralusers'
    },
  ];
  const [referraBy, setReferralBy] = useState<string>("");

  const navigate = useNavigate();
  
  // const getMode = () => {
  //     const path = window.location.href;
  //     const pathArray = path.split("/");
  //     if (pathArray[pathArray.length - 2] === "referral") {
  //       const editId = pathArray[pathArray.length - 1];
  //       setReferralEditId(editId);
  //     }
  //   };
  
    useEffect(() => {
      const getCurrentRole = async () => {
          const currentRole = await getReferralBy();
          setReferralBy(currentRole);
        };
        getCurrentRole();
    }, []);
  return (
    <Box
      sx={{
        margin: "10px",
        "@media (min-width: 200px) and (max-width: 560px)": {
          margin: "10px",
        },
      }}
    >
      <Container
        sx={{
          // backgroundImage: `url(${BackgroundImage})`,
          backgroundColor: "#F5FFFA", // Average color of the background image.
          backgroundPosition: "center",
          marginBottom: "20px",
          borderRadius: "5px", // Add a border radius to the container
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 3px",
          "@media (min-width: 200px)": {
            maxWidth: "100%",
          }, // Ensure the container takes the full height of the viewport
        }}
      >
        {/* <img
        style={{ display: "none" }}
        src={BackgroundImage}
        alt="increase priority"
      /> */}
        <Typography
          color="secondary"
          align="center"
          variant="h2"
          marked="center"
          sx={{
            margin: "40px 0px 20px 0px",
            "@media (min-width: 200px) and (max-width: 600px)": {
              fontSize: 16,
              margin: "20px 0px 10px 0px",
            },
          }}
        >
          Shiku Online Shopee
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{
            mb: 4,
            mt: { xs: 4, sm: 4 },
            "@media (min-width: 200px) and (max-width: 600px)": {
              fontSize: 12,
            },
          }}
        >
          Welcome To Shiku Online Shopee. Here You Can Add Users Through Your
          Network and let Them Work For You
        </Typography>
        {/* <Link to="/newuser" style={{ textDecoration: "none" }}> */}
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => navigate(`/adduser/${referraBy}`)}
            sx={{
              minWidth: 200,
              fontSize: 20,
              "@media (min-width: 200px) and (max-width: 600px)": {
                minWidth: 100,
              },
            }}
          >
            Add User
          </Button>
        {/* </Link> */}
        <Typography variant="h5" color="inherit" sx={{ mt: 4, mb: 4 }}>
          Discover the experience
        </Typography>
      </Container>
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
                      <Typography
                        variant="h5"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                        onClick={() => {
                          navigate(`${card.navigate}`); // Move the navigation functionality to the label
                        }}
                      >
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
    </Box>
  );
};

export default Dashboard;

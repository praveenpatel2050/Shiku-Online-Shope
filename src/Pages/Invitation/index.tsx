import React, { useEffect, useState } from "react";
import { Container, Button, Box } from "@mui/material";
import QRCode from "react-qr-code";
import Typography from "../../_component/ui/Typography";
import { getReferralBy } from "../../_component/other/referralBy";
import Popup from "../../_component/ui/popup";

const Invitation = () => {
  const [referraBy, setReferralBy] = useState<string>("");
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setReferralBy(getReferralBy());
  }, []);
  const value = `https://localhost:5173/register/${referraBy}`;

  return (
    <div>
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
            color="primary"
            align="center"
            variant="h4"
            marked="center"
            sx={{
              margin: "40px 0px 20px 0px",
              fontSize: 26,
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: 16,
                margin: "20px 0px 10px 0px",
              },
            }}
          >
            Invitation
          </Typography>
          <QRCode
            size={256}
            style={{ height: "200px", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{
              mb: 2,
              mt: { xs: 4, sm: 4 },
              border: "1px solid blue",
              backgroundColor: "skyblue",
              padding: "20px",
              "@media (min-width: 200px) and (max-width: 600px)": {
                fontSize: 12,
              },
            }}
          >
            {value}
          </Typography>
          {/* <Link to="/newuser" style={{ textDecoration: "none" }}> */}
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {
              navigator.clipboard.writeText(value);
              setOpenPopup(true); // Show success popup
              setTimeout(() => {
                setOpenPopup(false);
              }, 1000);
            }}
            sx={{
              minWidth: 100,
              fontSize: 14,
              "@media (min-width: 200px) and (max-width: 600px)": {
                minWidth: 100,
              },
            }}
          >
            Copy Invite Link
          </Button>
          <Popup
            open={openPopup}
            message="Link copied successfully"
            onClose={() => setOpenPopup(false)}
            color="green"
          />
          <Typography variant="h5" color="inherit" sx={{ mt: 4, mb: 1 }}>
            【Invite tips】:
          </Typography>
          <Typography variant="h5" sx={{ color: "green" }}>
            When you invite a friend to join, he belongs to your team 2-level
            member, and you can get his 10% commission income.
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, color: "orange" }}>
            When a B-level member of your team invites his friend to join, his
            friend will become a 3-level member of your team, and you can get
            his 5% commission income. And so on Commission will be credited to
            your account till 10-level.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Invitation;

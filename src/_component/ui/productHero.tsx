
import { Button } from "@mui/material";
import ProductHeroLayout from "./ProductHeroLayout";
import Typography from "./Typography";
import backgroundImage from "../../assets/homepage-bg.jpg";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function ProductHero() {
  const navigate = useNavigate();

  const openWhatsAppChat = () => {
    const phoneNumber = 9879889396;
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{
          "@media (min-width: 200px) and (max-width: 600px)": {
            fontSize: 16,
          },
        }}
      >
        Shiku Online Shopee
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 }, "@media (min-width: 200px) and (max-width: 600px)": {
          fontSize: 12,
        }, }}
      >
        Welcome To Shiku Online Shopee Here You Can Buy And Sell Product and
        Earn Lot of money
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        onClick={() => navigate(`/register/YXSWBR`)}
        sx={{ minWidth: 200, "@media (min-width: 200px) and (max-width: 600px)": {
          minWidth: 100,
        }, }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
      <Button
      variant="outlined"
      color="primary"
      onClick={openWhatsAppChat}
      style={{
        position: 'fixed',
        right: '25px',
        bottom: '45px',
        zIndex: 99,
        border: "none"
      }}
      id="whatsapp-button"
    >
      <WhatsAppIcon sx={{ backgroundColor: 'green', color: 'black', fontSize: '55px', borderRadius: '10px' }} />
    </Button>
    </ProductHeroLayout>
  );
}

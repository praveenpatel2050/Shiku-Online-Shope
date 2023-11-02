import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import AppAppBar from "./AppBar";
import Footer from "./footer";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const AboutUsPage: React.FC = () => {
    const openWhatsAppChat = () => {
        const phoneNumber = 9879889396;
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
      };
  return (
    <>
      <AppAppBar />
      <Container maxWidth="md" sx={{ margin: "10px auto" }}>
        <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
        About Shiku Online Shopee
      </Typography>
          <Typography paragraph style={{textTransform: 'none'}}>
            At Shiku Online Shopee, we are dedicated to making your online
            shopping experience seamless and satisfying. Founded by Sittal Bhai
            Darji, we take pride in offering a diverse range of quality products
            that cater to your every need. Based in the heart of Gujarat, our
            dedicated team works tirelessly to ensure that your orders reach
            your doorstep within 3 to 7 days, all while upholding a hassle-free
            refund policy in case you receive a defective or non-functional
            product. Customer satisfaction is our top priority, and we are
            always just a phone call or email away at +919879889396 and
            sittalbhati37@gmail.com or shikuonlineshopee@gmail.com. Join us on
            this exciting shopping journey, and let Shiku Online Shopee, under
            the leadership of Sittal Bhai Darji, be your trusted online shopping
            destination.
          </Typography>

          <Typography paragraph>
            Thank you for choosing <b>Shiku Online Shopee.</b>
          </Typography>
        </Paper>
      </Container>
      <Container maxWidth="md" sx={{ margin: '10px auto'}}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Return, Refund, and Shipping Policy
        </Typography>
        <Typography paragraph>
          At Shiku Online Shopee, our utmost priority is to provide you with a seamless and satisfying shopping experience. To ensure transparency and clarity in our transactions, we have established the following return, refund, and shipping policies:
        </Typography>

        <Typography variant="h5" gutterBottom>
          Return Policy
        </Typography>
        <Typography paragraph>
          We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with your product, you can initiate a return within 3 to 7 days of receiving your order. Please ensure that the item is in its original condition, with all tags and packaging intact, for us to process the return.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Refund Policy
        </Typography>
        <Typography paragraph>
          Upon receiving your returned item, our team will inspect it to ensure it meets the return criteria. Once approved, we will initiate a refund to your original payment method. Please allow 3 Days business days for the refund to reflect in your account.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Shipping Policy
        </Typography>
        <Typography paragraph>
          We take pride in our swift and efficient shipping process. and we strive to dispatch your order within 3 to 7 business days. The estimated delivery time may vary based on your location and chosen shipping method.
        </Typography>

        <Typography paragraph>
          For any questions or concerns related to our return, refund, or shipping policies, please feel free to reach out to our customer support team at <a href="mailto:sittalbhati37@gmail.com" >sittalbhati37@gmail.com</a>. We are here to assist you and ensure your satisfaction.
        </Typography>

        <Typography paragraph>
          Your satisfaction is our priority, and we are committed to making your shopping experience with us a pleasant one.
        </Typography>

        <Typography paragraph>
          Thank you for choosing <b>Shiku Online Shopee.</b>
        </Typography>
      </Paper>
    </Container>
      <Footer />
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
    </>
  );
};

export default AboutUsPage;

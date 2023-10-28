import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import AppAppBar from './AppBar';

const PolicyPage: React.FC = () => {
  return (
    <>
      <AppAppBar />
    <Container maxWidth="md" sx={{ marginTop: '10px'}}>
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
    </>
  );
};

export default PolicyPage;

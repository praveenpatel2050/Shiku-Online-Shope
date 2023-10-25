/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Button } from '@mui/material';
import Typography from './Typography';
import { productListApi } from '../../Api/plan';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
  margin: '20px',
  "@media (min-width: 200px) and (max-width: 560px)": {
    margin: '0px 0px 10px 0px',
  },
};

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageSrc: string;
  }

function PlansNew() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const url = "/product/list";
          const response: any = await productListApi(url);
          const data = await response.json();
          console.log("data", data.productData);
          if (data) {
            const productData = data.productData.map((apiProduct: any) => ({
              id: apiProduct._id,
              name: apiProduct.productName,
              description: apiProduct.description, // Add description property if available
              price: apiProduct.price,
              imageSrc: apiProduct.imageUrl,
            }));
            setProducts(productData);
            console.log("products", products);
          } else {
            null;
          }
        } catch (error) {
          console.error("Error", error);
        }
      };
      fetchUsers();
    }, [products]);

  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 4,
          mb: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" sx={{ mb: 4, fontSize: 23, "@media (min-width: 200px) and (max-width: 560px)": { fontSize: 18 } }}>
          Our Plans
        </Typography>
        <div>
          <Grid container spacing={5}>
            {products.map((plan: any, index: any) => (
              <Grid key={plan._id} item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>{index + 1}.</Box>
                  <img
                    src={plan.imageUrl}
                    alt={plan.productName}
                    style={{ width: '200px', height: '211px', borderRadius: '10px' }}
                  />
                  <Typography variant="h6" sx={{ marginTop: '20px' }}>
                    {plan.productName}
                  </Typography>
                  <Typography variant="h5">
                    {plan.price && (
                      <ul>
                        <li>
                          <Typography color="inherit" variant="h5" marked="center">
                            ₹ {plan.price} Rupees Plan
                          </Typography>
                        </li>
                        <li>
                          <Typography color="inherit" variant="h5" marked="center">
                            {plan.productName}
                          </Typography>
                        </li>
                      </ul>
                    )}
                  </Typography>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    component="a"
                    sx={{ minWidth: 120 }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default PlansNew;
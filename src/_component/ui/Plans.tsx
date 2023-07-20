
import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container, Button} from '@mui/material';
import Typography from './Typography';
import Plan1Img from "../../assets/plan1.png"
import Plan2Img from "../../assets/plan2.png"
import Plan3Img from "../../assets/plan3.png"

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
  margin: '20px'
};

function Plans() {
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
        <Typography variant="h4" marked="center"  component="h2" sx={{ mb: 4 }}>
          Our Plans
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number} >1.</Box>
                <Box
                component="img"
                src={Plan1Img}
                alt="suitcase"
                sx={{ width: '200px', height: '211px', borderRadius: '10px' }}
              />
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Starter Plan
              </Typography>
              <Typography variant="h5">
                <ul>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">₹ 100 Rupees Plan</Typography>
                </li>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">Watch </Typography>
                </li>
                </ul>
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
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                component="img"
                src={Plan2Img}
                alt="graph"
                sx={{ width: '200px', borderRadius: '10px'  }}
              />
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Second Plan
              </Typography>
              <Typography variant="h5">
                <ul>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">₹ 100 Rupees Plan</Typography>
                </li>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">Belt </Typography>
                </li>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">Leather Formal Black/Brown Belt For Men (Color-Black/Brown) belt for men, formal belt, gift for gents, Gents belt, mens belt. </Typography>
                </li>
                </ul>
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
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                component="img"
                src={Plan3Img}
                alt="clock"
                sx={{  width: '200px', height: '211px', borderRadius: '10px'}}
              />
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Third Plan
              </Typography>
              <Typography variant="h5">
                <ul>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">₹ 1000 Rupees Plan</Typography>
                </li>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">Smart Watch </Typography>
                </li>
                  <li>
                <Typography color="inherit" variant="h5" marked="center">Bluetooth Calling Smartwatch - 1.69 LCD Display, Multiple Watch Faces, Sleep Monitor, Heart & SpO2 Monitoring, Multiple Sports Modes, Water Resistant </Typography>
                </li>
                </ul>
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
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default Plans;
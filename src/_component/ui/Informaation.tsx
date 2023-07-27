import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from './Typography';
import YouTube from 'react-youtube';
function InformationVideo() {
    const opts = {
        width: '100%', // Set the width to 100% for responsiveness
        playerVars: {
          autoplay: 0,
        },
    }
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9}}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, "@media (min-width: 200px) and (max-width: 560px)": {
                            fontSize: 18,
                          },   }}>
          Got any questions? Want To UNderstand?
        </Typography>
      </Button>
      
      <Box
        sx={{
          position: 'relative',// Set the aspect ratio (16:9 = 56.25%)
          width: '100%',
          my: 5 
        }}
      >
        <YouTube videoId="TORfAEp8AUs" opts={opts} />
      </Box>
    </Container>
  );
}

export default InformationVideo;
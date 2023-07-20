import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
    '@media (min-width: 200px) and (max-width: 600px)': {
        fontSize: 14,  
    },
};

function AppAppBar() {
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

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        sx={{ fontSize: 24, '@media (min-width: 200px) and (max-width: 600px)': {
                            fontSize: 16,
                            
                        }, }}
                    >
                        Shiku Online Shopee
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            color="inherit"
                            sx={rightLink}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            sx={rightLink}
                            onClick={() => navigate(`/register/SHIKU1`)}
                        >
                            Register    
                        </Button>
                        {/* <Dialog open={loginOpen} onClose={handleLoginClose}>
                            <DialogContent>
                                <Login />
                            </DialogContent>
                        </Dialog>
                        <Dialog open={registerOpen} onClose={handleRegisterClose}>
                            <DialogContent>
                                <Register />
                            </DialogContent>
                        </Dialog> */}
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;
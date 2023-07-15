import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { AppBar, Toolbar, Dialog, DialogContent, Button } from "@mui/material"
import Login from '../../Pages/Login';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
    '@media (min-width: 200px) and (max-width: 600px)': {
        fontSize: 14,  
    },
};

function AppAppBar() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                            onClick={handleOpen}
                        >
                            Login
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogContent>
                                <Login />
                            </DialogContent>
                        </Dialog>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;
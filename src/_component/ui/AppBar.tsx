import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/shikuonlinelogo.png'; // Import your logo image or SVG

const rightLink = {
    fontSize: 18,
    color: 'common.white',
    ml: 4,
    padding: '0px',
    textDecoration: "underline",
    
    '@media (min-width: 200px) and (max-width: 600px)': {
        fontSize: 14,  
        ml: 1,
    },
};

function AppAppBar() {
    const navigate = useNavigate();

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between', paddingLeft: '0px' }}>
                    {/* Your logo */}
                    <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                    
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        sx={{
                            fontSize: 24,
                            '@media (min-width: 200px) and (max-width: 600px)': {
                                fontSize: 14,
                            },
                        }}
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
                            onClick={() => navigate(`/register/YXSWBR`)}
                        >
                            Register
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;


import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from './Typography';
const Footer = () => {

    return (

        <footer style={{
            width: '100%',
            backgroundColor: '#fff5f8'
        }}>
            <Box sx={{
                display: 'flex', '@media (min-width: 200px) and (max-width: 600px)': {
                    display: 'block',
                    margin: '20px'
                },
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2%',
                    paddingTop: '1%',
                    width: '33%', '@media (min-width: 200px) and (max-width: 600px)': {
                        width: '100%',
                        
                    },
                }}>
                    <Typography style={{ marginBottom: '20px' }} variant="h6" marked="left" gutterBottom>
                        Address
                    </Typography>

                    <Link to="#" style={{
                        textDecoration: 'none',
                        lineHeight: '180%',
                        textTransform: 'uppercase'
                    }}>
                        < LocationOnIcon sx={{ marginRight: '10px' }} />
                        PROPERTY NO-1/191, PAKU MAKAN, KUDA, AT,POST- KUDA ,TA-LAKHANI, Kuda, District-Banaskantha, Gujarat, 385535
                    </Link>
                    <Link
                        to="tel:+918141205111"
                        style={{
                            textDecoration: 'none',
                            lineHeight: '180%',
                            margin: '10px 0px'
                        }}
                    >
                        <LocalPhoneIcon sx={{ marginRight: '10px', marginBottom: '-10px' }} />
                        +919879889396
                    </Link>
                    <Link to="#" style={{
                        textDecoration: 'none',
                        lineHeight: '180%',
                    }}>
                        <EmailIcon sx={{ marginRight: '10px', marginBottom: '-10px' }} />
                        shikuonlineshopee@gmail.com
                    </Link>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2%',
                    paddingTop: '1%',
                    width: '33%', '@media (min-width: 200px) and (max-width: 920px)': {
                        width: '100%'
                    },
                }}>
                    <Typography style={{ marginBottom: '20px' }} variant="h6" marked="left" gutterBottom>
                        Social Media
                    </Typography>

                    <Link
                        to="https://www.facebook.com/praveen.purohitjoshisarvana"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            lineHeight: '180%',
                            margin: '10px 0px',
                        }}
                    >
                        <FacebookIcon sx={{ marginRight: '10px', marginBottom: '-10px' }} />
                        Facebook
                    </Link>
                    <Link
                        to="https://www.instagram.com/pravveennn_"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            lineHeight: '180%',
                            margin: '10px 0px',
                        }}
                    >
                        <InstagramIcon sx={{ marginRight: '10px', marginBottom: '-10px' }} />
                        Instagram
                    </Link>
                    <Link
                        to="https://www.twitter.com/prav33n_purohit"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            lineHeight: '180%',
                            margin: '10px 0px',
                        }}
                    >
                        <TwitterIcon sx={{ marginRight: '10px', marginBottom: '-10px' }} />
                        Twitter
                    </Link>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2%',
                    paddingTop: '1%',
                    width: '33%', '@media (min-width: 200px) and (max-width: 920px)': {
                        width: '100%'
                    },
                }}>
                    <Typography style={{ marginBottom: '20px' }} variant="h6" marked="left" gutterBottom>
                        Important Links
                    </Typography>

                    <Link to="#" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2%',
                        paddingTop: '1%',
                    }}>
                        Become a Partner
                    </Link>
                    <Link to="#" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2%',
                        paddingTop: '1%',
                    }}>
                        Check Status
                    </Link>
                </Box>
            </Box>
            <Typography style={{
                textAlign: 'center',
                padding: '1%',
            }}>Shiku Online Shopee</Typography>
        </footer>
    );
}

export default Footer;
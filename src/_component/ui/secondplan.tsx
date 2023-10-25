// import React, { useState } from 'react';
// import {
//   Grid,
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   IconButton,
//   Slider,
//   Paper,
//   CardMedia,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from './Typography';
// const YourComponent = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImage, setCurrentImage] = useState(0);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const images = [
//     'path_to_image1.jpg',
//     'path_to_image2.jpg',
//     // Add more image paths as needed
//   ];

//   const handleImageChange = (event: any, newValue: any) => {
//     setCurrentImage(newValue);
//   };

//   return (
//     <Grid item xs={12} md={4}>
//       <Box sx={item}>
//         <Box sx={number}>3.</Box>
//         <Box
//           component="img"
//           src={Plan3Img}
//           alt="clock"
//           sx={{ width: '200px', height: '211px', borderRadius: '10px', cursor: 'pointer' }}
//           onClick={openModal}
//         />
//         <Typography variant="h6" sx={{ marginTop: '20px' }}>
//           Third Plan
//         </Typography>
//         <Typography variant="h5">
//           <ul>
//             <li>
//               <Typography color="inherit" variant="h5" marked="center">
//                 ₹ 1000 Rupees Plan
//               </Typography>
//             </li>
//             <li>
//               <Typography color="inherit" variant="h5" marked="center">
//                 Smart Watch
//               </Typography>
//             </li>
//             <li>
//               <Typography color="inherit" variant="h5" marked="center">
//                 Bluetooth Calling Smartwatch - 1.69 LCD Display, Multiple Watch Faces, Sleep Monitor, Heart & SpO2 Monitoring, Multiple Sports Modes, Water Resistant
//               </Typography>
//             </li>
//           </ul>
//         </Typography>
//         <Button color="secondary" variant="contained" size="large" component="a" sx={{ minWidth: 120 }}>
//           Apply Now
//         </Button>
//       </Box>

//       <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="md">
//         <DialogTitle>
//           Photo Gallery
//           <IconButton sx={{ position: 'absolute', right: 5, top: 5 }} onClick={closeModal}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Paper sx={{ display: 'flex', justifyContent: 'center' }}>
//             <CardMedia
//               component="img"
//               src={images[currentImage]}
//               sx={{ maxWidth: '80%' }}
//             />
//           </Paper>
//           <Slider
//             value={currentImage}
//             onChange={handleImageChange}
//             max={images.length - 1}
//           />
//           <DialogContentText sx={{ textAlign: 'center' }}>
//             Image {currentImage + 1} of {images.length}
//           </DialogContentText>
//         </DialogContent>
//       </Dialog>
//     </Grid>
//   );
// };

// export default YourComponent;

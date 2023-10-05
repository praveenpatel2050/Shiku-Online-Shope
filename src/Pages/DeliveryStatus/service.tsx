// import  { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Button,
//   Card,
//   InputLabel,
//   Pagination,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Chip,
//   Alert,
//   Snackbar,
//   MenuItem,
//   Box,
//   OutlinedInput,
//   FormControl,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Grid,
//   InputAdornment,
//   Popover
// } from "@mui/material";
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';

// import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
// import {
//   fetchServiceList,
//   serviceListData,
// } from "../../store/service/serviceSlice";
// import api from "src/service/api";
// import Loader from "src/component/Loader";
// import moment from "moment";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Search from "src/component/Search";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 200,
//     },
//   },
// };

// const accessoriesItem = ["Beg", "Charger", "Bettery", "Cable", "Others"];
// interface IColumn {
//   id:
//     | "srNo"
//     | "name"
//     | "mobileNo"
//     | "product"
//     | "company"
//     | "problem"
//     | "date"
//     | "estimate_price"
//     | "description"
//     | "productStatus"
//     | "deliveryStatus"
//     | "action";
//   label: string;
//   minWidth?: number;
//   align?: "left";
//   format?: (value: number) => string;
// }

// const columns: IColumn[] = [
//   {
//     id: "srNo",
//     label: "SR.No",
//     minWidth: 100,
//   },
//   {
//     id: "name",
//     label: "Cust_Name",
//     minWidth: 150,
//   },
//   {
//     id: "mobileNo",
//     label: "Mobile No",
//     minWidth: 100,
//   },
//   {
//     id: "date",
//     label: "Date",
//     minWidth: 100,
//   },
//   {
//     id: "product",
//     label: "Product Type",
//     minWidth: 100,
//   },
//   {
//     id: "problem",
//     label: "Problem",
//     minWidth: 100,
//   },
//   {
//     id: "estimate_price",
//     label: "Estimate Price",
//     minWidth: 100,
//   },
//   {
//     id: "productStatus",
//     label: "Product Status",
//     minWidth: 100,
//   },
//   {
//     id: "deliveryStatus",
//     label: "Delivery Status",
//     minWidth: 100,
//   },
//   {
//     id: "action",
//     label: "Action",
//     minWidth: 100,
//   },
// ];
// interface IState {
//   id: string | undefined;
//   custm_id: string | undefined;
//   mobileNo: string;
//   name: string;
//   address: string;
//   product: string;
//   company: string;
//   problem: string;
//   estimate_price: string;
//   accessories: string[] | string;
//   date: string;
//   productStatus: string;
//   deliveryStatus: string;
//   description: string;
// }

// const initialState = {
//   id: undefined,
//   custm_id: undefined,
//   mobileNo: "",
//   name: "",
//   address: "",
//   product: "",
//   company: "",
//   problem: "",
//   estimate_price: "",
//   accessories: [],
//   description: "",
//   productStatus: "pending",
//   deliveryStatus: "pending",
//   date: "",
// };
// const productStatus = [
//   {
//     value: "Pending",
//     label: "Pending",
//   },
//   {
//     value: "Completed",
//     label: "Completed",
//   },
//   {
//     value: "Not Repaired",
//     label: "Not Repaired",
//   },
//   {
//     value: "Customer Declined",
//     label: "Customer Declined",
//   },
// ];
// const deliveryStatus = [
//   {
//     value: "Pending",
//     label: "Pending",
//   },
//   {
//     value: "Delivered",
//     label: "Delivered",
//   },
// ];
// interface IPayLoad {
//   pageNo: number;
//   limits: number;
// }
// const Customers: React.FC = () => {
//   const [values, setValues] = useState<IState>(initialState);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState<string>("");
//   const [filterPopOver, setFilterPopOver] = useState<boolean>(false);
//   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
//   const [errors, setErrors] = useState<any>({
//     mobileNo: false,
//     name: false,
//     address: false,
//     product: false,
//     company: false,
//     problem: false,
//     estimate_price: false,
//   });

//   const handleSelect = (event: SelectChangeEvent<string[]>) => {
//     const {
//       target: { value },
//     } = event;
//     const clone = { ...values };
//     clone.accessories = typeof value === "string" ? value.split(",") : value;
//     setValues(clone);
//   };

//   // redux store
//   const dispatch = useAppDispatch();
//   const { status, serviceList } = useAppSelector(serviceListData);
//   const [datasource, setDatasource] = useState([]);

//   //Modal state.....
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   const [isEditMode, setIsEditMode] = useState<boolean>(false);
//   const [customer, setCustomer] = useState<any>("");
//   const [datagrid, showDataGrid] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

 

//   //Local State
//   const defaultPayload = {
//     pageNo: 1,
//     limits: 25,
//   };
//   const [payload, setPayload] = useState<IPayLoad>(defaultPayload);

//   //functions

//   const handleModalState = () => {
//     setIsOpenModal(!isOpenModal);
//   };

//   const editAction = (id: any) => {
//     const updateData: any = datasource.filter((d: any) => d.id === id)[0];
//     setIsEditMode(true);
//     handleModalState();
//     setValues(updateData);
//   };

//   //update api called
//   const handleUpdate = () => {
//     const id = values.id;
//     const payload: Partial<IState> = {
//       product: values.product,
//       company: values.company,
//       problem: values.problem,
//       estimate_price: values.estimate_price,
//       description: values.description,
//       accessories: values.accessories.toString(),
//       productStatus: values.productStatus,
//       deliveryStatus: values.deliveryStatus,
//     };
//     if (values?.accessories?.length === 0) {
//       delete payload?.accessories;
//     }
//     if (values?.description?.length === 0) {
//       delete payload?.description;
//     }
//     api
//       .put(`/service/update/?service_id=${id}`, payload)
//       .then(function (response: any) {
//         if (response.data?.message) {
//           setMessage(response.data.message);
//           setSuccess(true);
//           handleModalState();
//           setValues(initialState);
//           setIsEditMode(!isEditMode);
//           getServiceList();
//         }
//       });
//   };

//   const pageCalculate = (totalRecord: number) => {
//     if (totalRecord > 0) {
//       return totalRecord % 25 === 0
//         ? totalRecord / 25
//         : Math.floor(totalRecord / 25) + 1;
//     }
//     return 1;
//   };

//   //api function
//   const getServiceList = () => {
//     dispatch(fetchServiceList(payload));
//   };

//   const handleFilterPopOver = (event: React.MouseEvent<HTMLButtonElement>)=> {
//     if(!filterPopOver) {
//       setAnchorEl(event.currentTarget);
//     }
//       setFilterPopOver(!filterPopOver);
//   }



//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValues((values) => ({
//       ...values,
//       [event.target.name]: event.target.value,
//     }));
//     if (event.target.value.trim() && event.target.value !== "") {
//       const err = { ...errors };
//       err[event.target.name] = false;
//       setErrors(err);
//     } else {
//       const err = { ...errors };
//       err[event.target.name] = true;
//       setErrors(err);
//     }
//   };

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     if (values !== initialState) {
//       const payload: Partial<IState> = {
//         name: values.name,
//         custm_id: values.custm_id,
//         mobileNo: values.mobileNo,
//         address: values.address,
//         product: values.product,
//         company: values.company,
//         problem: values.problem,
//         description: values.description,
//         accessories: values.accessories.toString(),
//         estimate_price: values.estimate_price,
//         productStatus: values.productStatus,
//         deliveryStatus: values.deliveryStatus,
//       };
//       if (values?.accessories?.length === 0) {
//         delete payload?.accessories;
//       }
//       if (values?.description?.length === 0) {
//         delete payload?.description;
//       }
//       api.post("/service/add", payload).then(function (response: any) {
//         if (response?.data?.message) {
//           setMessage(response.data.message);
//           setSuccess(true);
//           handleModalState();
//           getServiceList();
//         }
//       });
//     } else {
//       alert("please fill all field");
//     }
//     setValues(initialState);
//   };

//   const setTableData = (data :any) => {
//     const obj = data.map((d: any) => {
//       return {
//         id: d._id,
//         srNo : d.srNo,
//         name: d?.custm_id[0]?.name,
//         mobileNo: d?.custm_id[0]?.mobileNo,
//         address: d?.custm_id[0]?.address,
//         product: d.product,
//         company: d?.company,
//         date: moment(d?.date).format("MMM Do YYYY, h:mm a"),
//         problem: d.problem,
//         estimate_price: d?.estimate_price,
//         productStatus: d?.productStatus,
//         accessories:
//           d?.accessories?.length > 0 ? d.accessories.split(",") : [],
//         description: d?.description,
//         deliveryStatus: d?.deliveryStatus,
//       };
//     });
//     setDatasource(obj);

//   }
//   const callSearchAPi = (params: any) => {
//     if (params && params.trim().length === 10) {
//       api(`/customer/list?mobileNo=${params}`).then((responce) => {
//         if (
//           responce.data?.result?.result &&
//           responce.data?.result?.result?.length > 0
//         ) {
//           setCustomer(responce.data.result.result[0]);
//           showDataGrid(true);
//         }
//       });
//     }
//   };

//   const serviceSearch = (params: any) => {
//     if(!params) {
//       getServiceList();
//     }
//     if (params && params.trim().length > 2) {
//       setIsLoading(true);
//       api(`/service/list?searchTerm=${params}`).then((response) => {
//         if (
//           response.data?.result?.result &&
//           response.data.result.result.length > 0
//         ) {
//           setTableData(response.data.result.result);
//           setIsLoading(false);
//         }
//         if(!response.data.success) {
//           setIsLoading(false);
//           setDatasource([]);
//         }
//       });
//     } 
    
//   };

//   useEffect(() => {
//     getServiceList();
//   }, [payload]);
 
//   useEffect(() => {
//     if (status === "succeed") {
//       const data = serviceList?.result?.result;
//       if (data?.length) {
//         setTableData(data);
//       }
//     }
//   }, [serviceList, status]);
//   return (
//     <>
//       <div>
//         <Snackbar
//           open={success}
//           autoHideDuration={3000}
//           onClose={() => {
//             setSuccess(false);
//           }}
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           <Alert
//             onClose={() => {
//               setSuccess(false);
//             }}
//             severity="success"
//             sx={{ width: "100%" }}
//           >
//             {message}
//           </Alert>
//         </Snackbar>
//         <Card
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "5px",
//             alignItems: "center",
//           }}
//         >
          
//           <Stack direction="row" spacing={2}
//            sx={{
//             display: "flex",
//             alignItems: "center", 
//             }}>
//             <Typography sx={{ color: "blue" }}>
//               Service Records {" "} 
//           </Typography>
//           <Chip
//                 color={ "success"}
//                 label={serviceList?.result?.totalServices}
//               />
//           </Stack>
//           <Stack direction="row" spacing={2}>
//             <Search apiCall={serviceSearch} />
//           <Popover
//             id={'filter_popover'}
//             open={filterPopOver}
//             anchorEl={anchorEl}
//             onClose={handleFilterPopOver}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'left',
//             }}
//             sx={{
//               p: 10
//             }}
//           >
//             Filter Coming Soon!!
//           </Popover>
//           <Button
//               sx={{ height: "fit-content", alignSelf: "center", ml: 2 }}
//               variant="contained"
//               name= {"filter"}
//               disabled
//               onClick={(event) => {
//                 handleFilterPopOver(event);
//               }}
//             >
//             <FilterAltIcon />
              
//             </Button>
//             <Button
//               sx={{ height: "fit-content", alignSelf: "center", ml: 2 }}
//               variant="contained"
//               onClick={() => {
//                 handleModalState();
//                 setValues(initialState);
//               }}
//             >
//              <AddIcon />
//             </Button>
//           </Stack>
//         </Card>

//         {status === "loading" || isLoading ? (
//           <Loader />
//         ) : (
//           <TableContainer>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       sx={{
//                         color: "black",
//                         backgroundColor: "lightgray",
//                         minWidth: column.minWidth,
//                       }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {datasource?.length ? (
//                   datasource.map((row: any, index: number) => {
//                     return (
//                       <TableRow tabIndex={-1} key={index}>
//                         {columns.map((column, key) => {
//                           const value = row[column.id];
//                           if (column.id === "action") {
//                             return (
//                               <TableCell key={column.id} align={column.align}>
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   onClick={() => {
//                                     editAction(row.id);
//                                   }}
//                                 >
//                                 <EditIcon />
//                                 </Button>{" "}
//                               </TableCell>
//                             );
//                           }
//                           if (
//                             column.id === "productStatus" ||
//                             column.id === "deliveryStatus"
//                           ) {
//                             return (
//                               <TableCell key={column.id} align={column.align}>
//                                 <Chip
//                                   color={
//                                     row[column.id] === "Pending"
//                                       ? "warning"
//                                       : row[column.id] === "Not Repaired" ||
//                                         row[column.id] === "Customer Declined"
//                                       ? "error"
//                                       : "success"
//                                   }
//                                   key={`${column.id}-${index}`}
//                                   label={
//                                     column.id === "productStatus"
//                                       ? row.productStatus
//                                       : row.deliveryStatus
//                                   }
//                                   onClick={() => {}}
//                                 />
//                               </TableCell>
//                             );
//                           }

//                           return (
//                             <TableCell key={column.id} align={column.align}>
//                               {value}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     );
//                   })
//                 ) : (
//                   <>
//                     <TableRow>
//                       <TableCell> No Data Found !!</TableCell>
//                     </TableRow>
//                   </>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//         {pageCalculate(serviceList?.result?.totalServices) > 1 ? (
//           <Pagination
//             count={pageCalculate(serviceList?.result?.totalServices)}
//             color="primary"
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               margin: "10px",
//               top: "calc(100vh - 100px)",
//             }}
//             onChange={(event: React.ChangeEvent<unknown>, value: number) => {
//               const pageUpdate = { ...payload };
//               pageUpdate.pageNo = value;
//               // console.log("clicked", pageUpdate);
//               setPayload(pageUpdate);
//             }}
//           />
//         ) : (
//           ""
//         )}
//       </div>

//       <Dialog
//         open={isOpenModal}
//         onClose={() => handleModalState()}
//         maxWidth={"md"}
//       >
//         <DialogTitle>
//           {isEditMode ? "Update Service" : "Add Service"}
//           <Button
//             color="error"
//             sx={{ float: "right" }}
//             onClick={() => {
//               handleModalState();
//               setIsEditMode(false);
//             }}
//           >
//             <CloseIcon />
//           </Button>
//         </DialogTitle>
//         <DialogContent>
//           {!isEditMode ? (
//             <>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <Search apiCall={callSearchAPi} />
//                   {datagrid && (
//                     <List
//                       sx={{
//                         width: "100%",
//                         maxWidth: 360,
//                         bgcolor: "background.paper",
//                       }}
//                       aria-label="contacts"
//                     >
//                       <ListItem disablePadding key={"abc"}>
//                         <ListItemButton
//                           onClick={() => {
//                             const obj = {
//                               ...values,
//                               name: customer.name,
//                               address: customer.address,
//                               mobileNo: customer.mobileNo,
//                               custm_id: customer._id,
//                             };
//                             setValues(obj);
//                             showDataGrid(false);
//                           }}
//                         >
//                           <ListItemText inset primary={customer.name} />
//                         </ListItemButton>
//                       </ListItem>
//                     </List>
//                   )}
//                 </Grid>
//               </Grid>
//             </>
//           ) : (
//             ""
//           )}
//           <TextField
//             inputProps={{ maxLength: "10" }}
//             sx={{ m: 1 }}
//             name="mobileNo"
//             label="Mobile No:"
//             type={"tel"}
//             disabled={isEditMode}
//             value={values.mobileNo}
//             error={errors.mobileNo}
//             helperText={
//               errors.mobileNo && "Please enter 10 digit mobile number"
//             }
//             onChange={handleChange}
//             InputProps={{
//               startAdornment: <InputAdornment position="start">{<WhatsAppIcon color="success"/>}</InputAdornment>,
//             }}
//           />
//           <TextField
//             sx={{ m: 1 }}
//             name="name"
//             label="Customer Name"
//             type={"text"}
//             required
//             disabled={isEditMode}
//             value={values.name}
//             error={errors.name}
//             helperText={errors.name && "Please enter Name"}
//             onChange={handleChange}
//           />

//           <TextField
//             sx={{ m: 1 }}
//             name="address"
//             label="Address"
//             type={"text"}
//             required
//             disabled={isEditMode}
//             value={values.address}
//             error={errors.address}
//             helperText={errors.address && "Please enter address"}
//             onChange={handleChange}
//           />
//           <hr />
//           <TextField
//             sx={{ m: 1 }}
//             name="product"
//             label="Product"
//             type={"text"}
//             required
//             value={values.product}
//             error={errors.product}
//             helperText={errors.product && "Please enter product name"}
//             onChange={handleChange}
//           />

//           <TextField
//             sx={{ m: 1 }}
//             name="company"
//             label="Company Name"
//             type={"text"}
//             required
//             value={values.company}
//             error={errors.company}
//             helperText={errors.company && "Please select company name"}
//             onChange={handleChange}
//           />
//           <TextField
//             sx={{ m: 1 }}
//             name="problem"
//             label="Problem"
//             type={"text"}
//             required
//             value={values.problem}
//             error={errors.problem}
//             helperText={errors.problem && "Please enter product problem"}
//             onChange={handleChange}
//           />
//           <FormControl sx={{ m: 1, width: 235 }}>
//             <InputLabel>Accessories</InputLabel>
//             <Select
//               name="accessories"
//               label="Accessories"
//               multiple
//               value={
//                 Array.isArray(values.accessories) ? values.accessories : []
//               }
//               onChange={handleSelect}
//               input={<OutlinedInput id="Accessories" label="Accessories" />}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.3 }}>
//                   {selected.map((value) => (
//                     <Chip key={value} color={"primary"} label={value} />
//                   ))}
//                 </Box>
//               )}
//               MenuProps={MenuProps}
//             >
//               {accessoriesItem.map((name) => (
//                 <MenuItem
//                   key={name}
//                   value={name}
//                 >
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             sx={{ m: 1 }}
//             name="estimate_price"
//             label="Estimate_Cost"
//             type={"text"}
//             required
//             value={values.estimate_price}
//             error={errors.estimate_price}
//             helperText={errors.estimate_price && "Please enter Estimate Cost"}
//             onChange={handleChange}
//           />
//           <TextField
//             sx={{ m: 1 }}
//             name="description"
//             label="Description"
//             multiline
//             rows={2}
//             type={"text"}
//             value={values.description}
//             onChange={handleChange}
//           />
//           {isEditMode && (
//             <>
//               <TextField
//                 sx={{ m: 1, width: "20ch" }}
//                 name="productStatus"
//                 required={true}
//                 select
//                 label="Product Status"
//                 value={values.productStatus}
//                 onChange={handleChange}
//               >
//                 {productStatus.map((option) => (
//                   <MenuItem key={option.value} value={option.value} selected>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 sx={{ m: 1, width: "20ch" }}
//                 name="deliveryStatus"
//                 required={true}
//                 select
//                 label="Delivery Status"
//                 value={values.deliveryStatus}
//                 onChange={handleChange}
//               >
//                 {deliveryStatus.map((option) => (
//                   <MenuItem key={option.value} value={option.value} selected>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </>
//           )}
//         </DialogContent>

//         <DialogActions>
//           {isEditMode ? (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => {
//                 handleUpdate();
//               }}
//             >
//               Update Service
//             </Button>
//           ) : (
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Add Service
//             </Button>
//           )}
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               setIsEditMode(false);
//               handleModalState();
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
// export default Customers;
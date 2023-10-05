import  { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import {
  userInitialState,
  UserFormData,
  UserBankData,
  bankInitialState,
} from "./constant";
import { SingleUserApi } from "../../Api/user";
import Typography from "../../_component/ui/Typography";

const UserProfile = () => {
  const [formData, setFormData] = useState<UserFormData>(userInitialState);
  const [bankAccount, setBankAccount] =
    useState<UserBankData>(bankInitialState);



  const editAction = async () => {
    try {
      const url = `/user/userInfo`;
      const response: any = await SingleUserApi(url);
      const jsonData = await response.json();
      const userData = jsonData.userInfoData;
      const bankData = userData.bankAccountId;
      // if (schoolData) {
      //   const {
      //     schoolName,
      //     email,
      //     password,
      //     mobileNumber,
      //     startClass,
      //     highestClass,
      //     medium,
      //     foundedYear,
      //     contactDesignation,
      //     telephoneNumber,
      //     affiliatedBy,
      //     address,
      //   } = schoolData[0];
      //   const data = {
      //     schoolAdminId: schoolData[0]._id,
      //     schoolName,
      //     email,
      //     password,
      //     mobileNumber,
      //     startClass,
      //     highestClass,
      //     medium,
      //     foundedYear,
      //     contactDesignation,
      //     telephoneNumber,
      //     affiliatedBy,
      //     address,
      //   };
      setFormData(userData);
      setBankAccount(bankData[0]);
      // }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (event: any) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  // const handleUpdate = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const url = "/schoolAdmin/updateSchoolAdmin";
  //     const response = await updateSchoolAdminApi(url, formData);
  //     setOpenPopup(true);
  //     setTimeout(() => {
  //       setOpenPopup(false);
  //     }, 2000)
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  useEffect(() => {
    editAction();
  }, []);

  return (
    <>
      <div
        className="container-fluid mt--6"
        style={{ fontFamily: "Open Sans, sans-serif"  }}
      >
        <div className="row" >
          <Box
            className="col-xl-4 order-xl-2"
            sx={{
              padding: "10px",
              paddingLeft: "0px", 
              "@media (min-width: 200px) and (max-width: 560px)": {
                padding: "10px",
                paddingBottom: "0px",
              },
            }}
          >
            <div
              className="order-xl-2"
              style={{ paddingLeft: "0px", paddingBottom: "0px" }}
            >
              
                {bankAccount && Object.keys(bankAccount).length > 0 ? (
                  <Box
                  className="card card-profile"
                  sx={{
                    padding: "10px", backgroundColor: "#F5FFFA",
                  }}
                >
                    <Typography variant="h6">Bank Account Details</Typography>
                    <Typography
                      color="textSecondary"
                      sx={{ margin: "10px 0px" }}
                      variant="h5"
                      gutterBottom
                    >
                      Owner: {bankAccount.accountHolderName}
                    </Typography>
                    <Typography variant="h5">
                      Account Number: {bankAccount.accountNumber}
                    </Typography>
                    <Typography variant="h5" sx={{ margin: "10px 0px" }}>
                      Bank Name: {bankAccount.bankName}
                    </Typography>
                    <Typography variant="h5">
                      IFSC Code: {bankAccount.ifscCode}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                  className="card card-profile"
                  sx={{
                    padding: "10px", backgroundColor: "#F5FFFA", border: '1px solid red'
                  }}
                >
                  <Typography sx={{color: 'red'}} >Add Your Bank Account ! </Typography>
                  </Box>
                )}
            </div>
          </Box>
          <div
            className="col-xl-8 order-xl-1"
            style={{ fontFamily: "Open Sans, sans-serif", padding: "10px" }}
          >
            <div className="card" style={{backgroundColor: "#F5FFFA",}}>
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <Typography  variant="h6">My Account :-</Typography>
                  </div>
                </div>
              </div>
              <div
                className="card-body"
                style={{ flex: "1 1 auto", minHeight: "1px" }}
              >
                <form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4" style={{ paddingBottom: "rem" }}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name
                          </label>
                          <input
                            name="userName"
                            type="text"
                            id="input-name"
                            className="form-control"
                            placeholder="Enter Name"
                            value={formData.userName}
                            onChange={handleChange}
                            style={{marginBottom: '10px'}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Mobile Number
                          </label>
                          <input
                            name="mobileNumber"
                            type="number"
                            id="input-email"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Medium
                          </label>
                          <input
                            name="medium"
                            type="text"
                            id="input-first-name"
                            className="form-control"
                            placeholder="Medium"
                            value={formData.medium}
                            onChange={handleChange}
                          />
                        </div>
                      </div> */}
                      {/* <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Highest Class
                          </label>
                          <input
                            name="highestClass"
                            type="text"
                            id="input-last-name"
                            className="form-control"
                            placeholder="Highest Class"
                            value={formData.highestClass}
                            onChange={handleChange}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    More information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address :-  
                          </label>
                          <label
                            className="form-control-label"
                            style={{fontSize: 20, paddingLeft: 10, }} 
                          >
                            Sanchore , Rajasthan
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-mobile-number"
                          >
                            Plan Item Name :-
                          </label>
                     
                           <label
                            className="form-control-label"
                            htmlFor="input-mobile-number"
                            style={{fontSize: 20, paddingLeft: 11, }}  
                          >
                           {formData.planItemName}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-mobile-number"
                          >
                            My Referrral Code :-
                          </label>
                     
                           <label
                            className="form-control-label"
                            htmlFor="input-mobile-number"
                            style={{fontSize: 20, paddingLeft: 20, }}  
                          >
                           {formData.referralCode}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ margin: "8px 0px", width: "100px" }}
                    //  onClick={handleUpdate}
                  >
                    Save
                  </Button>
                  {/* <Popup open={openPopup} color="green" message="Data Updated Successfully" onClose={() => setOpenPopup(false)} /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import image from "../../assets/hanumanjii.jpg";
import { schoolInitialState, SchoolFormData } from "./constant";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { SingleUserApi } from "../../Api/user";

const UserProfile = () => {

  const [formData, setFormData] = useState<SchoolFormData>(schoolInitialState);
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const userString = sessionStorage.getItem("user");

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setFormData({ ...formData, password: event.target.value });
  };

  const user = userString ? JSON.parse(userString) : null;
  const id = user?.id ?? "";

  const editAction = async () => {
    try {
      const url = `/schoolAdmin/singleSchoolAdmin?schoolAdminId=${id}`;
      const response: any = await SingleUserApi(url);
      const jsonData = await response.json();
      const schoolData = jsonData.schoolData;
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
         setFormData(schoolData);
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
    editAction()
  }, [])

  return (
    <>
      <div
        className="container-fluid mt--6"
        style={{ fontFamily: "Open Sans, sans-serif", marginTop: "10px" }}
      >
        <div className="row">
          <div className="col-xl-4 order-xl-2" style={{ paddingLeft: "0px" }}>
            <div className="card card-profile">
              <img
                src={image}
                alt="Image placeholder"
                className="card-img-top rounded-circle"
                style={{ width: "200px", height: "150px", margin: "10px auto" }}
              />
              <div className="card-body pt-0">
                <div className="text-center">
                  <h5 className="h3">{formData.schoolName}</h5>
                  <div className="h5 font-weight-300">{formData.email}</div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2"></i> Since {formData.foundedYear}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2"></i>{formData.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-8 order-xl-1"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">My Account</h3>
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
                  <div className="pl-lg-4" style={{ paddingLeft: "1.5rem" }}>
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
                            name="teacherName"
                            type="text"
                            id="input-name"
                            className="form-control"
                            placeholder="Email address"
                            value={formData.schoolName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <input
                            name="email"
                            type="email"
                            id="input-email"
                            className="form-control"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
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
                      </div>
                      <div className="col-lg-6">
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
                      </div>
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
                            Address
                          </label>
                          <input
                            name="address"
                            id="input-address"
                            className="form-control"
                            placeholder="Home Address"
                            value={formData.address}
                            type="text"
                            onChange={handleChange}
                          />
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
                            Mobile Number
                          </label>
                          <input
                            name="mobileNumber"
                            type="text"
                            id="input-city"
                            className="form-control"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-date"
                          >
                            Founded Year
                          </label>
                          <input
                            name="foundedYear"
                            type="string"
                            id="input-year"
                            className="form-control"
                            placeholder="founded Year"
                            value={formData.foundedYear}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-password">
                            Password
                          </label>
                          <div className="input-group">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="input-password"
                              className="form-control"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handlePasswordChange}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={handlePasswordToggle}
                                style={{ cursor: 'pointer', height: '37.6px', borderRadius: '0px 5px 5px 0px' }}
                              >
                                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ margin: "8px 8px", width: "100px" }}
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
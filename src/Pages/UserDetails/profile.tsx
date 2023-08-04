import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { UserFormData, userInitialState } from '../Setting/constant';
import { updateUserApi } from '../../Api/admin';

interface UpdateUser {
    userId: string;
    password: string;
    deliveryStatus: string;
  }
const UserProfileUpdate = () => {
    const [userId, setUserId] = useState("");
    const [formData, setFormData] = useState<UserFormData>(userInitialState);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [updateUser, setUpdateUser] = useState<UpdateUser>({
      userId: `${userId}`,
      password: "",
      deliveryStatus: "",
    });
    const validateForm = () => {
        const { password } = updateUser;
        return password !== "";
      };
    
      const getMode = () => {
        const path = window.location.href;
        const pathArray = path.split("/");
        if (pathArray[pathArray.length - 2] === "user") {
          const referralId = pathArray[pathArray.length - 1];
          setUserId(referralId);
        }
      };
    
      useEffect(() => {
        getMode();
        setUpdateUser((prevUpdateUser) => ({
          ...prevUpdateUser,
          userId: userId,
        }));
      }, [userId]);
    
      const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
          return;
        }
        try {
          const url = "/user/update";
          const response: any = await updateUserApi(url, updateUser);
        } catch (error) {
          console.error("Error", error);
        }
      };
    
    
    
      const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
      };
    
      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
        setUpdateUser((prevUpdateUser) => ({
          ...prevUpdateUser,
          password: value,
        }));
      };

      const handleChange = (event: any) => {
        const updatedFormData = {
          ...formData,
          [event.target.name]: event.target.value,
        };
        setFormData(updatedFormData);
      };


  const handleUpdateUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUpdateUser((prevUpdateUser) => ({
      ...prevUpdateUser,
      [name]: value,
    }));
  };

      const PendingStatus =
      formData.deliveryStatus === "0" ? "Pending" : "Delivered";
    const deliveredStatus =
      formData.deliveryStatus === "0" ? "Delivered" : "Pending";

  return (
    <Box
    sx={{
      margin: "20px",
      "@media (min-width: 200px) and (max-width: 600px)": {
        margin: "5px",
      },
    }}
  >
    <Box
    className="card card-profile"
    sx={{
      padding: "10px",
      backgroundColor: "#F5FFFA",
      marginBottom: "10px",
    }}
  >
    <h4 className=" text-muted mb-4">User information</h4>
    <div className="pl-lg-4" style={{ paddingBottom: "rem" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label
              className="form-control-label"
              style={{ fontSize: 21, marginLeft: 5 }}
              htmlFor="input-name"
            >
              Name
            </label>
            <input
              disabled
              name="userName"
              type="text"
              id="input-name"
              className="form-control"
              placeholder="Enter Name"
              value={formData.userName}
              onChange={handleChange}
              style={{ fontSize: 20, marginTop: 10 }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label
              className="form-control-label"
              style={{ fontSize: 21, marginLeft: 5 }}
              htmlFor="input-email"
            >
              Mobile Number
            </label>
            <input
              disabled
              name="mobileNumber"
              type="number"
              id="input-email"
              className="form-control"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              style={{ fontSize: 20, marginTop: 10 }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label
              className="form-control-label"
              style={{ fontSize: 21, marginLeft: 5, marginTop: 10 }}
              htmlFor="input-email"
            >
              Delivery Status
            </label>
            <select
              style={{
                fontSize: 20,
                marginTop: 10,
                width: "572px",
                height: "44px",
                borderRadius: "5px",
                paddingRight: "10px",
              }}
              name="deliveryStatus"
              id="cars"
              value={updateUser.deliveryStatus} // Set the value of the dropdown to updateUser.deliveryStatus
              onChange={handleUpdateUser} // Use handleUpdateUser for change events
            >
              <option value="0">{PendingStatus}</option>
              <option value="1">{deliveredStatus}</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label
              className="form-control-label"
              style={{ fontSize: 21, marginLeft: 5, marginTop: 10 }}
              htmlFor="input-password"
            >
              New Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="input-password"
                name="password"
                className="form-control"
                placeholder="Password"
                style={{ fontSize: 20, marginTop: 10 }}
                onChange={handlePasswordChange}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={handlePasswordToggle}
                  style={{
                    cursor: "pointer",
                    height: "44.6px",
                    borderRadius: "0px 5px 5px 0px",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ margin: "20px 0px", width: "100%" }}
              onClick={handleUpdate}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Box>
  </Box>

  )
}

export default UserProfileUpdate
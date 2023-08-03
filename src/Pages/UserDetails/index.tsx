import { useState, FC, useEffect } from "react";
import { Box, Card, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { columns } from "../Reffral Users/constant";
import Tables from "../../_component/ui/table";
import { useNavigate } from "react-router-dom";
import { listUserApi } from "../../Api/user";
import {
  UserBankData,
  UserFormData,
  bankInitialState,
  userInitialState,
} from "../Setting/constant";
import { SingleUserApi } from "../../Api/user";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { updateUserApi } from "../../Api/admin";

export interface RefrralUsers {
  userName: string;
  mobileNumber: number | string;
  paymentStatus: string;
  totalItem: number | string;
  deliveryStatusText: number | string;
}

interface UpdateUser {
  userId: string;
  password: string;
  deliveryStatus: string
}

interface IList {
  userId: string;
}


const UserDetails = () => {
  const [users, setUsers] = useState<RefrralUsers[]>([]);
  const [isNoUser, setIsNoUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState<UserFormData>(userInitialState);
  const [bankAccount, setBankAccount] =
    useState<UserBankData>(bankInitialState);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [updateUser, setUpdateUser] = useState<UpdateUser>({
    userId: `${userId}`,
    password: '',
    deliveryStatus: ''
  });

  const validateForm = () => {
    const { password,  } = updateUser;
    return (
      password !== "" 
    );
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
  }, []);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setFormData({ ...formData, password: event.target.value });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const url = "/user/updateBankAccount";
      const response: any = await updateUserApi(url, updateUser);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const url = `/user/reflUserList?userId=${userId}`;
      const response: any = await listUserApi(url);
      if (response.ok) {
        const jsonData = await response.json();
        if (
          jsonData &&
          jsonData.refUserList &&
          jsonData.refUserList.length > 0
        ) {
          // Update the "Delivery Status" field for each user
          const modifiedUsers = jsonData.refUserList.map(
            (user: { deliveryStatus: string }) => ({
              ...user,
              deliveryStatusText:
                user.deliveryStatus === "0" ? "Pending" : "Delivered",
            })
          );
          setUsers(modifiedUsers);
        } else {
          setIsNoUser(true);
        }
      } else if (response.status === 404) {
        setIsNoUser(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchBankAccount = async () => {
    try {
      const url = `/user/userInfo?userId=${userId}`;
      const response: any = await SingleUserApi(url);
      const jsonData = await response.json();
      const userData = jsonData.userInfoData;
      const bankData = userData.bankAccountId;
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

  const handleUpdateUser = (event: any) => {
    const updatedUserData = {
        ...updateUser,
        [event.target.name]: event.target.value
    };
    setUpdateUser(updatedUserData);
  }
 
  const PendingStatus =
    formData.deliveryStatus === "0" ? "Pending" : "Delivered";
  const deliveredStatus =
    formData.deliveryStatus === "0" ? "Delivered" : "Pending";
  useEffect(() => {
    if (userId) {
      fetchUsers();
      fetchBankAccount();
    }
  }, [userId]);

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
        className="col-xl-4 order-xl-2"
        sx={{
          padding: "10px",
          paddingLeft: "0px",
          width: "100%",
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
          <Box
            className="card card-profile"
            sx={{
              padding: "10px",
              backgroundColor: "#F5FFFA",
            }}
          >
            {bankAccount && Object.keys(bankAccount).length > 0 ? (
              <>
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
              </>
            ) : (
              <Typography
                sx={{ textTransform: "capitalize", color: "red", fontSize: 20 }}
              >
                {" "}
                {formData.userName} Not Added Bank Account !{" "}
              </Typography>
            )}
          </Box>
        </div>
      </Box>
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
                {/* <input
                  disabled
                  name="mobileNumber"
                  type="text"
                  id="input-email"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  value={deliveryStatus}
                  onChange={handleChange}
                  style={{ fontSize: 20, marginTop: 10 }}
                /> */}
                <select
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    width: "572px",
                    height: "44px",
                    borderRadius: "5px",
                    paddingRight: "10px",
                  }}
                  name="cars"
                  id="cars"
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
      {isNoUser ? (
        <Typography variant="h6" align="center">
          There are no users added by user
        </Typography>
      ) : (
        <Card sx={{ overflowX: "scroll" }}>
          <Box sx={{ minWidth: 800 }}>
            {/* Pass the modified users data with the updated "Delivery Status" */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: 25,
                marginLeft: 2,
                textTransform: "capitalize",
                "@media (min-width: 200px) and (max-width: 600px)": {
                  fontSize: 11,
                },
              }}
            >
              Users Added By {formData.userName}
            </Typography>
            <Tables
              columns={columns}
              data={users}
              pagination={true}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default UserDetails;

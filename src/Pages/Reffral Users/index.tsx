import {  useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Button,
  Typography,
  AppBar,
  Toolbar,
  SvgIcon
} from "@mui/material";
import { columns, usersdata } from "./constant"
import { Tables } from "../../_component/ui/table";
import {Link } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
export interface RefrralUsers {
  Name: string;
  email: string;
  mobileNumber: number | string;
  gender: string;
  dob: string;
  address: string;
}

const ReffralUsers = () => {
 const [users, setUsers] = useState<RefrralUsers[]>([]);


  const fetchUsers = async () => {
    try {
      const url = "/schoolAdmin/teachersList"
    //   const response: any = await (url, teacher);
    //   const jsonData = await response.json()
    // setTeacher(jsonData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <>
      <div style={{ margin: "20px" }}>
        <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
          <AppBar
            position="static"
            sx={{  backgroundColor: "#F5FFFA", color: "black" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontSize: 25 }}
              >
                Refrral Users
              </Typography>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PersonAddAlt1Icon />
                  </SvgIcon>
                }
                component={Link}
                to="/newuser"
                variant="contained"
              >
                Add Users
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Card>
          <Box sx={{ minWidth: 800, overflow: "scroll",}}>
            <Tables columns={columns} data={usersdata} />
          </Box>
        </Card>
      </div>
    </>
  );
};


export default ReffralUsers;
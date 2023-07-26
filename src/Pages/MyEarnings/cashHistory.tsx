import {  useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { cashColumns, cashTransactionData, CashTransaction } from "./constant";
import { Tables } from "../../_component/ui/table";

const CashHistory = () => {

 const [users, setUsers] = useState<CashTransaction[]>([]);

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
     <Box sx={{ padding: 0 }}>
      <div style={{ margin: "10px" }}>
      <Card sx={{overflow: "scroll"}}>
          <Box sx={{ minWidth: 100 }}>
            <Tables columns={cashColumns} data={cashTransactionData} />
          </Box>
        </Card>
      </div>
      </Box>
    </>
  );
};


export default CashHistory;
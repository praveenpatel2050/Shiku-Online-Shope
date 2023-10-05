import {  useState, } from "react";
import {
  Box,
  Card,
} from "@mui/material";
import { cashColumns, cashTransactionData } from "./constant";
import  Tables  from "../../_component/ui/table";

const CashHistory = () => {

 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);

 const handleChangePage = (
  _event: React.MouseEvent<HTMLButtonElement> | null,
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
  // const fetchUsers = async () => {
  //   try {
  //     const url = "/schoolAdmin/teachersList"
  //   //   const response: any = await (url, teacher);
  //   //   const jsonData = await response.json()
  //   // setTeacher(jsonData);
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <>
     <Box sx={{ padding: 0 }}>
      <div style={{ margin: "10px" }}>
      <Card sx={{overflowX: "scroll"}}>
          <Box sx={{ minWidth: 100 }}>
          <Tables columns={cashColumns} data={cashTransactionData} pagination={true} page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}  />
          </Box>
        </Card>
      </div>
      </Box>
    </>
  );
};


export default CashHistory;
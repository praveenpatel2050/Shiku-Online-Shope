import React, { useState, useEffect } from "react";
import { Box, Card } from "@mui/material";
import { referralColumns, referralTransactionData, ReferralUsers } from "./constant";
import { Tables } from "../../_component/ui/table";

const ReferralHistory = () => {
  const [users, setUsers] = useState<ReferralUsers[]>([]);

  const fetchUsers = async () => {
    try {
      const url = "/schoolAdmin/teachersList";
      // const response: any = await (url, teacher);
      // const jsonData = await response.json()
      // setTeacher(jsonData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <Box sx={{ padding: 0 }}>
      <div style={{ margin: "10px" }}>
        <Card>
          <Box sx={{ minWidth: 800, overflow: "scroll" }}>
            <Tables columns={referralColumns} data={referralTransactionData} />
          </Box>
        </Card>
      </div>
    </Box>
  );
};

export default ReferralHistory;

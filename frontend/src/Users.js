import React from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTabel";
import { Box } from "@mui/material";


const Users = () => {
  return (
    <Box
    sx={{
       width: 'calc(100% - 100px)',
       margin: 'auto',
       marginTop: '100px'
    }}>
      <UserForm />
      <UsersTable rows={users} />
    </Box>
  );
};

export default Users;

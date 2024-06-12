import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTabel";
import Axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
   const [ users, setUsers ] = useState([]);
   const [ submitted, setSubmitted ] = useState(false);
   const [ selectedUser, setSelectedUser ] = useState({})
   const [ isEdit, setIsEdit ] = useState(false);

   useEffect(() => {
      getUsers();
   }, []);

   const getUsers = () => {
      Axios.get(process.env.REACT_APP_ENDPOINT + '/api/users')
         .then(response => {
            setUsers(response.data?.response || []);
         })
         .catch(error => {
            console.error("Axios Error: ", error);
            console.log("REACT_APP_ENDPOINT:", process.env.REACT_APP_ENDPOINT);

         })
   }

   const addUser = (data) => {
      setSubmitted(true);
      const payload = {
         id: data.id,
         name: data.name
      }
      Axios.post(process.env.REACT_APP_ENDPOINT +  '/api/adduser', payload)
         .then(response => {
            getUsers();
            setSubmitted(false);
         })
         .catch(error => {
            console.error("Axios Error: ", error);
         })
   }

   const updateUser = (data) => {
      setSubmitted(true);

      const payload = {
         id: data.id,
         name: data.name
      }

      Axios.post(process.env.REACT_APP_ENDPOINT + '/api/updateuser', payload)
         .then(response => {
            getUsers();
            setSubmitted(false);
            isEdit(false);
         })
         .catch(error => {
            console.error("Axios Error: ", error);
         })
   }

   const deleteUser = (data) => {
      Axios.post(process.env.REACT_APP_ENDPOINT + '/api/deleteuser', data)
         .then(response => {
            getUsers();
         })
         .catch(error => {
            console.error("Axios Error: ", error);
         })
   }

   return (
      <Box
         sx={{
            width: 'calc(100% - 100px)',
            margin: 'auto',
            marginTop: '100px'
         }}
      >
         <UserForm
            addUser = { addUser }
            updateUser = { updateUser }
            submitted = { submitted }
            data = { selectedUser }
            isEdit = { isEdit }
         />
         <UsersTable
            rows={ users }
            selectedUser={ data => {
               setSelectedUser(data)
               setIsEdit(true)
            }}   
            deleteUser = { data => {
               window.confirm('Are you sure?') && deleteUser(data)
            }}
         />
      </Box>
   );
}

export default Users;

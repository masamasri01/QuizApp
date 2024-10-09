import { Box, Switch, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useAllUsers } from "./useAllUsers";
import { useEffect, useState } from "react";
import { FlashMessage } from "../../AuthPages/FlashMessage";

export const Users = () => {
  const { users, isLoading, changeUserStatus,handleResetMessage, message } = useAllUsers();
  const [userList, setUserList] = useState(users || []);
  const id = localStorage.getItem("id");
  console.log(id,"id");
  useEffect(() => {
    setUserList(users || []);
  }, [users]);

  const handleToggleActive = (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();
    changeUserStatus({ userId: id });
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, is_active: !user.is_active } : user
      )
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, headerClassName: 'header' },
    { field: 'name', headerName: 'Name', width: 150, headerClassName: 'header' },
    { field: 'email', headerName: 'Email', width: 200, headerClassName: 'header' },
    {
      field: 'is_active',
      headerName: 'Active',
      width: 150,
      renderCell: (params) => (
        params.row.id == id ? null :
        <Switch
          checked={params.row.is_active}
          disabled={params.row.id === id}
          onChange={(e) => handleToggleActive(e, params.row.id)}
          color="primary"
        />
      ),
      headerClassName: 'header',
    },
  ];

  return (
    <Box>
        <Typography marginTop="40px" variant="h4" align="center" color={"#252F41"} textAlign={"start"} >Users</Typography>
        {message&&<FlashMessage class={"success"} message={message} delete={handleResetMessage} />}
    <Box p={2} height={"fit-content"} sx={{ 
      border: '1px solid #e0e0e0', 
      borderRadius: 2, 
      boxShadow: 1, 
      bgcolor: 'background.paper' ,
      width: "70vw",
      marginTop: "40px",
    }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[7, 15, 20]}
        rows={userList}
        columns={columns}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row': {
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e0e0e0',
          },
          '& .header': {
            fontSize: '16px',
            color: "#252F41",
          },
        }}
      />
    </Box>
    </Box>
  );
};

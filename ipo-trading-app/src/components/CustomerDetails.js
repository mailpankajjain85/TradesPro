import React, { useState } from 'react';
import { Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./Header";

const initialRows = [
  { id: 1, name: 'John Doe', phoneNumber: '123-456-7890' },
  { id: 2, name: 'Jane Smith', phoneNumber: '987-654-3210' },
];

const CustomerDetails = () => {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ id: null, name: '', phoneNumber: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleAddClick = () => {
    setIsEdit(false);
    setNewUser({ id: null, name: '', phoneNumber: '' });
    setOpen(true);
  };

  const handleEditClick = (user) => {
    setIsEdit(true);
    setNewUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({ id: null, name: '', phoneNumber: '' });
  };

  const handleSave = () => {
    if (newUser.name && newUser.phoneNumber) {
      if (isEdit) {
        setRows(rows.map(row => (row.id === newUser.id ? newUser : row)));
      } else {
        setRows([...rows, { id: rows.length + 1, ...newUser }]);
      }
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginTop: 16 }}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={newUser.phoneNumber}
            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerDetails;
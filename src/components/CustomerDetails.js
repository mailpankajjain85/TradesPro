import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid2, Container } from '@mui/material';
import { DataGrid2 } from '@mui/x-data-Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialRows = [
  { id: 1, name: 'Pankaj Jain', phoneNumber: '123-456-7890' },
  { id: 2, name: 'Tanish Jain', phoneNumber: '987-654-3210' },
  { id: 3, name: 'Samyak Jain', phoneNumber: '987-654-3210' },
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
    <Container>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid2 rows={rows} columns={columns} pageSize={5} />
      </div>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginTop: 16 }}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                margin="dense"
                label="Phone Number"
                type="text"
                fullWidth
                value={newUser.phoneNumber}
                onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
              />
            </Grid2>
          </Grid2>
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
    </Container>
  );
};

export default CustomerDetails;
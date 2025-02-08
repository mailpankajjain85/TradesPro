import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginBottom: 16 }}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Phone Number"
                type="text"
                fullWidth
                value={newUser.phoneNumber}
                onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
              />
            </Grid>
          </Grid>
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
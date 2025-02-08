import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

const initialData = [
  { id: 1, ipoName: 'Sanathan', clientName: 'Pankaj', saudaType: 'Small Hni App', quantity: 100, panCardUpdated: 'Yes' },
  { id: 2, ipoName: 'Transrail', clientName: 'Piyush', saudaType: 'Big Hni App', quantity: 50, panCardUpdated: 'Yes' },
  { id: 3, ipoName: 'Afcon', clientName: 'Tanish', saudaType: 'Retail App', quantity: 75, panCardUpdated: 'No' },
];

const IpoTransactionPanCardDetails = () => {
  const [data] = useState(initialData); // Removed setData to avoid the warning
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IPO Transaction Pan Card Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IPO Name</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Sauda Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Pan Card Details Updated?</TableCell>
              <TableCell>Update/Edit Pan Card Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.ipoName}</TableCell>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.saudaType}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.panCardUpdated}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={handleOpen}>
                    {row.panCardUpdated === 'Yes' ? 'Edit' : 'Update'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Pan Card Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input type="file" accept=".xlsx, .xls" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IpoTransactionPanCardDetails;
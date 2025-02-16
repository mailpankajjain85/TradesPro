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
  MenuItem,
  TextField,
} from '@mui/material';
import * as XLSX from 'xlsx';
import withAuthorization from "./withAuthorization"; // Import the HOC
const initialData = [
  { id: 1, ipoName: 'Sanathan', clientName: 'Pankaj', saudaType: 'Small Hni App', quantity: 100, panCardUpdated: 'Yes' },
  { id: 2, ipoName: 'Transrail', clientName: 'Piyush', saudaType: 'Big Hni App', quantity: 50, panCardUpdated: 'Yes' },
  { id: 3, ipoName: 'Afcon', clientName: 'Tanish', saudaType: 'Retail App', quantity: 75, panCardUpdated: 'No' },
];

const IpoTransactionPanCardDetails = () => {
  const [data] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [selectedIpoName, setSelectedIpoName] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');
  const [selectedPanCardUpdated, setSelectedPanCardUpdated] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadOpen = () => {
    setDownloadOpen(true);
  };

  const handleDownloadClose = () => {
    setDownloadOpen(false);
  };

  const handleDownload = () => {
    // Filter data based on selected criteria
    const filteredData = data.filter(
      (row) =>
        (selectedIpoName ? row.ipoName === selectedIpoName : true) &&
        (selectedClientName ? row.clientName === selectedClientName : true)
    );

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData.map(row => ({
      'IPO Name': row.ipoName,
      'Client Name': row.clientName,
      'Pan Card Number': 'XXXXXX' // Placeholder for Pan Card Number
    })));

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Pan Card Details');

    // Write workbook to file
    XLSX.writeFile(wb, 'PanCardDetails.xlsx');

    handleDownloadClose();
  };

  const filteredData = data.filter(
    (row) =>
      (selectedIpoName ? row.ipoName === selectedIpoName : true) &&
      (selectedClientName ? row.clientName === selectedClientName : true) &&
      (selectedPanCardUpdated ? row.panCardUpdated === selectedPanCardUpdated : true)
  );

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IPO Transaction Pan Card Details
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '10px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="IPO Name"
            value={selectedIpoName}
            onChange={(e) => setSelectedIpoName(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {initialData.map((ipo) => (
              <MenuItem key={ipo.id} value={ipo.ipoName}>
                {ipo.ipoName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Client Name"
            value={selectedClientName}
            onChange={(e) => setSelectedClientName(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {initialData.map((client) => (
              <MenuItem key={client.id} value={client.clientName}>
                {client.clientName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Pan Card Details Updated?"
            value={selectedPanCardUpdated}
            onChange={(e) => setSelectedPanCardUpdated(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleDownloadOpen} style={{ float: 'right', marginBottom: '10px' }}>
        Download
      </Button>
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
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.ipoName}</TableCell>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.saudaType}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell style={{ color: row.panCardUpdated === 'Yes' ? 'green' : 'red' }}>
                  {row.panCardUpdated}
                </TableCell>
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
      <Dialog open={downloadOpen} onClose={handleDownloadClose}>
        <DialogTitle>Download Pan Card Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="IPO Name"
                value={selectedIpoName}
                onChange={(e) => setSelectedIpoName(e.target.value)}
                select
                fullWidth
                required
              >
                {initialData.map((ipo) => (
                  <MenuItem key={ipo.id} value={ipo.ipoName}>
                    {ipo.ipoName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client Name"
                value={selectedClientName}
                onChange={(e) => setSelectedClientName(e.target.value)}
                select
                fullWidth
              >
                {initialData.map((client) => (
                  <MenuItem key={client.id} value={client.clientName}>
                    {client.clientName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownloadClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDownload} color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default withAuthorization(IpoTransactionPanCardDetails, ["admin", "user"]);
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
import * as XLSX from 'xlsx';
import withAuthorization from "./withAuthorization"; // Import the HOC
const initialData = [
  { id: 1, ipoName: 'Sanathan', clientName: 'Pankaj', panCardNumber: 'ABCDE1234F', alloted: 'Yes', allotmentShares: 100 },
  { id: 2, ipoName: 'Transrail', clientName: 'Piyush', panCardNumber: 'FGHIJ5678K', alloted: 'No', allotmentShares: 0 },
  { id: 3, ipoName: 'Afcon', clientName: 'Tanish', panCardNumber: 'LMNOP9876Q', alloted: 'Yes', allotmentShares: 75 },
];

const IpoTransactionAllotmentDetails = () => {
  const [data] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

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
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data.map(row => ({
      'IPO Name': row.ipoName,
      'Client Name': row.clientName,
      'Pan Card Number': row.panCardNumber,
      'Alloted': row.alloted,
      'Allotment Shares': row.allotmentShares,
    })));

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Allotment Details');

    // Write workbook to file
    XLSX.writeFile(wb, 'AllotmentDetails.xlsx');

    handleDownloadClose();
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IPO Transaction Allotment Details
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginRight: '10px' }}>
        Upload
      </Button>
      <Button variant="contained" color="primary" onClick={handleDownloadOpen}>
        Download
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IPO Name</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Pan Card Number</TableCell>
              <TableCell>Alloted?</TableCell>
              <TableCell>Allotment Shares</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.ipoName}</TableCell>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.panCardNumber}</TableCell>
                <TableCell style={{ color: row.alloted === 'Yes' ? 'green' : 'red' }}>
                  {row.alloted}
                </TableCell>
                <TableCell>{row.allotmentShares}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Allotment Details</DialogTitle>
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
        <DialogTitle>Download Allotment Details</DialogTitle>
        <DialogContent>
          <Typography>Click the download button to download the allotment details.</Typography>
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
export default withAuthorization(IpoTransactionAllotmentDetails, ["admin", "user"]);
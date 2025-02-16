import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import withAuthorization from "./withAuthorization"; // Import the HOC
const initialClients = [
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
];

const initialIpos = [
  { id: 1, name: 'Sanathan' },
  { id: 2, name: 'Transrail' },
  { id: 3, name: 'Afcon' },
];

const initialData = [
  { clientName: 'Client A', ipoName: 'Sanathan', profit: 1000 },
  { clientName: 'Client B', ipoName: 'Transrail', profit: 2000 },
  { clientName: 'Client C', ipoName: 'Afcon', profit: 1500 },
  { clientName: 'Client A', ipoName: 'Transrail', profit: 1200 },
  { clientName: 'Client B', ipoName: 'Afcon', profit: 1800 },
  { clientName: 'Client C', ipoName: 'Sanathan', profit: 2200 },
];

const ClientProfitDashboard = () => {
  const [clientFilter, setClientFilter] = useState('');
  const [ipoFilter, setIpoFilter] = useState('');
  const [data, setData] = useState(initialData);

  const handleFilter = () => {
    let filteredData = initialData;

    if (clientFilter) {
      filteredData = filteredData.filter((item) => item.clientName === clientFilter);
    }

    if (ipoFilter) {
      filteredData = filteredData.filter((item) => item.ipoName === ipoFilter);
    }

    setData(filteredData);
  };

  const calculateTotalProfit = () => {
    return data.reduce((total, item) => total + item.profit, 0);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Client Profit Dashboard
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Client Name"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            select
            fullWidth
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            {initialClients.map((client) => (
              <MenuItem key={client.id} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="IPO Name"
            value={ipoFilter}
            onChange={(e) => setIpoFilter(e.target.value)}
            select
            fullWidth
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            {initialIpos.map((ipo) => (
              <MenuItem key={ipo.id} value={ipo.name}>
                {ipo.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            fullWidth
            size="small"
          >
            Filter
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>IPO Name</TableCell>
              <TableCell>Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.ipoName}</TableCell>
                <TableCell>₹{row.profit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Total Profit: ₹{calculateTotalProfit()}
      </Typography>
    </Container>
  );
};
export default withAuthorization(ClientProfitDashboard, ["admin", "user"]);
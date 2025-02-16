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

const initialData = [
  { clientName: 'Client A', moneyOutstanding: 1000 },
  { clientName: 'Client B', moneyOutstanding: -500 },
  { clientName: 'Client C', moneyOutstanding: 1500 },
  { clientName: 'Client A', moneyOutstanding: -200 },
  { clientName: 'Client B', moneyOutstanding: 800 },
  { clientName: 'Client C', moneyOutstanding: -300 },
];

const ClientOutstandingDashboard = () => {
  const [clientFilter, setClientFilter] = useState('');
  const [minMoneyFilter, setMinMoneyFilter] = useState('');
  const [maxMoneyFilter, setMaxMoneyFilter] = useState('');
  const [data, setData] = useState(initialData);

  const handleFilter = () => {
    let filteredData = initialData;

    if (clientFilter) {
      filteredData = filteredData.filter((item) => item.clientName === clientFilter);
    }

    if (minMoneyFilter) {
      filteredData = filteredData.filter((item) => item.moneyOutstanding >= parseFloat(minMoneyFilter));
    }

    if (maxMoneyFilter) {
      filteredData = filteredData.filter((item) => item.moneyOutstanding <= parseFloat(maxMoneyFilter));
    }

    setData(filteredData);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Client Outstanding Dashboard
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
            label="Min Money Outstanding"
            value={minMoneyFilter}
            onChange={(e) => setMinMoneyFilter(e.target.value)}
            type="number"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Max Money Outstanding"
            value={maxMoneyFilter}
            onChange={(e) => setMaxMoneyFilter(e.target.value)}
            type="number"
            fullWidth
            size="small"
          />
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
              <TableCell>Money Outstanding</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.clientName}</TableCell>
                <TableCell
                  style={{
                    color: row.moneyOutstanding >= 0 ? 'green' : 'red',
                  }}
                >
                  ₹{row.moneyOutstanding}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default withAuthorization(ClientOutstandingDashboard, ["admin", "user"]);

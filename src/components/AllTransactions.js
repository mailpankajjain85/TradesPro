import React, { useState } from "react";
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
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const initialTransactions = [
  {
    id: 1,
    customerName: "Pankaj",
    ipoName: "Sanathan",
    tradeType: "Buy",
    saudaType: "Shares",
    saudaDate: "2023-01-01",
    quantity: 10,
    price: 100,
  },
  {
    id: 2,
    customerName: "Piyush",
    ipoName: "Transrail",
    tradeType: "Sell",
    saudaType: "Subject To",
    saudaDate: "2023-01-02",
    quantity: 5,
    price: 150,
  },
  {
    id: 3,
    customerName: "Tanish",
    ipoName: "Afcon",
    tradeType: "Buy",
    saudaType: "Applications",
    saudaDate: "2023-01-03",
    quantity: 8,
    price: 200,
  },
];

const AllTransactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filters, setFilters] = useState({
    ipoName: '',
    tradeType: '',
    saudaType: '',
    saudaDate: '',
    priceMin: '',
    priceMax: '',
    customerName: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filteredTransactions = initialTransactions;

    if (filters.ipoName) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.ipoName === filters.ipoName);
    }
    if (filters.tradeType) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.tradeType === filters.tradeType);
    }
    if (filters.saudaType) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.saudaType === filters.saudaType);
    }
    if (filters.saudaDate) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.saudaDate === filters.saudaDate);
    }
    if (filters.priceMin) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.price >= parseFloat(filters.priceMin));
    }
    if (filters.priceMax) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.price <= parseFloat(filters.priceMax));
    }
    if (filters.customerName) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.customerName === filters.customerName);
    }

    setTransactions(filteredTransactions);
  };

  const clearFilters = () => {
    setFilters({
      ipoName: '',
      tradeType: '',
      saudaType: '',
      saudaDate: '',
      priceMin: '',
      priceMax: '',
      customerName: '',
    });
    setTransactions(initialTransactions);
  };

  const uniqueIpoNames = [...new Set(initialTransactions.map(transaction => transaction.ipoName))];
  const uniqueCustomerNames = [...new Set(initialTransactions.map(transaction => transaction.customerName))];

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          All Transactions
        </Typography>

        {/* Filter Section */}
        <Grid container spacing={2} style={{ marginBottom: 16 }}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="IPO Name"
              name="ipoName"
              value={filters.ipoName}
              onChange={handleFilterChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {uniqueIpoNames.map((ipoName) => (
                <MenuItem key={ipoName} value={ipoName}>
                  {ipoName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Trade Type"
              name="tradeType"
              value={filters.tradeType}
              onChange={handleFilterChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Sauda Type"
              name="saudaType"
              value={filters.saudaType}
              onChange={handleFilterChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Shares">Shares</MenuItem>
              <MenuItem value="Subject To">Subject To</MenuItem>
              <MenuItem value="Applications">Applications</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Sauda Date"
              name="saudaDate"
              value={filters.saudaDate}
              onChange={handleFilterChange}
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Price Min"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleFilterChange}
              type="number"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Price Max"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleFilterChange}
              type="number"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Customer Name"
              name="customerName"
              value={filters.customerName}
              onChange={handleFilterChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {uniqueCustomerNames.map((customerName) => (
                <MenuItem key={customerName} value={customerName}>
                  {customerName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Button variant="contained" color="primary" onClick={applyFilters} fullWidth size="small">
              Apply
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Button variant="contained" color="secondary" onClick={clearFilters} fullWidth size="small">
              Clear
            </Button>
          </Grid>
        </Grid>

        {/* Transactions Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IPO Name</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Sauda Type</TableCell>
                <TableCell>Sauda Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Trade Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.ipoName}</TableCell>
                  <TableCell>{transaction.customerName}</TableCell>
                  <TableCell>{transaction.saudaType}</TableCell>
                  <TableCell>{transaction.saudaDate}</TableCell>
                  <TableCell>{transaction.price}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.tradeType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default AllTransactions;
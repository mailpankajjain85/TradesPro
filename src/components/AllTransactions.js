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
  IconButton,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import withAuthorization from "./withAuthorization"; // Import the HOC

const initialTransactions = [
  {
    id: 1,
    customerName: "Pankaj",
    ipoName: "Sanathan",
    tradeType: "Buy",
    saudaType: "Shares",
    applicationType: "",
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
    applicationType: "bhni",
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
    applicationType: "shni",
    saudaDate: "2023-01-03",
    quantity: 8,
    price: 200,
  },
];

const AllTransactions = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filters, setFilters] = useState({
    ipoName: '',
    tradeType: '',
    saudaType: '',
    saudaDate: '',
    customerName: '',
  });
  const [editingRow, setEditingRow] = useState(null);

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
      customerName: '',
    });
    setTransactions(initialTransactions);
  };

  const handleEdit = (transaction) => {
    setEditingRow(transaction);
  };

  const handleSave = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id ? editingRow : transaction
    );
    setTransactions(updatedTransactions);
    setEditingRow(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingRow({
      ...editingRow,
      [name]: value,
    });
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
                <TableCell>Application Type</TableCell>
                <TableCell>Sauda Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Trade Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="ipoName"
                        value={editingRow.ipoName}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                      >
                        {uniqueIpoNames.map((ipoName) => (
                          <MenuItem key={ipoName} value={ipoName}>
                            {ipoName}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      transaction.ipoName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="customerName"
                        value={editingRow.customerName}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                      >
                        {uniqueCustomerNames.map((customerName) => (
                          <MenuItem key={customerName} value={customerName}>
                            {customerName}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      transaction.customerName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="saudaType"
                        value={editingRow.saudaType}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="Shares">Shares</MenuItem>
                        <MenuItem value="Subject To">Subject To</MenuItem>
                        <MenuItem value="Applications">Applications</MenuItem>
                      </TextField>
                    ) : (
                      transaction.saudaType
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="applicationType"
                        value={editingRow.applicationType}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="bhni">BHNI</MenuItem>
                        <MenuItem value="shni">SHNI</MenuItem>
                      </TextField>
                    ) : (
                      transaction.applicationType
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="saudaDate"
                        value={editingRow.saudaDate}
                        onChange={handleChange}
                        type="date"
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    ) : (
                      transaction.saudaDate
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="price"
                        value={editingRow.price}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        size="small"
                      />
                    ) : (
                      transaction.price
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="quantity"
                        value={editingRow.quantity}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        size="small"
                      />
                    ) : (
                      transaction.quantity
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <TextField
                        name="tradeType"
                        value={editingRow.tradeType}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="Buy">Buy</MenuItem>
                        <MenuItem value="Sell">Sell</MenuItem>
                      </TextField>
                    ) : (
                      transaction.tradeType
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow && editingRow.id === transaction.id ? (
                      <IconButton onClick={() => handleSave(transaction.id)}>
                        <Save />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(transaction)}>
                        <Edit />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default withAuthorization(AllTransactions, ["staff"]);
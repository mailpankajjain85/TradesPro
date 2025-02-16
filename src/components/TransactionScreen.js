import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";
import withAuthorization from "./withAuthorization"; // Import the HOC
const TransactionScreen = () => {
  // State to manage form inputs
  const [transaction, setTransaction] = useState({
    customerName: "Pankaj", // Default customer name
    ipoName: "Sanathan", // Default IPO name
    buySell: "Buy", // Default Buy/Sell
    tradeType: "Shares", // Default Trade Type
    quantity: "",
    price: "",
  });

  // State to manage list of transactions
  const [transactions, setTransactions] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new transaction to the list
    setTransactions([...transactions, transaction]);
    // Clear the form
    setTransaction({
      customerName: "Pankaj",
      ipoName: "Sanathan",
      buySell: "Buy",
      tradeType: "Shares",
      quantity: "",
      price: "",
    });
  };

  return (
    <div>
      {/* Transaction Form and Table */}
      <Container style={{ marginTop: "20px" }}>
        {/* Transaction Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Customer Name */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Customer Name"
                name="customerName"
                value={transaction.customerName}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <MenuItem value="Pankaj">Pankaj</MenuItem>
                <MenuItem value="Piyush">Piyush</MenuItem>
                <MenuItem value="Tanish">Tanish</MenuItem>
                <MenuItem value="Samyak">Samyak</MenuItem>
              </TextField>
            </Grid>

            {/* IPO Name */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="IPO Name"
                name="ipoName"
                value={transaction.ipoName}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <MenuItem value="Sanathan">Sanathan</MenuItem>
                <MenuItem value="Transrail">Transrail</MenuItem>
                <MenuItem value="Afcon">Afcon</MenuItem>
              </TextField>
            </Grid>

            {/* Buy/Sell */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Buy/Sell"
                name="buySell"
                value={transaction.buySell}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
              </TextField>
            </Grid>

            {/* Trade Type */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Trade Type"
                name="tradeType"
                value={transaction.tradeType}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <MenuItem value="Shares">Shares</MenuItem>
                <MenuItem value="SubjectTo">SubjectTo</MenuItem>
                <MenuItem value="Application">Application</MenuItem>
              </TextField>
            </Grid>

            {/* Quantity */}
            <Grid item xs={12} sm={6} md={1}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={transaction.quantity}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6} md={1}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={transaction.price}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sm={6} md={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Transaction
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Transaction Table */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>IPO Name</TableCell>
                <TableCell>Buy/Sell</TableCell>
                <TableCell>Trade Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t, index) => (
                <TableRow key={index}>
                  <TableCell>{t.customerName}</TableCell>
                  <TableCell>{t.ipoName}</TableCell>
                  <TableCell>{t.buySell}</TableCell>
                  <TableCell>{t.tradeType}</TableCell>
                  <TableCell>{t.quantity}</TableCell>
                  <TableCell>{t.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
export default withAuthorization(TransactionScreen, ["admin", "user"]);
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
  Grid2
  
} from "@mui/material";
// Import menu icon
import Header from "./Header";
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
      <Header />
      
      {/* Transaction Form and Table */}
      <Container style={{ marginTop: "20px" }}>
        {/* Transaction Form */}
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {/* Customer Name */}
            <Grid2 item xs={12} sm={6} md={3}>
              <TextField
                label="Customer Name"
                name="customerName"
                value={transaction.customerName}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <option value="Pankaj">Pankaj</option>
                <option value="Piyush">Piyush</option>
                <option value="Tanish">Tanish</option>
                <option value="Samyak">Samyak</option>
              </TextField>
            </Grid2>

            {/* IPO Name */}
            <Grid2 item xs={12} sm={6} md={3}>
              <TextField
                label="IPO Name"
                name="ipoName"
                value={transaction.ipoName}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <option value="Sanathan">Sanathan</option>
                <option value="Transrail">Transrail</option>
                <option value="Afcon">Afcon</option>
              </TextField>
            </Grid2>

            {/* Buy/Sell */}
            <Grid2 item xs={12} sm={6} md={2}>
              <TextField
                label="Buy/Sell"
                name="buySell"
                value={transaction.buySell}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </TextField>
            </Grid2>

            {/* Trade Type */}
            <Grid2 item xs={12} sm={6} md={2}>
              <TextField
                label="Trade Type"
                name="tradeType"
                value={transaction.tradeType}
                onChange={handleInputChange}
                select
                fullWidth
                required
              >
                <option value="Shares">Shares</option>
                <option value="SubjectTo">SubjectTo</option>
                <option value="Application">Application</option>
              </TextField>
            </Grid2>

            {/* Quantity */}
            <Grid2 item xs={12} sm={6} md={1}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={transaction.quantity}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid2>

            {/* Price */}
            <Grid2 item xs={12} sm={6} md={1}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={transaction.price}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 item xs={12} sm={6} md={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Transaction
              </Button>
            </Grid2>
          </Grid2>
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

export default TransactionScreen;
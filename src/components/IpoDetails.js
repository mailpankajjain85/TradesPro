import React from "react";
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
} from "@mui/material";
import Header from "./Header"; 
const IpoDetails = () => {
  // Sample IPO data
  const ipos = [
    { id: 1, name: "Sanathan", issuePrice: 100, lotSize: 50 },
    { id: 2, name: "Transrail", issuePrice: 150, lotSize: 100 },
    { id: 3, name: "Afcon", issuePrice: 200, lotSize: 75 },
  ];

  return (
    <div>
      <Header />
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        IPO Details
      </Typography>

      {/* IPO Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Issue Price</TableCell>
              <TableCell>Lot Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ipos.map((ipo) => (
              <TableRow key={ipo.id}>
                <TableCell>{ipo.id}</TableCell>
                <TableCell>{ipo.name}</TableCell>
                <TableCell>{ipo.issuePrice}</TableCell>
                <TableCell>{ipo.lotSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
};

export default IpoDetails;
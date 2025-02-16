import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import withAuthorization from "./withAuthorization"; // Import the HOC
const IpoStatusDashboard = () => {
  // Sample IPO data
  const ipos = [
    {
      id: 1,
      name: "Sanathan",
      profit: 5000, // Total profit booked so far
      shares: 150, // Open positions for Shares (positive or negative)
      averagePriceShares: 120, // Average price for Shares
      application: { retail: 200, smallHni: 100, bigHni: 50 }, // Application breakdown
      averagePriceApplication: { retail: 110, smallHni: 115, bigHni: 118 }, // Average price for Application
      subjectToSauda: { retail: 150, smallHni: 75, bigHni: 30 }, // Subject to Sauda breakdown
      averagePriceSubjectToSauda: { retail: 105, smallHni: 108, bigHni: 110 }, // Average price for Subject to Sauda
    },
    {
      id: 2,
      name: "Transrail",
      profit: 3000, // Total profit booked so far
      shares: -80, // Negative open positions for Shares
      averagePriceShares: 115, // Average price for Shares
      application: { retail: 180, smallHni: 90, bigHni: 40 },
      averagePriceApplication: { retail: 112, smallHni: 117, bigHni: 120 },
      subjectToSauda: { retail: 130, smallHni: 65, bigHni: 35 },
      averagePriceSubjectToSauda: { retail: 107, smallHni: 110, bigHni: 113 },
    },
    {
      id: 3,
      name: "Afcon",
      profit: 7000, // Total profit booked so far
      shares: 200, // Positive open positions for Shares
      averagePriceShares: 125, // Average price for Shares
      application: { retail: 150, smallHni: 70, bigHni: 30 },
      averagePriceApplication: { retail: 115, smallHni: 118, bigHni: 122 },
      subjectToSauda: { retail: 100, smallHni: 50, bigHni: 20 },
      averagePriceSubjectToSauda: { retail: 110, smallHni: 112, bigHni: 115 },
    },
  ];

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          IPO Status Dashboard
        </Typography>

        {/* IPO Tiles */}
        <Grid container spacing={3}>
          {ipos.map((ipo) => (
            <Grid item xs={12} sm={6} md={4} key={ipo.id}>
              <Paper style={{ padding: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  {ipo.name}
                </Typography>

                {/* Profit */}
                <Typography variant="body1" gutterBottom>
                  Total Profit Booked: {ipo.profit}
                </Typography>

                {/* Shares */}
                <Typography variant="subtitle1" gutterBottom>
                  Shares
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: ipo.shares >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  Open Positions: {ipo.shares}
                </Typography>
                <Typography variant="body2">
                  Average Price: {ipo.averagePriceShares}
                </Typography>

                {/* Application */}
                <Typography variant="subtitle1" gutterBottom style={{ marginTop: "10px" }}>
                  Application
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Retail</TableCell>
                      <TableCell>{ipo.application.retail}</TableCell>
                      <TableCell>Avg Price: {ipo.averagePriceApplication.retail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Small HNI</TableCell>
                      <TableCell>{ipo.application.smallHni}</TableCell>
                      <TableCell>Avg Price: {ipo.averagePriceApplication.smallHni}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Big HNI</TableCell>
                      <TableCell>{ipo.application.bigHni}</TableCell>
                      <TableCell>Avg Price: {ipo.averagePriceApplication.bigHni}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Subject to Sauda */}
                <Typography variant="subtitle1" gutterBottom style={{ marginTop: "10px" }}>
                  Subject to Sauda
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Retail</TableCell>
                      <TableCell>{ipo.subjectToSauda.retail}</TableCell>
                      <TableCell>Avg Price: {ipo.averagePriceSubjectToSauda.retail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Small HNI</TableCell>
                      <TableCell>{ipo.subjectToSauda.smallHni}</TableCell>
                      <TableCell>Avg Price: {ipo.averagePriceSubjectToSauda.smallHni}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Big HNI</TableCell>
                      <TableCell>{ipo.subjectToSauda.bigHni}</TableCell>
                      <TableCell>Avg Price: {ipo.averagePriceSubjectToSauda.bigHni}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default withAuthorization(IpoStatusDashboard, ["admin", "user"]);
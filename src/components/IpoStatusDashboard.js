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

const IpoStatusDashboard = () => {
  // Sample IPO data
  const ipos = [
    {
      id: 1,
      name: "Sanathan",
      shares: 150, // Open positions for Shares (positive or negative)
      application: { retail: 200, smallHni: 100, bigHni: 50 }, // Application breakdown
      subjectToSauda: { retail: 150, smallHni: 75, bigHni: 30 }, // Subject to Sauda breakdown
    },
    {
      id: 2,
      name: "Transrail",
      shares: -80, // Negative open positions for Shares
      application: { retail: 180, smallHni: 90, bigHni: 40 },
      subjectToSauda: { retail: 130, smallHni: 65, bigHni: 35 },
    },
    {
      id: 3,
      name: "Afcon",
      shares: 200, // Positive open positions for Shares
      application: { retail: 150, smallHni: 70, bigHni: 30 },
      subjectToSauda: { retail: 100, smallHni: 50, bigHni: 20 },
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

                {/* Application */}
                <Typography variant="subtitle1" gutterBottom style={{ marginTop: "10px" }}>
                  Application
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Retail</TableCell>
                      <TableCell>{ipo.application.retail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Small HNI</TableCell>
                      <TableCell>{ipo.application.smallHni}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Big HNI</TableCell>
                      <TableCell>{ipo.application.bigHni}</TableCell>
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
                    </TableRow>
                    <TableRow>
                      <TableCell>Small HNI</TableCell>
                      <TableCell>{ipo.subjectToSauda.smallHni}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Big HNI</TableCell>
                      <TableCell>{ipo.subjectToSauda.bigHni}</TableCell>
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

export default IpoStatusDashboard;
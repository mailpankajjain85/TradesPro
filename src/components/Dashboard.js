import React from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Sample data for the chart
  const data = [
    { name: "Pankaj", trades: 10 },
    { name: "Piyush", trades: 15 },
    { name: "Tanish", trades: 8 },
    { name: "Samyak", trades: 12 },
  ];

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6">Total Trades</Typography>
              <Typography variant="h4">45</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">4</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6">Total IPOs</Typography>
              <Typography variant="h4">3</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6">Total Profit</Typography>
              <Typography variant="h4">₹10,000</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Chart */}
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Trades by Customer
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trades" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default Dashboard;
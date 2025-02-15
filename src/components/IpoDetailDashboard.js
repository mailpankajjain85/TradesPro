import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

const initialIpos = [
  { id: 1, name: 'Sanathan' },
  { id: 2, name: 'Transrail' },
  { id: 3, name: 'Afcon' },
];

const IpoDetailDashboard = () => {
  const [selectedIpo, setSelectedIpo] = useState('');
  const [expectedListingPrice, setExpectedListingPrice] = useState(150);
  const [avgSharePerRetailApp, setAvgSharePerRetailApp] = useState(10);
  const [avgSharePerShniApp, setAvgSharePerShniApp] = useState(20);
  const [avgSharePerBhniApp, setAvgSharePerBhniApp] = useState(30);
  const [showDetails, setShowDetails] = useState(false);

  const handleApply = () => {
    setShowDetails(true);
  };

  const calculateExpectedProfit = (shares, avgPrice) => {
    return (expectedListingPrice - avgPrice) * shares;
  };

  const calculateTotalExpectedShares = () => {
    return (
      parseInt(avgSharePerRetailApp || 0) +
      parseInt(avgSharePerShniApp || 0) +
      parseInt(avgSharePerBhniApp || 0)
    );
  };

  const calculateTotalExpectedProfit = () => {
    const totalShares = calculateTotalExpectedShares();
    return totalShares * (expectedListingPrice - avgSharePerRetailApp);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IPO Detail Dashboard
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="IPO Name"
            value={selectedIpo}
            onChange={(e) => setSelectedIpo(e.target.value)}
            select
            fullWidth
          >
            {initialIpos.map((ipo) => (
              <MenuItem key={ipo.id} value={ipo.name}>
                {ipo.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {selectedIpo && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Expected Listing Price"
                value={expectedListingPrice}
                onChange={(e) => setExpectedListingPrice(e.target.value)}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Avg Share per Retail App"
                value={avgSharePerRetailApp}
                onChange={(e) => setAvgSharePerRetailApp(e.target.value)}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Avg Share per SHNI App"
                value={avgSharePerShniApp}
                onChange={(e) => setAvgSharePerShniApp(e.target.value)}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Avg Share per BHNI App"
                value={avgSharePerBhniApp}
                onChange={(e) => setAvgSharePerBhniApp(e.target.value)}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApply}
                fullWidth
              >
                Apply
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      {showDetails && (
        <Grid container spacing={3}>
          {/* Total Profit Booked So Far */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Total Profit Booked So Far
              </Typography>
              <Typography variant="body1">
                {/* Display total profit booked so far */}
                $10,000 {/* Example value */}
              </Typography>
            </Paper>
          </Grid>

          {/* Shares */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Shares
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Outstanding Shares
              </Typography>
              <Typography variant="body1">
                {/* Display outstanding shares */}
                100 {/* Example value */}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(100, 120) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(100, 120)}
              </Typography>
            </Paper>
          </Grid>

          {/* Apps */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Apps
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Retail
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerRetailApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerRetailApp, 100) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(avgSharePerRetailApp, 100)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                SHNI
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerShniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerShniApp, 110) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(avgSharePerShniApp, 110)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                BHNI
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerBhniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerBhniApp, 120) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(avgSharePerBhniApp, 120)}
              </Typography>
            </Paper>
          </Grid>

          {/* Subject to Sauda */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Subject to Sauda
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Retail
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerRetailApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerRetailApp, 100) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(avgSharePerRetailApp, 100)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                SHNI
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerShniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerShniApp, 110) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(avgSharePerShniApp, 110)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                BHNI
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerBhniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerBhniApp, 120) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: {calculateExpectedProfit(avgSharePerBhniApp, 120)}
              </Typography>
            </Paper>
          </Grid>

          {/* Total Expected Shares and Profit */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Total Expected Shares and Profit
              </Typography>
              <Typography variant="body1">
                Total Expected Shares: {calculateTotalExpectedShares()}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateTotalExpectedProfit() >= 0 ? 'green' : 'red',
                }}
              >
                Total Expected Profit: {calculateTotalExpectedProfit()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default IpoDetailDashboard;
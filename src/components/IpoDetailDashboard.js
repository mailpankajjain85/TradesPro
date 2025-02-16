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
  const [expectedPremium, setexpectedPremium] = useState(150);
  const [avgSharePerRetailApp, setAvgSharePerRetailApp] = useState(10);
  const [avgSharePerShniApp, setAvgSharePerShniApp] = useState(20);
  const [avgSharePerBhniApp, setAvgSharePerBhniApp] = useState(30);
  const [numRetailApps] = useState(75);
  const [numShniApps] = useState(36);
  const [numBhniApps] = useState(45);
  const [numBhniSubjTo] = useState(35);
  const [numShniSubjTo] = useState(18);
  const [numRetailSubjTo] = useState(96);
  const [numOutstandingShares] = useState(1600);
  const [showDetails, setShowDetails] = useState(false);

  const handleApply = () => {
    setShowDetails(true);
  };

  const calculateExpectedProfit = (shares, numberOfApps = 1) => {
    return (expectedPremium) * shares * numberOfApps;
  };

  const calculateTotalExpectedShares = () => {
    return (
      parseInt(avgSharePerRetailApp * numRetailApps || 0) +
      parseInt(avgSharePerShniApp * numShniApps || 0) +
      parseInt(avgSharePerBhniApp * numBhniApps || 0) +
      parseInt(avgSharePerRetailApp * numRetailSubjTo || 0) +
      parseInt(avgSharePerShniApp * numShniSubjTo || 0) +
      parseInt(avgSharePerBhniApp * numBhniSubjTo || 0) +
      parseInt(numOutstandingShares || 0)
    );
  };

  const calculateTotalExpectedProfit = () => {
    const totalShares = calculateTotalExpectedShares();
    return totalShares * (expectedPremium);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IPO Detail Dashboard
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="IPO Name"
            value={selectedIpo}
            onChange={(e) => setSelectedIpo(e.target.value)}
            select
            fullWidth
            size="small"
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
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Expected Listing Price"
                value={expectedPremium}
                onChange={(e) => setexpectedPremium(e.target.value)}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Avg Share per Retail App"
                value={avgSharePerRetailApp}
                onChange={(e) => setAvgSharePerRetailApp(e.target.value)}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Avg Share per SHNI App"
                value={avgSharePerShniApp}
                onChange={(e) => setAvgSharePerShniApp(e.target.value)}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Avg Share per BHNI App"
                value={avgSharePerBhniApp}
                onChange={(e) => setAvgSharePerBhniApp(e.target.value)}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApply}
                fullWidth
                size="small"
              >
                Filter
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      {showDetails && (
        <Grid container spacing={3}>
          {/* Total Profit Booked So Far and Total Expected Shares */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Total Profit Booked So Far
              </Typography>
              <Typography variant="body1">
                {/* Display total profit booked so far */}
                ₹10,000 {/* Example value */}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
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
                Total Expected Profit: ₹{calculateTotalExpectedProfit()}
              </Typography>
            </Paper>
          </Grid>

          {/* Shares */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Shares
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Outstanding Shares: numOutstandingShares
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(numOutstandingShares) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(numOutstandingShares)}
              </Typography>
            </Paper>
          </Grid>

          {/* Apps */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Apps
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Retail
              </Typography>
              <Typography variant="body1">
                Total Apps: numRetailApps
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerRetailApp * numRetailApps}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerRetailApp , numRetailApps) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(avgSharePerRetailApp , numRetailApps)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                SHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: numShniApps
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerShniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerShniApp, numShniApps) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(avgSharePerShniApp, numShniApps)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                BHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: numBhniApps
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerBhniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerBhniApp, numBhniApps) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(avgSharePerBhniApp, numBhniApps)}
              </Typography>
            </Paper>
          </Grid>

          {/* Subject to Sauda */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Subject to Sauda
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Retail
              </Typography>
              <Typography variant="body1">
                Total Apps: numRetailSubjTo
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerRetailApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerRetailApp, numRetailSubjTo) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(avgSharePerRetailApp, numRetailSubjTo)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                SHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: numShniSubjTo
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerShniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerShniApp, numShniSubjTo) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(avgSharePerShniApp, numShniSubjTo)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                BHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: numBhniSubjTo
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerBhniApp}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: calculateExpectedProfit(avgSharePerBhniApp, numBhniSubjTo) >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{calculateExpectedProfit(avgSharePerBhniApp, numBhniSubjTo)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default IpoDetailDashboard;
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
  const [expectedPremium, setExpectedPremium] = useState(240);
  const [avgSharePerRetailApp, setAvgSharePerRetailApp] = useState(2.08);
  const [avgSharePerShniApp, setAvgSharePerShniApp] = useState(7.11);
  const [avgSharePerBhniApp, setAvgSharePerBhniApp] = useState(24.75);
  const [numRetailApps] = useState(75);
  const [numShniApps] = useState(36);
  const [numBhniApps] = useState(45);
  const [numBhniSubjTo] = useState(35);
  const [numShniSubjTo] = useState(18);
  const [numRetailSubjTo] = useState(96);
  const [numOutstandingShares] = useState(1600);
  const [numAvgShareCostPrice] = useState(218);
  const [numRetailAppsCostAverage] = useState(300);
  const [numShniAppsCostAverage] = useState(1800);
  const [numBhniAppsCostAverage] = useState(8000);
  const [numRetailSubjectToPriceAverage] = useState(200);
  const [numShniSubjectToPriceAverage] = useState(203);
  const [numBhniSubjectToPriceAverage] = useState(208);
  const [showDetails, setShowDetails] = useState(false);

  const handleApply = () => {
    setShowDetails(true);
  };

  const calculateExpectedProfit = (shares, numberOfApps = 1, Cost = 0) => {
    return expectedPremium * shares * numberOfApps - Cost;
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

  const outstandingSharesProfit = calculateExpectedProfit(numOutstandingShares, 1, numOutstandingShares * numAvgShareCostPrice);
  const retailAppsProfit = calculateExpectedProfit(avgSharePerRetailApp, numRetailApps, numRetailAppsCostAverage * numRetailApps);
  const shniAppsProfit = calculateExpectedProfit(avgSharePerShniApp, numShniApps, numShniApps * numShniAppsCostAverage);
  const bhniAppsProfit = calculateExpectedProfit(avgSharePerBhniApp, numBhniApps, numBhniApps * numBhniAppsCostAverage);
  const retailSubjToProfit = calculateExpectedProfit(avgSharePerRetailApp, numRetailSubjTo, avgSharePerRetailApp * numRetailSubjTo * numRetailSubjectToPriceAverage);
  const shniSubjToProfit = calculateExpectedProfit(avgSharePerShniApp, numShniSubjTo, avgSharePerShniApp * numShniSubjTo * numShniSubjectToPriceAverage);
  const bhniSubjToProfit = calculateExpectedProfit(avgSharePerBhniApp, numBhniSubjTo, avgSharePerBhniApp * numBhniSubjTo * numBhniSubjectToPriceAverage);

  const totalExpectedProfit = outstandingSharesProfit + retailAppsProfit + shniAppsProfit + bhniAppsProfit + retailSubjToProfit + shniSubjToProfit + bhniSubjToProfit;

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
                label="Expected Premium"
                value={expectedPremium}
                onChange={(e) => setExpectedPremium(e.target.value)}
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
                Total Expected Shares
              </Typography>
              <Typography variant="body1">
                Total Expected Shares: {calculateTotalExpectedShares()}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: totalExpectedProfit >= 0 ? 'green' : 'red',
                }}
              >
                Total Expected Profit: ₹{totalExpectedProfit}
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
                Outstanding Shares: {numOutstandingShares}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Average Share Cost Price: {numAvgShareCostPrice}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: outstandingSharesProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{outstandingSharesProfit}
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
                Total Apps: {numRetailApps}
              </Typography>
              <Typography variant="body1">
                App Average Cost: {numRetailAppsCostAverage}
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerRetailApp * numRetailApps}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: retailAppsProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{retailAppsProfit}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                SHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: {numShniApps}
              </Typography>
              <Typography variant="body1">
                App Average Cost: {numShniAppsCostAverage}
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerShniApp * numShniApps}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: shniAppsProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{shniAppsProfit}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                BHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: {numBhniApps}
              </Typography>
              <Typography variant="body1">
                App Average Cost: {numBhniAppsCostAverage}
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerBhniApp * numBhniApps}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: bhniAppsProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{bhniAppsProfit}
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
                Total Apps: {numRetailSubjTo}
              </Typography>
              <Typography variant="body1">
                Share Average Cost: {numRetailSubjectToPriceAverage}
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerRetailApp * numRetailSubjTo}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: retailSubjToProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{retailSubjToProfit}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                SHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: {numShniSubjTo}
              </Typography>
              <Typography variant="body1">
                Share Average Cost: {numShniSubjectToPriceAverage}
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerShniApp * numShniSubjTo}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: shniSubjToProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{shniSubjToProfit}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                BHNI
              </Typography>
              <Typography variant="body1">
                Total Apps: {numBhniSubjTo}
              </Typography>
              <Typography variant="body1">
                Share Average Cost: {numBhniSubjectToPriceAverage}
              </Typography>
              <Typography variant="body1">
                Expected Number of Shares: {avgSharePerBhniApp * numBhniSubjTo}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: bhniSubjToProfit >= 0 ? 'green' : 'red',
                }}
              >
                Expected Profit: ₹{bhniSubjToProfit}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default IpoDetailDashboard;
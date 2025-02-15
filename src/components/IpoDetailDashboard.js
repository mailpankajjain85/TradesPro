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
  const [expectedListingPrice, setExpectedListingPrice] = useState('');
  const [avgSharePerRetailApp, setAvgSharePerRetailApp] = useState('');
  const [avgSharePerShniApp, setAvgSharePerShniApp] = useState('');
  const [avgSharePerBhniApp, setAvgSharePerBhniApp] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleApply = () => {
    setShowDetails(true);
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
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Profit Booked So Far
          </Typography>
          <Typography variant="h6" gutterBottom>
            Type of Trade
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Outstanding Shares
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for shares */}
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Apps
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Retail
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Number of Shares: {/* Calculate expected number of shares for retail */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for retail */}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            SHNI
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Number of Shares: {/* Calculate expected number of shares for SHNI */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for SHNI */}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            BHNI
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Number of Shares: {/* Calculate expected number of shares for BHNI */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for BHNI */}
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Subject to Shares
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Retail
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Number of Shares: {/* Calculate expected number of shares for retail subject to */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for retail subject to */}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            SHNI
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Number of Shares: {/* Calculate expected number of shares for SHNI subject to */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for SHNI subject to */}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            BHNI
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Number of Shares: {/* Calculate expected number of shares for BHNI subject to */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expected Profit: {/* Calculate expected profit for BHNI subject to */}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default IpoDetailDashboard;
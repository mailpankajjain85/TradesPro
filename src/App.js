import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import TransactionScreen from "./components/TransactionScreen";
import CustomerDetails from "./components/CustomerDetails";
import IpoDetails from "./components/IpoDetails";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";
import IpoStatusDashboard from "./components/IpoStatusDashboard";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import IpoTransactionPanCardDetails from "./components/IpoTransactionPanCardDetails"; 
import IpoTransactionAllotmentDetails from "./components/IpoTransactionAllotmentDetails"; // Import the new component
import IpoDetailDashboard from "./components/IpoDetailDashboard";
import ClientProfitDashboard from "./components/ClientProfitDashboard";
import ClientOutstandingDashboard from "./components/ClientOutstandingDashboard";
import MoneyTransactions from "./components/MoneyTransactions";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      {loggedInUser && <Header loggedInUser={loggedInUser} />}
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Routes>
              {!loggedInUser && (
                <Route
                  path="/"
                  element={<LoginPage setLoggedInUser={setLoggedInUser} />}
                />
              )}
              {loggedInUser && (
                <>
                  <Route path="/" element={<TransactionScreen />} />
                  <Route path="/customer-details" element={<CustomerDetails />} />
                  <Route path="/ipo-details" element={<IpoDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/all-transactions" element={<AllTransactions />} />
                  <Route path="/ipo-status-dashboard" element={<IpoStatusDashboard />} />
                  <Route path="/ipo-transaction-pan-card-details" element={<IpoTransactionPanCardDetails />} />
                  <Route path="/ipo-transaction-allotment-details" element={<IpoTransactionAllotmentDetails />} />
                  <Route path="/ipo-detail-dashboard" element={<IpoDetailDashboard />} /> {/* Add the new route */}
                  <Route path="/client-profit-dashboard" element={<ClientProfitDashboard />} />
                  <Route path ="/client-outstanding-dashboard" element = {<ClientOutstandingDashboard />} />
                  <Route path ="/money-transactions" element = {<MoneyTransactions />} />
                </>
              )}
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
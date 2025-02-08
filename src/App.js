import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grid2 } from "@mui/material";
import TransactionScreen from "./components/TransactionScreen";
import CustomerDetails from "./components/CustomerDetails";
import IpoDetails from "./components/IpoDetails";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";
import IpoStatusDashboard from "./components/IpoStatusDashboard";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import ResponsiveComponent from "./components/ResponsiveComponent";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      {loggedInUser && <Header loggedInUser={loggedInUser} />}
      <Container>
        <ResponsiveComponent />
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
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
                  <Route
                    path="/ipo-status-dashboard"
                    element={<IpoStatusDashboard />}
                  />
                </>
              )}
            </Routes>
          </Grid2>
        </Grid2>
      </Container>
    </Router>
  );
}

export default App;
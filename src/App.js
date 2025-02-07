import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionScreen from "./components/TransactionScreen";
import CustomerDetails from "./components/CustomerDetails";
import IpoDetails from "./components/IpoDetails";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";
import IpoStatusDashboard from "./components/IpoStatusDashboard";
import LoginPage from "./components/LoginPage"; // Import the LoginPage
import Header from "./components/Header"; // Import the Header

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store the logged-in user

  return (
    <Router>
      {/* Include the Header component and pass the loggedInUser */}
      
      <Routes>
        {/* Show LoginPage if no user is logged in */}
        {!loggedInUser && (
          <Route
            path="/"
            element={<LoginPage setLoggedInUser={setLoggedInUser} />}
          />
        )}
        {/* Protected routes */}
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
    </Router>
  );
}

export default App;
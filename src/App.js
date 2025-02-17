import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import withAuthorization from "./components/withAuthorization";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);


  return (
    <Router>
      <Header loggedInUser={loggedInUser} />
            <Routes>
                  <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
                  <Route path="/all-transactions" element={withAuthorization(AllTransactions, ["staff", "admin", "user"])(loggedInUser)} />
                  <Route path="/" element={withAuthorization(TransactionScreen, ["admin", "user"])(loggedInUser)} />
                  <Route path="/customer-details" element={withAuthorization(CustomerDetails, ["admin", "user"])(loggedInUser)} />
                  <Route path="/ipo-details" element={withAuthorization(IpoDetails, ["admin", "user"])(loggedInUser)} />
                  <Route path="/all-transactions" element={withAuthorization(AllTransactions, ["admin", "user"])(loggedInUser)} />
                  <Route path="/ipo-status-dashboard" element={withAuthorization(IpoStatusDashboard, ["admin", "user"])(loggedInUser)} />
                  <Route path="/ipo-transaction-pan-card-details" element={withAuthorization(IpoTransactionPanCardDetails, ["admin", "user"])(loggedInUser)} />
                  <Route path="/ipo-transaction-allotment-details" element={withAuthorization(IpoTransactionAllotmentDetails, ["admin", "user"])(loggedInUser)} />
                  <Route path="/ipo-detail-dashboard" element={withAuthorization(IpoDetailDashboard, ["admin", "user"])(loggedInUser)} />
                  <Route path="/client-profit-dashboard" element={withAuthorization(ClientProfitDashboard, ["admin", "user"])(loggedInUser)} />
                  <Route path ="/client-outstanding-dashboard" element={withAuthorization(ClientOutstandingDashboard, ["admin", "user"])(loggedInUser)} />
                  <Route path ="/money-transactions" element={withAuthorization(MoneyTransactions, ["admin", "user"])(loggedInUser)} />
                  <Route path="/dashboard" element={withAuthorization(Dashboard, ["admin", "user"])(loggedInUser)} />
            </Routes>
    </Router>
  );
};

export default App;
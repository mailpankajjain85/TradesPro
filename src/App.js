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

  const AuthorizedAllTransactions = withAuthorization(AllTransactions, ["staff", "admin", "user"]);
  const AuthorizedTransactionScreen = withAuthorization(TransactionScreen, ["admin", "user"]);
  const AuthorizedCustomerDetails = withAuthorization(CustomerDetails, ["admin", "user"]);
  const AuthorizedIpoDetails = withAuthorization(IpoDetails, ["admin", "user"]);
  const AuthorizedIpoStatusDashboard = withAuthorization(IpoStatusDashboard, ["admin", "user"]);
  const AuthorizedIpoTransactionPanCardDetails = withAuthorization(IpoTransactionPanCardDetails, ["admin", "user"]);
  const AuthorizedIpoTransactionAllotmentDetails = withAuthorization(IpoTransactionAllotmentDetails, ["admin", "user"]);
  const AuthorizedIpoDetailDashboard = withAuthorization(IpoDetailDashboard, ["admin", "user"]);
  const AuthorizedClientProfitDashboard = withAuthorization(ClientProfitDashboard, ["admin", "user"]);
  const AuthorizedClientOutstandingDashboard = withAuthorization(ClientOutstandingDashboard, ["admin", "user"]);
  const AuthorizedMoneyTransactions = withAuthorization(MoneyTransactions, ["admin", "user"]);
  const AuthorizedDashboard = withAuthorization(Dashboard, ["admin", "user"]);

  return (
    <Router>
      <Header loggedInUser={loggedInUser} />
      <Routes>
        <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/all-transactions" element={<AuthorizedAllTransactions loggedInUser={loggedInUser} />} />
        <Route path="/" element={<AuthorizedTransactionScreen loggedInUser={loggedInUser} />} />
        <Route path="/customer-details" element={<AuthorizedCustomerDetails loggedInUser={loggedInUser} />} />
        <Route path="/ipo-details" element={<AuthorizedIpoDetails loggedInUser={loggedInUser} />} />
        <Route path="/ipo-status-dashboard" element={<AuthorizedIpoStatusDashboard loggedInUser={loggedInUser} />} />
        <Route path="/ipo-transaction-pan-card-details" element={<AuthorizedIpoTransactionPanCardDetails loggedInUser={loggedInUser} />} />
        <Route path="/ipo-transaction-allotment-details" element={<AuthorizedIpoTransactionAllotmentDetails loggedInUser={loggedInUser} />} />
        <Route path="/ipo-detail-dashboard" element={<AuthorizedIpoDetailDashboard loggedInUser={loggedInUser} />} />
        <Route path="/client-profit-dashboard" element={<AuthorizedClientProfitDashboard loggedInUser={loggedInUser} />} />
        <Route path="/client-outstanding-dashboard" element={<AuthorizedClientOutstandingDashboard loggedInUser={loggedInUser} />} />
        <Route path="/money-transactions" element={<AuthorizedMoneyTransactions loggedInUser={loggedInUser} />} />
        <Route path="/dashboard" element={<AuthorizedDashboard loggedInUser={loggedInUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
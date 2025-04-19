import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import TradingView from './components/Trading/TradingView';
import Portfolio from './components/Portfolio/Portfolio';
import MarketData from './components/Market/MarketData';
import AuthPage from './pages/AuthPage';
import { ProtectedRoute } from './lib/protected-route';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { queryClient } from './lib/queryClient';
import './styles/App.css';

// Component for protected dashboard route
const DashboardRoute = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <Dashboard user={user} />
    </ProtectedRoute>
  );
};

// Component for protected trading route
const TradingRoute = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <TradingView user={user} />
    </ProtectedRoute>
  );
};

// Component for protected portfolio route
const PortfolioRoute = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <Portfolio user={user} />
    </ProtectedRoute>
  );
};

// Component for protected market data route
const MarketRoute = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <MarketData />
    </ProtectedRoute>
  );
};

// Home route with redirect logic
const HomeRoute = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />;
};

// NavbarWithAuth component to inject auth context
const NavbarWithAuth = () => {
  const { user, isLoading } = useAuth();
  return <Navbar isAuthenticated={!!user} user={user} />;
};

function AppContent() {
  return (
    <div className="app-container">
      <NavbarWithAuth />
      <main className="main-content">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/trading" element={<TradingRoute />} />
          <Route path="/portfolio" element={<PortfolioRoute />} />
          <Route path="/market" element={<MarketRoute />} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

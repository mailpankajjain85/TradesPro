import React, { useState, useEffect } from 'react';
import { fetchPortfolio, fetchTransactionHistory } from '../../services/api';
import Chart from 'chart.js/auto';

function Portfolio({ user }) {
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('holdings');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [filterTransactionType, setFilterTransactionType] = useState('all');
  const [sortOrder, setSortOrder] = useState({ field: 'symbol', direction: 'asc' });
  
  // Fetch portfolio data
  useEffect(() => {
    const getPortfolioData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch portfolio data
        const portfolioData = await fetchPortfolio();
        setPortfolio(portfolioData);
        
        // Fetch transaction history
        const transactionData = await fetchTransactionHistory();
        setTransactions(transactionData);
        
        // Create portfolio allocation chart
        if (portfolioData && portfolioData.holdings.length > 0) {
          createAllocationChart(portfolioData.holdings);
        }
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getPortfolioData();
  }, []);
  
  // Create the portfolio allocation chart
  const createAllocationChart = (holdings) => {
    const ctx = document.getElementById('allocationChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    
    // Prepare data for the chart
    const labels = holdings.map(item => item.symbol);
    const data = holdings.map(item => item.marketValue);
    
    // Generate dynamic colors
    const backgroundColors = [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(199, 199, 199, 0.8)',
      'rgba(83, 102, 255, 0.8)',
      'rgba(40, 159, 64, 0.8)',
      'rgba(210, 99, 132, 0.8)'
    ];
    
    // Create the chart
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };
  
  // Filter transactions based on selected filters
  const getFilteredTransactions = () => {
    if (!transactions) return [];
    
    let filtered = [...transactions];
    
    // Filter by date range
    if (filterDateRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (filterDateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate = new Date(now);
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        filtered = filtered.filter(transaction => new Date(transaction.date) >= startDate);
      }
    }
    
    // Filter by transaction type
    if (filterTransactionType !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === filterTransactionType);
    }
    
    // Sort transactions
    filtered.sort((a, b) => {
      let fieldA = a[sortOrder.field];
      let fieldB = b[sortOrder.field];
      
      // Handle date field specifically
      if (sortOrder.field === 'date') {
        fieldA = new Date(fieldA);
        fieldB = new Date(fieldB);
      }
      
      if (fieldA < fieldB) {
        return sortOrder.direction === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return filtered;
  };
  
  // Handle sort change
  const handleSort = (field) => {
    setSortOrder({
      field,
      direction: sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc'
    });
  };
  
  if (loading) {
    return (
      <div className="portfolio-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading portfolio data...</span>
        </div>
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-error alert alert-danger">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
        <button 
          className="btn btn-outline-danger mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Portfolio Summary</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="summary-item">
                    <h6 className="text-muted">Total Value</h6>
                    <h3>${portfolio?.totalValue.toFixed(2) || '0.00'}</h3>
                    <p className={`change-indicator ${portfolio?.totalChange >= 0 ? 'positive' : 'negative'}`}>
                      <i className={`fas fa-arrow-${portfolio?.totalChange >= 0 ? 'up' : 'down'} me-1`}></i>
                      {Math.abs(portfolio?.totalChange || 0).toFixed(2)}% overall
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="summary-item">
                    <h6 className="text-muted">Day's Gain/Loss</h6>
                    <h3 className={portfolio?.dayChange >= 0 ? 'text-success' : 'text-danger'}>
                      {portfolio?.dayChange >= 0 ? '+' : '-'}${Math.abs(portfolio?.dayGainLoss || 0).toFixed(2)}
                    </h3>
                    <p className={`change-indicator ${portfolio?.dayChange >= 0 ? 'positive' : 'negative'}`}>
                      <i className={`fas fa-arrow-${portfolio?.dayChange >= 0 ? 'up' : 'down'} me-1`}></i>
                      {Math.abs(portfolio?.dayChange || 0).toFixed(2)}% today
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="summary-item">
                    <h6 className="text-muted">Cash Balance</h6>
                    <h3>${portfolio?.cashBalance.toFixed(2) || '0.00'}</h3>
                    <p className="text-muted">Available for trading</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="summary-item">
                    <h6 className="text-muted">Number of Positions</h6>
                    <h3>{portfolio?.holdings.length || 0}</h3>
                    <p className="text-muted">Across {portfolio?.holdingsByCategory.length || 0} sectors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'holdings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('holdings')}
                  >
                    Holdings
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('transactions')}
                  >
                    Transactions
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body p-0">
              {activeTab === 'holdings' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
                          Symbol
                          {sortOrder.field === 'symbol' && (
                            <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                          )}
                        </th>
                        <th>Name</th>
                        <th onClick={() => handleSort('quantity')} style={{ cursor: 'pointer' }}>
                          Quantity
                          {sortOrder.field === 'quantity' && (
                            <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                          )}
                        </th>
                        <th onClick={() => handleSort('averageCost')} style={{ cursor: 'pointer' }}>
                          Avg Cost
                          {sortOrder.field === 'averageCost' && (
                            <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                          )}
                        </th>
                        <th onClick={() => handleSort('currentPrice')} style={{ cursor: 'pointer' }}>
                          Current Price
                          {sortOrder.field === 'currentPrice' && (
                            <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                          )}
                        </th>
                        <th onClick={() => handleSort('marketValue')} style={{ cursor: 'pointer' }}>
                          Market Value
                          {sortOrder.field === 'marketValue' && (
                            <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                          )}
                        </th>
                        <th onClick={() => handleSort('gainLoss')} style={{ cursor: 'pointer' }}>
                          Gain/Loss
                          {sortOrder.field === 'gainLoss' && (
                            <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio && portfolio.holdings.length > 0 ? (
                        portfolio.holdings.map((holding, index) => (
                          <tr key={index}>
                            <td>{holding.symbol}</td>
                            <td>{holding.name}</td>
                            <td>{holding.quantity}</td>
                            <td>${holding.averageCost.toFixed(2)}</td>
                            <td>${holding.currentPrice.toFixed(2)}</td>
                            <td>${holding.marketValue.toFixed(2)}</td>
                            <td className={holding.gainLossPercent >= 0 ? 'text-success' : 'text-danger'}>
                              ${Math.abs(holding.gainLoss).toFixed(2)} ({holding.gainLossPercent >= 0 ? '+' : '-'}{Math.abs(holding.gainLossPercent).toFixed(2)}%)
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <i className="fas fa-folder-open text-muted mb-2 fs-3"></i>
                            <p className="mb-0">No holdings in your portfolio</p>
                            <button className="btn btn-primary btn-sm mt-2">Start Trading</button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'transactions' && (
                <>
                  <div className="p-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                      <select 
                        className="form-select form-select-sm" 
                        value={filterDateRange}
                        onChange={(e) => setFilterDateRange(e.target.value)}
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="year">Last Year</option>
                      </select>
                      <select 
                        className="form-select form-select-sm" 
                        value={filterTransactionType}
                        onChange={(e) => setFilterTransactionType(e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="BUY">Buy</option>
                        <option value="SELL">Sell</option>
                      </select>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                            Date
                            {sortOrder.field === 'date' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                          <th onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
                            Symbol
                            {sortOrder.field === 'symbol' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                          <th onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>
                            Type
                            {sortOrder.field === 'type' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                          <th onClick={() => handleSort('quantity')} style={{ cursor: 'pointer' }}>
                            Quantity
                            {sortOrder.field === 'quantity' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                          <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                            Price
                            {sortOrder.field === 'price' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                          <th onClick={() => handleSort('total')} style={{ cursor: 'pointer' }}>
                            Total
                            {sortOrder.field === 'total' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                          <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                            Status
                            {sortOrder.field === 'status' && (
                              <i className={`fas fa-sort-${sortOrder.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredTransactions().length > 0 ? (
                          getFilteredTransactions().map((transaction, index) => (
                            <tr key={index}>
                              <td>{new Date(transaction.date).toLocaleDateString()}</td>
                              <td>{transaction.symbol}</td>
                              <td>
                                <span className={`badge ${transaction.type === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                                  {transaction.type}
                                </span>
                              </td>
                              <td>{transaction.quantity}</td>
                              <td>${transaction.price.toFixed(2)}</td>
                              <td>${(transaction.price * transaction.quantity).toFixed(2)}</td>
                              <td>
                                <span className={`badge bg-${
                                  transaction.status === 'COMPLETED' ? 'success' :
                                  transaction.status === 'PENDING' ? 'warning' : 'danger'
                                }`}>
                                  {transaction.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-4">
                              <i className="fas fa-exchange-alt text-muted mb-2 fs-3"></i>
                              <p className="mb-0">No transactions found</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Portfolio Allocation</h5>
            </div>
            <div className="card-body">
              {portfolio && portfolio.holdings.length > 0 ? (
                <canvas id="allocationChart" height="250"></canvas>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-chart-pie fs-3 text-muted mb-3"></i>
                  <p>No holdings to display allocation chart</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Performance by Sector</h5>
            </div>
            <div className="card-body p-0">
              {portfolio && portfolio.holdingsByCategory && portfolio.holdingsByCategory.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {portfolio.holdingsByCategory.map((category, index) => (
                    <li key={index} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">{category.name}</h6>
                          <small className="text-muted">{category.holdings} holdings</small>
                        </div>
                        <div className="text-end">
                          <div>${category.marketValue.toFixed(2)}</div>
                          <div className={`small ${category.performance >= 0 ? 'text-success' : 'text-danger'}`}>
                            <i className={`fas fa-arrow-${category.performance >= 0 ? 'up' : 'down'} me-1`}></i>
                            {Math.abs(category.performance).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="progress mt-2" style={{ height: '6px' }}>
                        <div 
                          className={`progress-bar ${category.performance >= 3 ? 'bg-success' : category.performance <= -3 ? 'bg-danger' : 'bg-warning'}`}
                          role="progressbar" 
                          style={{ width: `${Math.min(Math.abs(category.performance) * 5, 100)}%` }}
                          aria-valuenow={Math.abs(category.performance) * 5}
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-industry fs-3 text-muted mb-3"></i>
                  <p>No sector data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;

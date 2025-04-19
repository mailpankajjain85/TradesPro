import React, { useState, useEffect } from 'react';
import { fetchMarketSummary, fetchSectorPerformance, fetchMarketMovers } from '../../services/api';
import Chart from 'chart.js/auto';

function MarketData() {
  const [marketSummary, setMarketSummary] = useState([]);
  const [sectorPerformance, setSectorPerformance] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [mostActive, setMostActive] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'ascending' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch market data
  useEffect(() => {
    const getMarketData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch market summary
        const summary = await fetchMarketSummary();
        setMarketSummary(summary);
        setFilteredMarkets(summary);
        
        // Fetch sector performance
        const sectors = await fetchSectorPerformance();
        setSectorPerformance(sectors);
        
        // Fetch market movers
        const movers = await fetchMarketMovers();
        setTopGainers(movers.gainers);
        setTopLosers(movers.losers);
        setMostActive(movers.mostActive);
        
        // Create sector performance chart
        createSectorChart(sectors);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getMarketData();
  }, []);
  
  // Create sector performance chart
  const createSectorChart = (sectors) => {
    const ctx = document.getElementById('sectorChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    
    // Prepare data for the chart
    const labels = sectors.map(sector => sector.name);
    const data = sectors.map(sector => sector.percentChange);
    const colors = data.map(value => 
      value >= 3 ? 'rgba(40, 167, 69, 0.7)' :
      value >= 0 ? 'rgba(40, 167, 69, 0.5)' :
      value >= -3 ? 'rgba(220, 53, 69, 0.5)' :
      'rgba(220, 53, 69, 0.7)'
    );
    
    // Create the chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sector Performance (%)',
          data: data,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.5', '1').replace('0.7', '1')),
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toFixed(2)}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  };
  
  // Handle search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredMarkets(marketSummary);
    } else {
      const filtered = marketSummary.filter(item => 
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMarkets(filtered);
    }
  }, [searchQuery, marketSummary]);
  
  // Handle sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    setFilteredMarkets(prev => {
      const sortedData = [...prev];
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      return sortedData;
    });
  };
  
  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="market-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading market data...</span>
        </div>
        <p>Loading market data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-error alert alert-danger">
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
    <div className="market-data-container">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Market Overview</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {marketSummary.slice(0, 4).map((index, i) => (
                  <div key={i} className="col-md-3">
                    <div className="market-index-card">
                      <h5>{index.name}</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>{index.price.toFixed(2)}</h3>
                        <span className={`badge ${index.change >= 0 ? 'bg-success' : 'bg-danger'}`}>
                          {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="small text-muted">Volume: {index.volume.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Sector Performance</h5>
            </div>
            <div className="card-body">
              <canvas id="sectorChart" height="300"></canvas>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="gainers-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#gainers"
                    type="button"
                    role="tab"
                    aria-controls="gainers"
                    aria-selected="true"
                  >
                    Top Gainers
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="losers-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#losers"
                    type="button"
                    role="tab"
                    aria-controls="losers"
                    aria-selected="false"
                  >
                    Top Losers
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="active-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#active"
                    type="button"
                    role="tab"
                    aria-controls="active"
                    aria-selected="false"
                  >
                    Most Active
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="gainers"
                  role="tabpanel"
                  aria-labelledby="gainers-tab"
                >
                  <ul className="list-group list-group-flush">
                    {topGainers.map((stock, index) => (
                      <li key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{stock.symbol}</strong>
                            <div className="small text-muted">{stock.name}</div>
                          </div>
                          <div className="text-end">
                            <div>${stock.price.toFixed(2)}</div>
                            <div className="text-success">
                              +{stock.change.toFixed(2)} (+{stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="losers"
                  role="tabpanel"
                  aria-labelledby="losers-tab"
                >
                  <ul className="list-group list-group-flush">
                    {topLosers.map((stock, index) => (
                      <li key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{stock.symbol}</strong>
                            <div className="small text-muted">{stock.name}</div>
                          </div>
                          <div className="text-end">
                            <div>${stock.price.toFixed(2)}</div>
                            <div className="text-danger">
                              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="active"
                  role="tabpanel"
                  aria-labelledby="active-tab"
                >
                  <ul className="list-group list-group-flush">
                    {mostActive.map((stock, index) => (
                      <li key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{stock.symbol}</strong>
                            <div className="small text-muted">{stock.name}</div>
                          </div>
                          <div className="text-end">
                            <div>${stock.price.toFixed(2)}</div>
                            <div className={stock.change >= 0 ? 'text-success' : 'text-danger'}>
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Stock Watch</h5>
              <div className="d-flex align-items-center">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search symbol or name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th onClick={() => requestSort('symbol')} style={{ cursor: 'pointer' }}>
                        Symbol {getSortDirectionIndicator('symbol')}
                      </th>
                      <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                        Name {getSortDirectionIndicator('name')}
                      </th>
                      <th onClick={() => requestSort('price')} style={{ cursor: 'pointer' }}>
                        Price {getSortDirectionIndicator('price')}
                      </th>
                      <th onClick={() => requestSort('change')} style={{ cursor: 'pointer' }}>
                        Change {getSortDirectionIndicator('change')}
                      </th>
                      <th onClick={() => requestSort('changePercent')} style={{ cursor: 'pointer' }}>
                        % Change {getSortDirectionIndicator('changePercent')}
                      </th>
                      <th onClick={() => requestSort('volume')} style={{ cursor: 'pointer' }}>
                        Volume {getSortDirectionIndicator('volume')}
                      </th>
                      <th onClick={() => requestSort('marketCap')} style={{ cursor: 'pointer' }}>
                        Market Cap {getSortDirectionIndicator('marketCap')}
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMarkets.map((stock, index) => (
                      <tr key={index}>
                        <td><strong>{stock.symbol}</strong></td>
                        <td>{stock.name}</td>
                        <td>${stock.price.toFixed(2)}</td>
                        <td className={stock.change >= 0 ? 'text-success' : 'text-danger'}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </td>
                        <td className={stock.changePercent >= 0 ? 'text-success' : 'text-danger'}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </td>
                        <td>{stock.volume.toLocaleString()}</td>
                        <td>
                          {stock.marketCap >= 1000000000000
                            ? `$${(stock.marketCap / 1000000000000).toFixed(2)}T`
                            : stock.marketCap >= 1000000000
                            ? `$${(stock.marketCap / 1000000000).toFixed(2)}B`
                            : `$${(stock.marketCap / 1000000).toFixed(2)}M`
                          }
                        </td>
                        <td>
                          <div className="btn-group">
                            <a href="#" className="btn btn-sm btn-outline-primary">
                              <i className="fas fa-chart-line"></i>
                            </a>
                            <a href="#" className="btn btn-sm btn-outline-success">
                              <i className="fas fa-plus"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {filteredMarkets.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          {searchQuery ? (
                            <>
                              <i className="fas fa-search fs-3 text-muted mb-3"></i>
                              <p>No stocks found matching "{searchQuery}"</p>
                            </>
                          ) : (
                            <>
                              <i className="fas fa-database fs-3 text-muted mb-3"></i>
                              <p>No market data available</p>
                            </>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketData;

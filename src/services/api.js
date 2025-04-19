/**
 * API service for TradesPro application
 * Handles data fetching from backend services
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Helper function for making authenticated API requests
const fetchWithAuth = async (endpoint, options = {}) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'An unknown error occurred' };
      });
      
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Fetch account summary data for dashboard
 */
export const fetchAccountSummary = async () => {
  try {
    const data = await fetchWithAuth('/account/summary');
    return data;
  } catch (error) {
    // For development, return mock data if API is not available
    console.warn('Using fallback account summary data due to API error');
    return {
      balance: 25000.75,
      balanceChange: 1.2,
      portfolioValue: 42568.33,
      portfolioChange: -0.5,
      openPositions: 12,
      activeMarkets: 8,
      todayPL: 523.45,
      todayTrades: 5,
      portfolioHistory: {
        dates: Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        }),
        values: Array.from({ length: 30 }, (_, i) => {
          // Generate a somewhat realistic portfolio value progression
          const baseValue = 40000;
          const volatility = 500;
          const trend = 50;
          return baseValue + trend * i + volatility * (Math.random() - 0.5);
        })
      }
    };
  }
};

/**
 * Fetch recent trades data
 */
export const fetchRecentTrades = async () => {
  try {
    const data = await fetchWithAuth('/trades/recent');
    return data;
  } catch (error) {
    console.warn('Using fallback recent trades data due to API error');
    return [
      {
        date: '2023-09-15T10:30:00Z',
        symbol: 'AAPL',
        type: 'BUY',
        quantity: 10,
        price: 175.82,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-14T14:25:00Z',
        symbol: 'MSFT',
        type: 'SELL',
        quantity: 5,
        price: 320.65,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-14T09:45:00Z',
        symbol: 'GOOGL',
        type: 'BUY',
        quantity: 3,
        price: 138.50,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-13T15:10:00Z',
        symbol: 'TSLA',
        type: 'BUY',
        quantity: 8,
        price: 245.32,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-12T11:05:00Z',
        symbol: 'AMZN',
        type: 'SELL',
        quantity: 4,
        price: 139.75,
        status: 'COMPLETED'
      }
    ];
  }
};

/**
 * Fetch market summary data
 */
export const fetchMarketSummary = async () => {
  try {
    const data = await fetchWithAuth('/market/summary');
    return data;
  } catch (error) {
    console.warn('Using fallback market summary data due to API error');
    return [
      {
        symbol: 'SPY',
        name: 'S&P 500 ETF Trust',
        price: 450.23,
        change: 1.25,
        changePercent: 0.28,
        volume: 58000000,
        marketCap: 400000000000
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.82,
        change: -0.45,
        changePercent: -0.26,
        volume: 52000000,
        marketCap: 2750000000000
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 320.65,
        change: 2.35,
        changePercent: 0.74,
        volume: 25000000,
        marketCap: 2400000000000
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 138.50,
        change: 0.75,
        changePercent: 0.55,
        volume: 18000000,
        marketCap: 1780000000000
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com, Inc.',
        price: 139.75,
        change: -1.25,
        changePercent: -0.89,
        volume: 35000000,
        marketCap: 1450000000000
      },
      {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 245.32,
        change: 5.23,
        changePercent: 2.18,
        volume: 120000000,
        marketCap: 780000000000
      },
      {
        symbol: 'META',
        name: 'Meta Platforms, Inc.',
        price: 315.45,
        change: 3.72,
        changePercent: 1.19,
        volume: 22000000,
        marketCap: 810000000000
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 425.75,
        change: 10.25,
        changePercent: 2.47,
        volume: 40000000,
        marketCap: 1050000000000
      }
    ];
  }
};

/**
 * Fetch portfolio data
 */
export const fetchPortfolio = async () => {
  try {
    const data = await fetchWithAuth('/portfolio');
    return data;
  } catch (error) {
    console.warn('Using fallback portfolio data due to API error');
    return {
      totalValue: 42568.33,
      totalChange: 8.45,
      dayGainLoss: 523.45,
      dayChange: 1.24,
      cashBalance: 12450.25,
      holdings: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          quantity: 15,
          averageCost: 165.30,
          currentPrice: 175.82,
          marketValue: 2637.30,
          gainLoss: 157.80,
          gainLossPercent: 6.36
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          quantity: 20,
          averageCost: 290.25,
          currentPrice: 320.65,
          marketValue: 6413.00,
          gainLoss: 608.00,
          gainLossPercent: 10.47
        },
        {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          quantity: 25,
          averageCost: 130.45,
          currentPrice: 138.50,
          marketValue: 3462.50,
          gainLoss: 201.25,
          gainLossPercent: 6.17
        },
        {
          symbol: 'AMZN',
          name: 'Amazon.com, Inc.',
          quantity: 30,
          averageCost: 145.25,
          currentPrice: 139.75,
          marketValue: 4192.50,
          gainLoss: -165.00,
          gainLossPercent: -3.78
        },
        {
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          quantity: 40,
          averageCost: 230.50,
          currentPrice: 245.32,
          marketValue: 9812.80,
          gainLoss: 592.80,
          gainLossPercent: 6.43
        },
        {
          symbol: 'META',
          name: 'Meta Platforms, Inc.',
          quantity: 10,
          averageCost: 290.75,
          currentPrice: 315.45,
          marketValue: 3154.50,
          gainLoss: 247.00,
          gainLossPercent: 8.5
        }
      ],
      holdingsByCategory: [
        {
          name: 'Technology',
          holdings: 4,
          marketValue: 22617.30,
          performance: 8.2
        },
        {
          name: 'Consumer Cyclical',
          holdings: 1,
          marketValue: 9812.80,
          performance: 6.43
        },
        {
          name: 'Communication Services',
          holdings: 1,
          marketValue: 3154.50,
          performance: 8.5
        }
      ]
    };
  }
};

/**
 * Fetch transaction history
 */
export const fetchTransactionHistory = async () => {
  try {
    const data = await fetchWithAuth('/transactions/history');
    return data;
  } catch (error) {
    console.warn('Using fallback transaction history data due to API error');
    return [
      {
        date: '2023-09-15T10:30:00Z',
        symbol: 'AAPL',
        type: 'BUY',
        quantity: 10,
        price: 175.82,
        total: 1758.20,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-14T14:25:00Z',
        symbol: 'MSFT',
        type: 'SELL',
        quantity: 5,
        price: 320.65,
        total: 1603.25,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-14T09:45:00Z',
        symbol: 'GOOGL',
        type: 'BUY',
        quantity: 3,
        price: 138.50,
        total: 415.50,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-13T15:10:00Z',
        symbol: 'TSLA',
        type: 'BUY',
        quantity: 8,
        price: 245.32,
        total: 1962.56,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-12T11:05:00Z',
        symbol: 'AMZN',
        type: 'SELL',
        quantity: 4,
        price: 139.75,
        total: 559.00,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-10T13:15:00Z',
        symbol: 'META',
        type: 'BUY',
        quantity: 10,
        price: 290.75,
        total: 2907.50,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-08T10:00:00Z',
        symbol: 'AAPL',
        type: 'BUY',
        quantity: 5,
        price: 168.45,
        total: 842.25,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-05T15:30:00Z',
        symbol: 'MSFT',
        type: 'BUY',
        quantity: 10,
        price: 305.20,
        total: 3052.00,
        status: 'COMPLETED'
      },
      {
        date: '2023-09-01T11:45:00Z',
        symbol: 'GOOGL',
        type: 'BUY',
        quantity: 15,
        price: 132.60,
        total: 1989.00,
        status: 'COMPLETED'
      },
      {
        date: '2023-08-28T14:20:00Z',
        symbol: 'TSLA',
        type: 'BUY',
        quantity: 12,
        price: 232.15,
        total: 2785.80,
        status: 'COMPLETED'
      }
    ];
  }
};

/**
 * Fetch sector performance data
 */
export const fetchSectorPerformance = async () => {
  try {
    const data = await fetchWithAuth('/market/sectors');
    return data;
  } catch (error) {
    console.warn('Using fallback sector performance data due to API error');
    return [
      { name: 'Technology', percentChange: 1.8 },
      { name: 'Healthcare', percentChange: -0.5 },
      { name: 'Financials', percentChange: 0.7 },
      { name: 'Consumer Discretionary', percentChange: 2.3 },
      { name: 'Communication Services', percentChange: 1.2 },
      { name: 'Industrials', percentChange: -0.2 },
      { name: 'Consumer Staples', percentChange: 0.4 },
      { name: 'Energy', percentChange: -1.5 },
      { name: 'Utilities', percentChange: -0.8 },
      { name: 'Real Estate', percentChange: 0.3 },
      { name: 'Materials', percentChange: -0.4 }
    ];
  }
};

/**
 * Fetch market movers (gainers, losers, most active)
 */
export const fetchMarketMovers = async () => {
  try {
    const data = await fetchWithAuth('/market/movers');
    return data;
  } catch (error) {
    console.warn('Using fallback market movers data due to API error');
    return {
      gainers: [
        { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 425.75, change: 10.25, changePercent: 2.47 },
        { symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.32, change: 5.23, changePercent: 2.18 },
        { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', price: 105.25, change: 2.15, changePercent: 2.09 },
        { symbol: 'PLTR', name: 'Palantir Technologies Inc.', price: 15.75, change: 0.32, changePercent: 2.07 },
        { symbol: 'INTC', name: 'Intel Corporation', price: 34.25, change: 0.68, changePercent: 2.02 }
      ],
      losers: [
        { symbol: 'WMT', name: 'Walmart Inc.', price: 162.45, change: -4.32, changePercent: -2.59 },
        { symbol: 'PFE', name: 'Pfizer Inc.', price: 36.25, change: -0.95, changePercent: -2.55 },
        { symbol: 'KO', name: 'The Coca-Cola Company', price: 58.75, change: -1.45, changePercent: -2.41 },
        { symbol: 'VZ', name: 'Verizon Communications Inc.', price: 39.45, change: -0.85, changePercent: -2.11 },
        { symbol: 'T', name: 'AT&T Inc.', price: 16.80, change: -0.35, changePercent: -2.04 }
      ],
      mostActive: [
        { symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.32, change: 5.23, changePercent: 2.18 },
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175.82, change: -0.45, changePercent: -0.26 },
        { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 425.75, change: 10.25, changePercent: 2.47 },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 139.75, change: -1.25, changePercent: -0.89 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 320.65, change: 2.35, changePercent: 0.74 }
      ]
    };
  }
};

export default {
  fetchAccountSummary,
  fetchRecentTrades,
  fetchMarketSummary,
  fetchPortfolio,
  fetchTransactionHistory,
  fetchSectorPerformance,
  fetchMarketMovers
};

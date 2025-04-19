// src/mockApi/mockServer.js
import { http, HttpResponse, delay } from 'msw';
import { setupWorker } from 'msw/browser';

// Mock user data store
let users = [
  {
    id: 1,
    username: 'demo',
    password: 'password123', // This would be hashed in a real app
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@tradespro.com',
    balance: 50000.00,
    createdAt: new Date('2023-01-15').toISOString()
  }
];

// Track current session
let currentUser = null;

// Mock API handlers
const handlers = [
  // Login endpoint
  http.post('/api/login', async ({ request }) => {
    // Add a slight delay to simulate network
    await delay(300);

    const { username, password } = await request.json();
    
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );
    
    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Set current user (simulating session)
    currentUser = { ...user };
    delete currentUser.password; // Don't send password to client
    
    return HttpResponse.json(currentUser);
  }),
  
  // Register endpoint
  http.post('/api/register', async ({ request }) => {
    await delay(300);
    
    const userData = await request.json();
    
    // Check if username already exists
    if (users.some(u => u.username.toLowerCase() === userData.username.toLowerCase())) {
      return HttpResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      ...userData,
      balance: 10000.00, // Starting balance
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Set as current user (auto login)
    currentUser = { ...newUser };
    delete currentUser.password; // Don't send password to client
    
    return HttpResponse.json(currentUser, { status: 201 });
  }),
  
  // Logout endpoint
  http.post('/api/logout', async () => {
    await delay(100);
    currentUser = null;
    
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),
  
  // Get current user
  http.get('/api/user', async () => {
    await delay(100);
    
    if (!currentUser) {
      return HttpResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json(currentUser);
  }),
  
  // Get account summary
  http.get('/api/account/summary', async () => {
    await delay(200);
    
    if (!currentUser) {
      return HttpResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json({
      balance: currentUser.balance,
      portfolioValue: 65432.78,
      totalValue: currentUser.balance + 65432.78,
      dayChange: 1243.56,
      dayChangePercent: 1.87
    });
  }),
  
  // Get recent trades
  http.get('/api/trades/recent', async () => {
    await delay(300);
    
    if (!currentUser) {
      return HttpResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json([
      {
        id: 123,
        symbol: 'AAPL',
        type: 'buy',
        quantity: 10,
        price: 185.92,
        total: 1859.20,
        date: new Date('2023-04-10T14:32:15').toISOString()
      },
      {
        id: 122,
        symbol: 'MSFT',
        type: 'sell',
        quantity: 5,
        price: 410.38,
        total: 2051.90,
        date: new Date('2023-04-09T10:22:35').toISOString()
      },
      {
        id: 121,
        symbol: 'TSLA',
        type: 'buy',
        quantity: 8,
        price: 177.67,
        total: 1421.36,
        date: new Date('2023-04-07T15:48:22').toISOString()
      }
    ]);
  }),
  
  // Get portfolio holdings
  http.get('/api/portfolio/holdings', async () => {
    await delay(200);
    
    if (!currentUser) {
      return HttpResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json([
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 15,
        averagePrice: 182.45,
        currentPrice: 185.92,
        value: 2788.80,
        dayChange: 1.23,
        totalReturn: 51.05
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        quantity: 10,
        averagePrice: 380.22,
        currentPrice: 410.38,
        value: 4103.80,
        dayChange: 2.81,
        totalReturn: 301.60
      },
      {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        quantity: 20,
        averagePrice: 180.33,
        currentPrice: 177.67,
        value: 3553.40,
        dayChange: -1.45,
        totalReturn: -53.20
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com, Inc.',
        quantity: 12,
        averagePrice: 175.12,
        currentPrice: 178.35,
        value: 2140.20,
        dayChange: 0.89,
        totalReturn: 38.76
      }
    ]);
  }),
  
  // Get market summary
  http.get('/api/market/summary', async () => {
    await delay(200);
    
    return HttpResponse.json({
      indices: [
        {
          symbol: 'SPX',
          name: 'S&P 500',
          price: 5123.45,
          change: 32.56,
          changePercent: 0.64
        },
        {
          symbol: 'DJI',
          name: 'Dow Jones',
          price: 38762.34,
          change: 145.67,
          changePercent: 0.38
        },
        {
          symbol: 'IXIC',
          name: 'NASDAQ',
          price: 16982.11,
          change: 98.32,
          changePercent: 0.58
        }
      ],
      mostActive: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 185.92,
          change: 2.34,
          changePercent: 1.27,
          volume: 67543210
        },
        {
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 177.67,
          change: -2.56,
          changePercent: -1.42,
          volume: 54321678
        },
        {
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 924.73,
          change: 15.63,
          changePercent: 1.72,
          volume: 43215678
        }
      ]
    });
  })
];

// Initialize MSW worker
export const worker = setupWorker(...handlers);

// Start the worker
export async function startMockServer() {
  if (process.env.NODE_ENV !== 'production') {
    try {
      // Start the worker with a more permissive configuration
      await worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      });
      console.log('Mock API server running');
    } catch (error) {
      console.error('Failed to start mock server:', error);
    }
  }
}
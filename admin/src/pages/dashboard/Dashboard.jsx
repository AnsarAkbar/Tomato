import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  ShoppingCart,
  Category,
  Receipt,
  People,
  TrendingUp,
  AttachMoney
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, value, icon, isLoading, error }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    {error ? (
      <Alert severity="error" sx={{ height: '100%' }}>
        Failed to load {title}
      </Alert>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          {isLoading ? (
            <CircularProgress size={30} />
          ) : (
            <Typography component="h2" variant="h3">
              {value}
            </Typography>
          )}
        </Box>
        <Box sx={{ color: 'primary.main' }}>
          {icon}
        </Box>
      </Box>
    )}
  </Paper>
);

const RecentOrdersTable = ({ orders, isLoading, error }) => {
  if (error) {
    return <Alert severity="error">Failed to load recent orders</Alert>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Items</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order._id.slice(-6)}</TableCell>
            <TableCell>{order.customer.name}</TableCell>
            <TableCell>{order.items.length}</TableCell>
            <TableCell>₹{order.total.toFixed(2)}</TableCell>
            <TableCell>
              <Chip
                label={order.status}
                color={
                  order.status === 'Delivered' ? 'success' :
                  order.status === 'Processing' ? 'warning' :
                  order.status === 'Pending' ? 'info' : 'default'
                }
                size="small"
              />
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const RevenueChart = ({ data, isLoading, error }) => {
  if (error) {
    return <Alert severity="error">Failed to load revenue data</Alert>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenue',
        data: data.values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [revenueData, setRevenueData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState({
    stats: true,
    orders: true,
    revenue: true
  });
  const [error, setError] = useState({
    stats: null,
    orders: null,
    revenue: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch statistics
        const statsResponse = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard/stats`, {
          headers
        });
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsResponse.json();
        setStats(statsData);
        setLoading(prev => ({ ...prev, stats: false }));

        // Fetch recent orders
        const ordersResponse = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard/recent-orders`, {
          headers
        });
        if (!ordersResponse.ok) throw new Error('Failed to fetch orders');
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData);
        setLoading(prev => ({ ...prev, orders: false }));

        // Fetch revenue data
        const revenueResponse = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard/revenue`, {
          headers
        });
        if (!revenueResponse.ok) throw new Error('Failed to fetch revenue');
        const revenueData = await revenueResponse.json();
        setRevenueData(revenueData);
        setLoading(prev => ({ ...prev, revenue: false }));

      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(prev => ({
          ...prev,
          stats: err.message,
          orders: err.message,
          revenue: err.message
        }));
      } finally {
        setLoading({
          stats: false,
          orders: false,
          revenue: false
        });
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Products"
            value={stats.products}
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            isLoading={loading.stats}
            error={error.stats}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Categories"
            value={stats.categories}
            icon={<Category sx={{ fontSize: 40 }} />}
            isLoading={loading.stats}
            error={error.stats}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Orders"
            value={stats.orders}
            icon={<Receipt sx={{ fontSize: 40 }} />}
            isLoading={loading.stats}
            error={error.stats}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Users"
            value={stats.users}
            icon={<People sx={{ fontSize: 40 }} />}
            isLoading={loading.stats}
            error={error.stats}
          />
        </Grid>
      </Grid>

      {/* Revenue Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <RevenueChart
              data={revenueData}
              isLoading={loading.revenue}
              error={error.revenue}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <RecentOrdersTable
              orders={recentOrders}
              isLoading={loading.orders}
              error={error.orders}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
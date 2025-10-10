import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, Package, TrendingUp, AlertTriangle, ShoppingCart, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [visibleWidgets, setVisibleWidgets] = useState({
    revenue: true,
    users: true,
    products: true,
    sales: true
  });

  useEffect(() => {
    // Load data from localStorage or initialize with mock data
    const savedRevenue = localStorage.getItem('revenueData');
    const savedMetrics = localStorage.getItem('dashboardMetrics');

    if (savedRevenue) {
      setRevenueData(JSON.parse(savedRevenue));
    } else {
      const mockRevenueData = [
        { month: 'Jan', revenue: 45000, sales: 120 },
        { month: 'Feb', revenue: 52000, sales: 140 },
        { month: 'Mar', revenue: 48000, sales: 130 },
        { month: 'Apr', revenue: 61000, sales: 165 },
        { month: 'May', revenue: 55000, sales: 150 },
        { month: 'Jun', revenue: 67000, sales: 180 },
        { month: 'Jul', revenue: 72000, sales: 195 },
        { month: 'Aug', revenue: 69000, sales: 185 },
        { month: 'Sep', revenue: 78000, sales: 210 },
        { month: 'Oct', revenue: 82000, sales: 220 },
        { month: 'Nov', revenue: 89000, sales: 240 },
        { month: 'Dec', revenue: 95000, sales: 260 }
      ];
      setRevenueData(mockRevenueData);
      localStorage.setItem('revenueData', JSON.stringify(mockRevenueData));
    }

    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    } else {
      const mockMetrics = {
        totalRevenue: 823000,
        activeUsers: 1247,
        productsInStock: 342,
        salesActivity: 2156
      };
      setMetrics(mockMetrics);
      localStorage.setItem('dashboardMetrics', JSON.stringify(mockMetrics));
    }
  }, []);

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Laptops', value: 25, color: '#8B5CF6' },
    { name: 'Keyboards', value: 20, color: '#10B981' },
    { name: 'Headsets', value: 20, color: '#F59E0B' }
  ];

  const toggleWidget = (widget) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
    toast({
      title: "Dashboard Updated",
      description: `${widget} widget ${visibleWidgets[widget] ? 'hidden' : 'shown'}.`,
    });
  };

  const handleEditMetric = (metricName) => {
    toast({
      title: "Metric editing isn't implemented "
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin Panel</title>
        <meta name="description" content="Comprehensive business dashboard with analytics, metrics, and insights." />
        <meta property="og:title" content="Dashboard - Admin Panel" />
        <meta property="og:description" content="Comprehensive business dashboard with analytics, metrics, and insights." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({ title: "Dashboard customization isn't implemented" })}
            >
              Customize Dashboard
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleWidgets.revenue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={() => toggleWidget('revenue')}
                    >
                      <EyeOff className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${metrics.totalRevenue?.toLocaleString()}</div>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% from last month
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 p-0 h-auto"
                    onClick={() => handleEditMetric('revenue')}
                  >
                    Edit Value
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {visibleWidgets.users && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={() => toggleWidget('users')}
                    >
                      <EyeOff className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metrics.activeUsers?.toLocaleString()}</div>
                  <p className="text-xs text-blue-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.2% from last month
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 p-0 h-auto"
                    onClick={() => handleEditMetric('users')}
                  >
                    Edit Value
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {visibleWidgets.products && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Products in Stock</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-purple-400" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={() => toggleWidget('products')}
                    >
                      <EyeOff className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metrics.productsInStock?.toLocaleString()}</div>
                  <p className="text-xs text-yellow-400 flex items-center mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    12 items low stock
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 p-0 h-auto"
                    onClick={() => handleEditMetric('products')}
                  >
                    Edit Value
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {visibleWidgets.sales && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Sales Activity</CardTitle>
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4 text-orange-400" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={() => toggleWidget('sales')}
                    >
                      <EyeOff className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metrics.salesActivity?.toLocaleString()}</div>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3% from last month
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 p-0 h-auto"
                    onClick={() => handleEditMetric('sales')}
                  >
                    Edit Value
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Monthly Revenue</CardTitle>
                <CardDescription className="text-gray-400">
                  Revenue trends over the past 12 months
                </CardDescription>
                <Tabs defaultValue="revenue" className="mt-4">
                  <TabsList className="glass-effect border-white/20">
                    <TabsTrigger value="revenue" className="text-white data-[state=active]:bg-blue-500/20">Revenue</TabsTrigger>
                    <TabsTrigger value="sales" className="text-white data-[state=active]:bg-blue-500/20">Sales</TabsTrigger>
                  </TabsList>
                  <TabsContent value="revenue" className="mt-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="sales" className="mt-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Bar dataKey="sales" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Product Categories</CardTitle>
                <CardDescription className="text-gray-400">
                  Distribution of products by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Hidden Widgets Info */}
        {(!visibleWidgets.revenue || !visibleWidgets.users || !visibleWidgets.products || !visibleWidgets.sales) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect border-white/20 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Some widgets are hidden</span>
              </div>
              <div className="flex items-center space-x-2">
                {!visibleWidgets.revenue && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => toggleWidget('revenue')}
                  >
                    Show Revenue
                  </Button>
                )}
                {!visibleWidgets.users && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => toggleWidget('users')}
                  >
                    Show Users
                  </Button>
                )}
                {!visibleWidgets.products && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => toggleWidget('products')}
                  >
                    Show Products
                  </Button>
                )}
                {!visibleWidgets.sales && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => toggleWidget('sales')}
                  >
                    Show Sales
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
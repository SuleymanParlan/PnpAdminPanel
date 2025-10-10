import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download, FileText, TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('sales');
  const [salesData, setSalesData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [userActivityData, setUserActivityData] = useState([]);

  useEffect(() => {
    // Generate mock data based on date range
    generateReportData();
  }, [dateRange]);

  const generateReportData = () => {
    // Mock sales data
    const mockSalesData = [
      { period: 'Week 1', revenue: 12500, orders: 45, customers: 38 },
      { period: 'Week 2', revenue: 15200, orders: 52, customers: 44 },
      { period: 'Week 3', revenue: 18900, orders: 67, customers: 59 },
      { period: 'Week 4', revenue: 21300, orders: 73, customers: 65 },
    ];

    if (dateRange === 'year') {
      setSalesData([
        { period: 'Q1', revenue: 145000, orders: 520, customers: 450 },
        { period: 'Q2', revenue: 167000, orders: 610, customers: 520 },
        { period: 'Q3', revenue: 189000, orders: 680, customers: 590 },
        { period: 'Q4', revenue: 203000, orders: 750, customers: 640 },
      ]);
    } else {
      setSalesData(mockSalesData);
    }

    // Mock stock data
    setStockData([
      { category: 'Electronics', inStock: 145, lowStock: 12, outOfStock: 3 },
      { category: 'Clothing', inStock: 89, lowStock: 8, outOfStock: 2 },
      { category: 'Books', inStock: 234, lowStock: 5, outOfStock: 1 },
      { category: 'Home & Garden', inStock: 67, lowStock: 15, outOfStock: 4 },
    ]);

    // Mock user activity data
    setUserActivityData([
      { period: 'Week 1', logins: 156, newUsers: 12, activeUsers: 89 },
      { period: 'Week 2', logins: 178, newUsers: 15, activeUsers: 94 },
      { period: 'Week 3', logins: 203, newUsers: 18, activeUsers: 102 },
      { period: 'Week 4', logins: 189, newUsers: 14, activeUsers: 97 },
    ]);
  };

  const categoryColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

  const handleExportPDF = () => {
    toast({
      title: "🚧 PDF export isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "🚧 Excel export isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getTotalRevenue = () => {
    return salesData.reduce((total, item) => total + item.revenue, 0);
  };

  const getTotalOrders = () => {
    return salesData.reduce((total, item) => total + item.orders, 0);
  };

  const getTotalCustomers = () => {
    return salesData.reduce((total, item) => total + item.customers, 0);
  };

  const getStockSummary = () => {
    return stockData.reduce((summary, item) => ({
      inStock: summary.inStock + item.inStock,
      lowStock: summary.lowStock + item.lowStock,
      outOfStock: summary.outOfStock + item.outOfStock
    }), { inStock: 0, lowStock: 0, outOfStock: 0 });
  };

  return (
    <>
      <Helmet>
        <title>Reports - Admin Panel</title>
        <meta name="description" content="Generate comprehensive business reports with visual analytics and data insights." />
        <meta property="og:title" content="Reports - Admin Panel" />
        <meta property="og:description" content="Generate comprehensive business reports with visual analytics and data insights." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Reports & Analytics</h1>
            <p className="text-gray-400 mt-1">Generate comprehensive business reports and insights.</p>
          </div>

          <div className="flex items-center space-x-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32 glass-effect border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              onClick={handleExportExcel}
              variant="outline"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="glass-effect border-white/20">
            <TabsTrigger value="sales" className="text-white data-[state=active]:bg-blue-500/20">
              <DollarSign className="w-4 h-4 mr-2" />
              Sales Reports
            </TabsTrigger>
            <TabsTrigger value="stock" className="text-white data-[state=active]:bg-blue-500/20">
              <Package className="w-4 h-4 mr-2" />
              Stock Reports
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-blue-500/20">
              <Users className="w-4 h-4 mr-2" />
              User Activity
            </TabsTrigger>
          </TabsList>

          {/* Sales Reports */}
          <TabsContent value="sales">
            <div className="space-y-6">
              {/* Sales Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">${getTotalRevenue().toLocaleString()}</div>
                      <p className="text-xs text-green-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12.5% from last period
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
                      <FileText className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{getTotalOrders().toLocaleString()}</div>
                      <p className="text-xs text-blue-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.2% from last period
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Customers</CardTitle>
                      <Users className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{getTotalCustomers().toLocaleString()}</div>
                      <p className="text-xs text-purple-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15.3% from last period
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sales Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass-effect border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Revenue Trend</CardTitle>
                      <CardDescription className="text-gray-400">
                        Revenue performance over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="period" stroke="#9CA3AF" />
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
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="glass-effect border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Orders vs Customers</CardTitle>
                      <CardDescription className="text-gray-400">
                        Order volume and customer acquisition
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="period" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(30, 41, 59, 0.9)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                          />
                          <Bar dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="customers" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          {/* Stock Reports */}
          <TabsContent value="stock">
            <div className="space-y-6">
              {/* Stock Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">In Stock</CardTitle>
                      <Package className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{getStockSummary().inStock}</div>
                      <p className="text-xs text-green-400">Products available</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Low Stock</CardTitle>
                      <Package className="h-4 w-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{getStockSummary().lowStock}</div>
                      <p className="text-xs text-yellow-400">Need restocking</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Out of Stock</CardTitle>
                      <Package className="h-4 w-4 text-red-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{getStockSummary().outOfStock}</div>
                      <p className="text-xs text-red-400">Urgent attention</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Stock Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass-effect border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Stock by Category</CardTitle>
                      <CardDescription className="text-gray-400">
                        Inventory distribution across categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stockData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="category" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(30, 41, 59, 0.9)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                          />
                          <Bar dataKey="inStock" fill="#10B981" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="lowStock" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="outOfStock" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="glass-effect border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Stock Status Distribution</CardTitle>
                      <CardDescription className="text-gray-400">
                        Overall stock health overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'In Stock', value: getStockSummary().inStock, color: '#10B981' },
                              { name: 'Low Stock', value: getStockSummary().lowStock, color: '#F59E0B' },
                              { name: 'Out of Stock', value: getStockSummary().outOfStock, color: '#EF4444' }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {[
                              { name: 'In Stock', value: getStockSummary().inStock, color: '#10B981' },
                              { name: 'Low Stock', value: getStockSummary().lowStock, color: '#F59E0B' },
                              { name: 'Out of Stock', value: getStockSummary().outOfStock, color: '#EF4444' }
                            ].map((entry, index) => (
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
            </div>
          </TabsContent>

          {/* User Activity Reports */}
          <TabsContent value="users">
            <div className="space-y-6">
              {/* User Activity Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Logins</CardTitle>
                      <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">
                        {userActivityData.reduce((total, item) => total + item.logins, 0)}
                      </div>
                      <p className="text-xs text-blue-400">User sessions</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">New Users</CardTitle>
                      <Users className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">
                        {userActivityData.reduce((total, item) => total + item.newUsers, 0)}
                      </div>
                      <p className="text-xs text-green-400">Registrations</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="metric-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">
                        {Math.round(userActivityData.reduce((total, item) => total + item.activeUsers, 0) / userActivityData.length)}
                      </div>
                      <p className="text-xs text-purple-400">Average active</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* User Activity Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">User Activity Trends</CardTitle>
                    <CardDescription className="text-gray-400">
                      User engagement and growth metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={userActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="period" stroke="#9CA3AF" />
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
                          dataKey="logins"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="newUsers"
                          stroke="#10B981"
                          strokeWidth={3}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="activeUsers"
                          stroke="#8B5CF6"
                          strokeWidth={3}
                          dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Reports;
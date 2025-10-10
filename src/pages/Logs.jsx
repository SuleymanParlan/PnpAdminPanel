import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, User, Package } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import LogFilters from '@/components/logs/LogFilters';
import ActivityLogsList from '@/components/logs/ActivityLogsList';
import StockLogsList from '@/components/logs/StockLogsList';
import { filterLogsBySearch, filterLogsByType, filterLogsByDate } from '@/utils/logFilters';

const Logs = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [stockLogs, setStockLogs] = useState([]);
  const [filteredActivityLogs, setFilteredActivityLogs] = useState([]);
  const [filteredStockLogs, setFilteredStockLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    // Load logs from localStorage
    const savedActivityLogs = localStorage.getItem('activityLogs');
    const savedStockLogs = localStorage.getItem('stockLogs');

    if (savedActivityLogs) {
      setActivityLogs(JSON.parse(savedActivityLogs));
    }

    if (savedStockLogs) {
      setStockLogs(JSON.parse(savedStockLogs));
    }
  }, []);

  useEffect(() => {
    // Filter activity logs
    let filtered = activityLogs;

    filtered = filterLogsBySearch(filtered, searchTerm);
    filtered = filterLogsByType(filtered, filterType);
    filtered = filterLogsByDate(filtered, dateFilter);

    setFilteredActivityLogs(filtered);
  }, [activityLogs, searchTerm, filterType, dateFilter]);

  useEffect(() => {
    // Filter stock logs
    let filtered = stockLogs;

    filtered = filterLogsBySearch(filtered, searchTerm, true);
    filtered = filterLogsByDate(filtered, dateFilter);

    setFilteredStockLogs(filtered);
  }, [stockLogs, searchTerm, dateFilter]);

  const handleExport = () => {
    toast({
      title: "Export feature isn't implemented"
    });
  };

  const clearLogs = (type) => {
    if (type === 'activity') {
      localStorage.removeItem('activityLogs');
      setActivityLogs([]);
      toast({
        title: "Success",
        description: "Activity logs cleared successfully!",
      });
    } else if (type === 'stock') {
      localStorage.removeItem('stockLogs');
      setStockLogs([]);
      toast({
        title: "Success",
        description: "Stock logs cleared successfully!",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Logs - Admin Panel</title>
        <meta name="description" content="View and manage system activity logs and stock change history." />
        <meta property="og:title" content="Logs - Admin Panel" />
        <meta property="og:description" content="View and manage system activity logs and stock change history." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold gradient-text">System Logs</h1>
            <p className="text-gray-400 mt-1">Monitor user activity and system changes.</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleExport}
              variant="outline"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Filters */}
        <LogFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        {/* Logs Tabs */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="glass-effect border-white/20">
            <TabsTrigger value="activity" className="text-white data-[state=active]:bg-blue-500/20">
              <User className="w-4 h-4 mr-2" />
              User Activity ({filteredActivityLogs.length})
            </TabsTrigger>
            <TabsTrigger value="stock" className="text-white data-[state=active]:bg-blue-500/20">
              <Package className="w-4 h-4 mr-2" />
              Stock Changes ({filteredStockLogs.length})
            </TabsTrigger>
          </TabsList>

          {/* Activity Logs */}
          <TabsContent value="activity">
            <ActivityLogsList 
              logs={filteredActivityLogs} 
              onClearLogs={clearLogs}
            />
          </TabsContent>

          {/* Stock Logs */}
          <TabsContent value="stock">
            <StockLogsList 
              logs={filteredStockLogs} 
              onClearLogs={clearLogs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Logs;
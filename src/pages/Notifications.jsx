import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, AlertTriangle, Info, CheckCircle, X, Eye, EyeOff, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load notifications from localStorage or initialize with mock data
    const savedNotifications = localStorage.getItem('systemNotifications');
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      setNotifications(parsedNotifications);
      setFilteredNotifications(parsedNotifications);
    } else {
      const mockNotifications = [
        {
          id: 1,
          type: 'warning',
          title: 'Low Stock Alert',
          message: 'Cotton T-Shirt is running low in stock (8 units remaining)',
          timestamp: new Date().toISOString(),
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'info',
          title: 'New User Registration',
          message: 'Emily Davis has registered as a new user',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'warning',
          title: 'Low Stock Alert',
          message: 'Garden Tools Set is running low in stock (5 units remaining)',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          read: true,
          priority: 'high'
        },
        {
          id: 4,
          type: 'success',
          title: 'Stock Replenished',
          message: 'JavaScript Guide stock has been replenished (120 units added)',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          read: true,
          priority: 'low'
        },
        {
          id: 5,
          type: 'info',
          title: 'System Backup Complete',
          message: 'Daily system backup completed successfully',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: false,
          priority: 'low'
        },
        {
          id: 6,
          type: 'warning',
          title: 'User Account Inactive',
          message: 'Mike Wilson account has been inactive for 7 days',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          priority: 'medium'
        }
      ];
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      localStorage.setItem('systemNotifications', JSON.stringify(mockNotifications));
    }
  }, []);

  useEffect(() => {
    // Filter notifications based on selected filter
    let filtered = notifications;

    if (filter === 'unread') {
      filtered = notifications.filter(n => !n.read);
    } else if (filter === 'read') {
      filtered = notifications.filter(n => n.read);
    } else if (filter !== 'all') {
      filtered = notifications.filter(n => n.type === filter);
    }

    setFilteredNotifications(filtered);
  }, [notifications, filter]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'success':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'info':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: 'bg-red-500/20 border-red-500/30 text-red-300',
      medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
      low: 'bg-green-500/20 border-green-500/30 text-green-300'
    };
    return variants[priority] || 'bg-gray-500/20 border-gray-500/30 text-gray-300';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('systemNotifications', JSON.stringify(updatedNotifications));
    
    toast({
      title: "Notification marked as read",
    });
  };

  const markAsUnread = (id) => {
    const updatedNotifications = notifications.map(n =>
      n.id === id ? { ...n, read: false } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('systemNotifications', JSON.stringify(updatedNotifications));
    
    toast({
      title: "Notification marked as unread",
    });
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('systemNotifications', JSON.stringify(updatedNotifications));
    
    toast({
      title: "Notification deleted",
    });
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('systemNotifications', JSON.stringify(updatedNotifications));
    
    toast({
      title: "All notifications marked as read",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('systemNotifications');
    
    toast({
      title: "All notifications cleared",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Helmet>
        <title>Notifications - Admin Panel</title>
        <meta name="description" content="Manage system notifications, alerts, and important updates." />
        <meta property="og:title" content="Notifications - Admin Panel" />
        <meta property="og:description" content="Manage system notifications, alerts, and important updates." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center">
              <Bell className="w-8 h-8 mr-3" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-3 bg-red-500/20 border-red-500/30 text-red-300 border">
                  {unreadCount} unread
                </Badge>
              )}
            </h1>
            <p className="text-gray-400 mt-1">Stay updated with system alerts and important notifications.</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
            <Button
              onClick={clearAllNotifications}
              variant="outline"
              className="glass-effect border-red-500/30 text-red-300 hover:bg-red-500/10"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="space-y-6">
          <TabsList className="glass-effect border-white/20">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-blue-500/20">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-white data-[state=active]:bg-blue-500/20">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" className="text-white data-[state=active]:bg-blue-500/20">
              Read ({notifications.length - unreadCount})
            </TabsTrigger>
            <TabsTrigger value="warning" className="text-white data-[state=active]:bg-blue-500/20">
              Warnings
            </TabsTrigger>
            <TabsTrigger value="info" className="text-white data-[state=active]:bg-blue-500/20">
              Info
            </TabsTrigger>
            <TabsTrigger value="success" className="text-white data-[state=active]:bg-blue-500/20">
              Success
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-12 text-center">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
                    <p className="text-gray-400">
                      {filter === 'all' 
                        ? "You're all caught up! No notifications to show."
                        : `No ${filter} notifications found.`
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`glass-effect border-white/20 ${!notification.read ? 'ring-2 ring-blue-500/30' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getNotificationColor(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                                  {notification.title}
                                </h3>
                                <Badge className={`${getPriorityBadge(notification.priority)} border text-xs`}>
                                  {notification.priority}
                                </Badge>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className={`text-sm ${!notification.read ? 'text-gray-300' : 'text-gray-400'} mb-2`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {notification.read ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                                onClick={() => markAsUnread(notification.id)}
                              >
                                <EyeOff className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Notifications;
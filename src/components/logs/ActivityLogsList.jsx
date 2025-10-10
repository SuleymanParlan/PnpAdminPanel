import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, FileText, Package, Calendar } from 'lucide-react';

const ActivityLogsList = ({ logs, onClearLogs }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLogTypeIcon = (type) => {
    switch (type) {
      case 'login':
        return <User className="w-4 h-4" />;
      case 'logout':
        return <User className="w-4 h-4" />;
      case 'stock':
        return <Package className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getLogTypeBadge = (type) => {
    const variants = {
      login: 'bg-green-500/20 border-green-500/30 text-green-300',
      logout: 'bg-red-500/20 border-red-500/30 text-red-300',
      stock: 'bg-blue-500/20 border-blue-500/30 text-blue-300'
    };

    return variants[type] || 'bg-gray-500/20 border-gray-500/30 text-gray-300';
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            User Activity Logs
          </CardTitle>
          <CardDescription className="text-gray-400">
            Track user login, logout, and system access events.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="glass-effect border-red-500/30 text-red-300 hover:bg-red-500/10"
          onClick={() => onClearLogs('activity')}
        >
          Clear Logs
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No activity logs found.</p>
            </div>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-effect border-white/10 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getLogTypeBadge(log.type)}`}>
                        {getLogTypeIcon(log.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white">{log.user}</span>
                        <Badge className={`${getLogTypeBadge(log.type)} border`}>
                          {log.type}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{log.action}</p>
                      <p className="text-gray-400 text-xs mt-1">{log.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatTimestamp(log.timestamp)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogsList;
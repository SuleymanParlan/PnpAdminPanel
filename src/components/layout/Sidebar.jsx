import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Package, FileText, Users, BarChart3, Bell, Settings, User, LogOut, Shield } from 'lucide-react';

const allNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['Admin', 'Staff', 'Viewer'] },
  { name: 'Stock Management', href: '/stock', icon: Package, roles: ['Admin', 'Staff'] },
  { name: 'Logs', href: '/logs', icon: FileText, roles: ['Admin'] },
  { name: 'Users', href: '/users', icon: Users, roles: ['Admin'] },
  { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['Admin', 'Viewer'] },
  { name: 'Notifications', href: '/notifications', icon: Bell, roles: ['Admin', 'Staff'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['Admin'] },
  { name: 'Profile', href: '/profile', icon: User, roles: ['Admin', 'Staff', 'Viewer'] }
];

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  const navigation = allNavigation.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="h-full sidebar-gradient flex flex-col">
      <div className="p-6 border-b border-white/10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-xs text-gray-400">PnP Management</p>
          </div>
        </motion.div>
      </div>

      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {navigation.map((item, index) => (
          <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
            <NavLink to={item.href} onClick={onClose} className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-500/10">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
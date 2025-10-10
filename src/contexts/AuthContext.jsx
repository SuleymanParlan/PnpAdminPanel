import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'Admin', password: 'admin123', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 2, name: 'Staff Member', email: 'staff@company.com', role: 'Staff', password: 'staff123', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Viewer User', email: 'viewer@company.com', role: 'Viewer', password: 'viewer123', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mock users if not present
    if (!localStorage.getItem('systemUsers')) {
      localStorage.setItem('systemUsers', JSON.stringify(initialUsers.map(({password, ...rest}) => rest)));
    }

    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.unshift({
          id: Date.now(),
          type: 'login',
          user: parsedUser.name,
          action: 'Session restored',
          timestamp: new Date().toISOString(),
          details: 'User session restored from localStorage'
        });
        localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 100)));
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const usersInDb = JSON.parse(localStorage.getItem('systemUsers') || JSON.stringify(initialUsers.map(({password, ...rest}) => rest)));
      const mockUsersWithPasswords = initialUsers.map(u => ({...u, ...usersInDb.find(udb => udb.id === u.id)}));

      const foundUser = mockUsersWithPasswords.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: userPassword, ...userData } = foundUser;
        
        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.unshift({
          id: Date.now(),
          type: 'login',
          user: userData.name,
          action: 'User logged in',
          timestamp: new Date().toISOString(),
          details: `Login from ${navigator.userAgent.split(' ')[0]}`
        });
        localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 100)));
        
        toast({
          title: "Welcome back!",
          description: "Successfully logged into admin panel.",
        });
        
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    if (user) {
      const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
      logs.unshift({
        id: Date.now(),
        type: 'logout',
        user: user.name,
        action: 'User logged out',
        timestamp: new Date().toISOString(),
        details: 'Manual logout'
      });
      localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 100)));
    }
    
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
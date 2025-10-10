import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings as SettingsIcon, Building, Palette, Globe, Shield, Bell, Database } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [businessSettings, setBusinessSettings] = useState({
    companyName: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    currency: 'USD',
    timezone: 'UTC',
    logo: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: 'dark',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    passwordExpiry: '90',
    twoFactorAuth: false,
    loginAttempts: '5',
    ipWhitelist: ''
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedBusinessSettings = localStorage.getItem('businessSettings');
    const savedSystemSettings = localStorage.getItem('systemSettings');
    const savedSecuritySettings = localStorage.getItem('securitySettings');

    if (savedBusinessSettings) {
      setBusinessSettings(JSON.parse(savedBusinessSettings));
    } else {
      // Initialize with default values
      const defaultBusiness = {
        companyName: 'Your Company Name',
        address: '123 Business Street, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'contact@company.com',
        website: 'https://www.company.com',
        currency: 'USD',
        timezone: 'UTC',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center'
      };
      setBusinessSettings(defaultBusiness);
      localStorage.setItem('businessSettings', JSON.stringify(defaultBusiness));
    }

    if (savedSystemSettings) {
      setSystemSettings(JSON.parse(savedSystemSettings));
    } else {
      localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
    }

    if (savedSecuritySettings) {
      setSecuritySettings(JSON.parse(savedSecuritySettings));
    } else {
      localStorage.setItem('securitySettings', JSON.stringify(securitySettings));
    }
  }, []);

  const handleBusinessSettingsChange = (field, value) => {
    const updated = { ...businessSettings, [field]: value };
    setBusinessSettings(updated);
  };

  const handleSystemSettingsChange = (field, value) => {
    const updated = { ...systemSettings, [field]: value };
    setSystemSettings(updated);
  };

  const handleSecuritySettingsChange = (field, value) => {
    const updated = { ...securitySettings, [field]: value };
    setSecuritySettings(updated);
  };

  const saveBusinessSettings = () => {
    localStorage.setItem('businessSettings', JSON.stringify(businessSettings));
    toast({
      title: "Success",
      description: "Business settings saved successfully!",
    });
  };

  const saveSystemSettings = () => {
    localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
    toast({
      title: "Success",
      description: "System preferences saved successfully!",
    });
  };

  const saveSecuritySettings = () => {
    localStorage.setItem('securitySettings', JSON.stringify(securitySettings));
    toast({
      title: "Success",
      description: "Security settings saved successfully!",
    });
  };

  const handleLogoUpload = () => {
    toast({
      title: "Logo upload isn't implemented"
    });
  };

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
  const timezones = ['UTC', 'EST', 'PST', 'GMT', 'CET', 'JST', 'AEST'];
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' }
  ];

  return (
    <>
      <Helmet>
        <title>Settings - Admin Panel</title>
        <meta name="description" content="Configure system settings, business information, and security preferences." />
        <meta property="og:title" content="Settings - Admin Panel" />
        <meta property="og:description" content="Configure system settings, business information, and security preferences." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3" />
            Settings
          </h1>
          <p className="text-gray-400 mt-1">Configure your system preferences and business information.</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="glass-effect border-white/20">
            <TabsTrigger value="business" className="text-white data-[state=active]:bg-blue-500/20">
              <Building className="w-4 h-4 mr-2" />
              Business Info
            </TabsTrigger>
            <TabsTrigger value="system" className="text-white data-[state=active]:bg-blue-500/20">
              <Palette className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="security" className="text-white data-[state=active]:bg-blue-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Business Information */}
          <TabsContent value="business">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Business Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your company details and contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={businessSettings.companyName}
                        onChange={(e) => handleBusinessSettingsChange('companyName', e.target.value)}
                        className="glass-effect border-white/20 text-white"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={businessSettings.email}
                        onChange={(e) => handleBusinessSettingsChange('email', e.target.value)}
                        className="glass-effect border-white/20 text-white"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={businessSettings.address}
                      onChange={(e) => handleBusinessSettingsChange('address', e.target.value)}
                      className="glass-effect border-white/20 text-white"
                      placeholder="Enter business address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={businessSettings.phone}
                        onChange={(e) => handleBusinessSettingsChange('phone', e.target.value)}
                        className="glass-effect border-white/20 text-white"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={businessSettings.website}
                        onChange={(e) => handleBusinessSettingsChange('website', e.target.value)}
                        className="glass-effect border-white/20 text-white"
                        placeholder="Enter website URL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select value={businessSettings.currency} onValueChange={(value) => handleBusinessSettingsChange('currency', value)}>
                        <SelectTrigger className="glass-effect border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                          {currencies.map(currency => (
                            <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={businessSettings.timezone} onValueChange={(value) => handleBusinessSettingsChange('timezone', value)}>
                        <SelectTrigger className="glass-effect border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                          {timezones.map(timezone => (
                            <SelectItem key={timezone} value={timezone}>{timezone}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      {businessSettings.logo && (
                        <img
                          src={businessSettings.logo}
                          alt="Company Logo"
                          className="w-16 h-16 rounded-lg object-cover border border-white/20"
                        />
                      )}
                      <Button
                        onClick={handleLogoUpload}
                        variant="outline"
                        className="glass-effect border-white/20 text-white hover:bg-white/10"
                      >
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={saveBusinessSettings}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Save Business Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* System Preferences */}
          <TabsContent value="system">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    System Preferences
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize your system appearance and behavior.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={systemSettings.theme} onValueChange={(value) => handleSystemSettingsChange('theme', value)}>
                        <SelectTrigger className="glass-effect border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={systemSettings.language} onValueChange={(value) => handleSystemSettingsChange('language', value)}>
                        <SelectTrigger className="glass-effect border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                          {languages.map(lang => (
                            <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={systemSettings.dateFormat} onValueChange={(value) => handleSystemSettingsChange('dateFormat', value)}>
                      <SelectTrigger className="glass-effect border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoBackup">Automatic Backup</Label>
                        <p className="text-sm text-gray-400">Enable daily automatic backups</p>
                      </div>
                      <Switch
                        id="autoBackup"
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked) => handleSystemSettingsChange('autoBackup', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={systemSettings.emailNotifications}
                        onCheckedChange={(checked) => handleSystemSettingsChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-400">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={systemSettings.smsNotifications}
                        onCheckedChange={(checked) => handleSystemSettingsChange('smsNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                        <p className="text-sm text-gray-400">Enable maintenance mode for system updates</p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => handleSystemSettingsChange('maintenanceMode', checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={saveSystemSettings}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Save System Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure security policies and access controls.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecuritySettingsChange('sessionTimeout', e.target.value)}
                        className="glass-effect border-white/20 text-white"
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Input
                        id="passwordExpiry"
                        type="number"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => handleSecuritySettingsChange('passwordExpiry', e.target.value)}
                        className="glass-effect border-white/20 text-white"
                        placeholder="90"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => handleSecuritySettingsChange('loginAttempts', e.target.value)}
                      className="glass-effect border-white/20 text-white"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                    <Textarea
                      id="ipWhitelist"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => handleSecuritySettingsChange('ipWhitelist', e.target.value)}
                      className="glass-effect border-white/20 text-white"
                      placeholder="Enter IP addresses (one per line)"
                      rows={4}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Leave empty to allow all IPs. Enter one IP address per line.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Require 2FA for all admin users</p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecuritySettingsChange('twoFactorAuth', checked)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={saveSecuritySettings}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Save Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
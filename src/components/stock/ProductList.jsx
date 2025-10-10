import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash2, AlertTriangle, Package, History, MoreVertical } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ProductList = ({ products, categories, onEdit, onDelete, onViewHistory, onUpdateStock, userRole }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stockUpdateProduct, setStockUpdateProduct] = useState(null);
  const [newStockValue, setNewStockValue] = useState('');

  const { user } = useAuth();
  const canEditProduct = user?.role === 'Admin' || user?.role === 'Staff';
  const canDeleteProduct = user?.role === 'Admin';
  
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      if (filterStatus === 'low') {
        filtered = filtered.filter(p => p.quantity < p.minStock);
      } else if (filterStatus === 'ok') {
        filtered = filtered.filter(p => p.quantity >= p.minStock);
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, filterStatus]);

  const getStockStatus = (product) => {
    if (product.quantity < product.minStock) return { text: 'Low Stock', class: 'low-stock' };
    return { text: 'OK', class: 'normal-stock' };
  };

  const calculateProfitMargin = (product) => {
    if (!product.sellingPrice || !product.purchaseCost || product.sellingPrice <= 0) return 'N/A';
    const margin = ((product.sellingPrice - product.purchaseCost) / product.sellingPrice) * 100;
    return `${margin.toFixed(2)}%`;
  };

  const handleOpenStockUpdate = (product) => {
    setStockUpdateProduct(product);
    setNewStockValue(product.quantity);
  };
  
  const handleConfirmStockUpdate = () => {
    if (stockUpdateProduct && newStockValue !== '') {
      onUpdateStock(stockUpdateProduct, parseInt(newStockValue, 10));
      setStockUpdateProduct(null);
      setNewStockValue('');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="glass-effect border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-effect border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-40 glass-effect border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-32 glass-effect border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="ok">OK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Products ({filteredProducts.length})
          </CardTitle>
          <CardDescription className="text-gray-400">
            A list of all products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-300">Product</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Stock / Min.</TableHead>
                  <TableHead className="text-gray-300">Cost</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Profit Margin</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-right text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => {
                  const status = getStockStatus(product);
                  return (
                    <TableRow key={product.id} className="border-white/10">
                      <TableCell className="font-medium text-white">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="glass-effect border-white/20 text-white">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-white">{product.quantity} / <span className="text-gray-400">{product.minStock}</span></TableCell>
                      <TableCell className="text-white">${product.purchaseCost?.toFixed(2)}</TableCell>
                      <TableCell className="text-white">${product.sellingPrice?.toFixed(2)}</TableCell>
                      <TableCell className="text-green-400 font-medium">{calculateProfitMargin(product)}</TableCell>
                      <TableCell>
                        <Badge className={`${status.class} border`}>
                          {status.text === 'Low Stock' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {status.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-effect border-white/20 bg-slate-800 text-white">
                            {canEditProduct && (
                              <DropdownMenuItem onClick={() => handleOpenStockUpdate(product)}>Update Stock</DropdownMenuItem>
                            )}
                            {canEditProduct && (
                              <DropdownMenuItem onClick={() => onEdit(product)}>Edit Product</DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => onViewHistory(product)}>View History</DropdownMenuItem>
                            {canDeleteProduct && (
                              <DropdownMenuItem className="text-red-400" onClick={() => onDelete(product)}>Delete Product</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!stockUpdateProduct} onOpenChange={() => setStockUpdateProduct(null)}>
        <DialogContent className="glass-effect border-white/20 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Stock for {stockUpdateProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p>Current stock: {stockUpdateProduct?.quantity}</p>
            <Input 
              type="number" 
              value={newStockValue} 
              onChange={(e) => setNewStockValue(e.target.value)} 
              className="glass-effect border-white/20 text-white"
            />
            <Button onClick={handleConfirmStockUpdate} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Folder, History, Package, MoreVertical } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ProductList from '@/components/stock/ProductList';
import CategoryManager from '@/components/stock/CategoryManager';
import ProductForm from '@/components/stock/ProductForm';
import StockHistory from '@/components/stock/StockHistory';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [historyProduct, setHistoryProduct] = useState(null);

  const { user } = useAuth();
  const canManageCategories = user?.role === 'Admin';

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('stockProducts') || '[]');
    const savedCategories = JSON.parse(localStorage.getItem('stockCategories') || '[]');

    if (savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      const mockProducts = [
        { id: 1, name: 'Pro Gaming Mouse', quantity: 45, purchaseCost: 29.99, sellingPrice: 59.99, category: 'Mouse', supplier: 'TechCorp', minStock: 10, sales: 150, history: [] },
        { id: 2, name: 'Mechanical Keyboard', quantity: 8, purchaseCost: 79.99, sellingPrice: 129.99, category: 'Keyboard', supplier: 'GadgetGurus', minStock: 15, sales: 80, history: [] },
        { id: 3, name: 'Noise-Cancelling Headset', quantity: 120, purchaseCost: 99.99, sellingPrice: 199.99, category: 'Headset', supplier: 'AudioPhile', minStock: 20, sales: 250, history: [] },
        { id: 4, name: 'Studio Microphone', quantity: 5, purchaseCost: 49.99, sellingPrice: 99.99, category: 'Microphone', supplier: 'SoundWave', minStock: 5, sales: 50, history: [] },
        { id: 5, name: '27" 4K Monitor', quantity: 25, purchaseCost: 250, sellingPrice: 450, category: 'Monitor', supplier: 'ViewMax', minStock: 8, sales: 75, history: [] }
      ];
      setProducts(mockProducts);
      localStorage.setItem('stockProducts', JSON.stringify(mockProducts));
    }
    
    if (savedCategories.length > 0) {
      setCategories(savedCategories);
    } else {
      const defaultCategories = ['Mouse', 'Keyboard', 'Headset', 'Microphone', 'Monitor'];
      setCategories(defaultCategories);
      localStorage.setItem('stockCategories', JSON.stringify(defaultCategories));
    }
  }, []);

  const logStockChange = (product, action, details, staffName = 'Admin User') => {
    const newHistoryEntry = {
      date: new Date().toISOString(),
      action,
      staff: staffName,
      details
    };

    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        return { ...p, history: [newHistoryEntry, ...(p.history || [])] };
      }
      return p;
    });

    setProducts(updatedProducts);
    localStorage.setItem('stockProducts', JSON.stringify(updatedProducts));
  };
  
  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      const oldProduct = products.find(p => p.id === editingProduct.id);
      const updatedProducts = products.map(p => (p.id === editingProduct.id ? { ...p, ...productData, id: editingProduct.id } : p));
      setProducts(updatedProducts);
      localStorage.setItem('stockProducts', JSON.stringify(updatedProducts));
      logStockChange(editingProduct, 'Product Edited', `From ${JSON.stringify(oldProduct)} to ${JSON.stringify(productData)}`, user.name);
      toast({ title: "Success", description: "Product updated successfully!" });
    } else {
      const newProduct = { ...productData, id: Date.now(), sales: 0, history: [] };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('stockProducts', JSON.stringify(updatedProducts));
      logStockChange(newProduct, 'Product Created', `New product added`, user.name);
      toast({ title: "Success", description: "Product added successfully!" });
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product) => {
    const updatedProducts = products.filter(p => p.id !== product.id);
    setProducts(updatedProducts);
    localStorage.setItem('stockProducts', JSON.stringify(updatedProducts));
    toast({ title: "Success", description: "Product deleted successfully!" });
  };
  
  const handleViewHistory = (product) => {
    setHistoryProduct(product);
  };

  const handleUpdateStock = (product, newQuantity) => {
    const oldQuantity = product.quantity;
    const updatedProduct = { ...product, quantity: newQuantity };
    const updatedProducts = products.map(p => p.id === product.id ? updatedProduct : p);
    setProducts(updatedProducts);
    localStorage.setItem('stockProducts', JSON.stringify(updatedProducts));
    logStockChange(product, 'Stock Updated', `Quantity changed from ${oldQuantity} to ${newQuantity}`, user.name);
    toast({ title: 'Stock Updated', description: `${product.name} quantity set to ${newQuantity}` });
  };

  return (
    <>
      <Helmet>
        <title>Stock Management - Admin Panel</title>
        <meta name="description" content="Manage inventory, categories, and track stock levels." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Stock Management</h1>
            <p className="text-gray-400 mt-1">Manage your inventory, categories, and track stock levels.</p>
          </div>

          <div className="flex items-center space-x-3">
             <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if (!isOpen) setEditingProduct(null); }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <ProductForm 
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                onSubmit={handleFormSubmit} 
                product={editingProduct}
                categories={categories}
              />
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="glass-effect border-white/20">
            <TabsTrigger value="products" className="text-white data-[state=active]:bg-blue-500/20">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            {canManageCategories && (
              <TabsTrigger value="categories" className="text-white data-[state=active]:bg-blue-500/20">
                <Folder className="w-4 h-4 mr-2" />
                Categories
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="products">
            <ProductList 
              products={products}
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewHistory={handleViewHistory}
              onUpdateStock={handleUpdateStock}
              userRole={user.role}
            />
          </TabsContent>
          
          {canManageCategories && (
            <TabsContent value="categories">
              <CategoryManager categories={categories} setCategories={setCategories} />
            </TabsContent>
          )}
        </Tabs>
        
        <StockHistory product={historyProduct} isOpen={!!historyProduct} onOpenChange={() => setHistoryProduct(null)} />
      </div>
    </>
  );
};

export default StockManagement;
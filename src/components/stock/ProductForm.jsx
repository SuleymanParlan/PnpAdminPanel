import React, { useState, useEffect } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProductForm = ({ isOpen, setIsOpen, onSubmit, product, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    minStock: '10',
    purchaseCost: '',
    sellingPrice: '',
    category: '',
    supplier: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        quantity: product.quantity?.toString() || '',
        minStock: product.minStock?.toString() || '10',
        purchaseCost: product.purchaseCost?.toString() || '',
        sellingPrice: product.sellingPrice?.toString() || '',
        category: product.category || '',
        supplier: product.supplier || '',
      });
    } else {
      setFormData({
        name: '',
        quantity: '',
        minStock: '10',
        purchaseCost: '',
        sellingPrice: '',
        category: '',
        supplier: '',
      });
    }
  }, [product, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      minStock: parseInt(formData.minStock, 10),
      purchaseCost: parseFloat(formData.purchaseCost),
      sellingPrice: parseFloat(formData.sellingPrice),
    });
  };

  return (
    <DialogContent className="glass-effect border-white/20 text-white max-w-lg">
      <DialogHeader>
        <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogDescription className="text-gray-400">
          {product ? 'Update product details.' : 'Add a new product to your inventory.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="glass-effect border-white/20 text-white" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" value={formData.quantity} onChange={(e) => handleChange('quantity', e.target.value)} className="glass-effect border-white/20 text-white" required />
          </div>
          <div>
            <Label htmlFor="minStock">Min. Stock Alert</Label>
            <Input id="minStock" type="number" value={formData.minStock} onChange={(e) => handleChange('minStock', e.target.value)} className="glass-effect border-white/20 text-white" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="purchaseCost">Purchase Cost</Label>
            <Input id="purchaseCost" type="number" step="0.01" value={formData.purchaseCost} onChange={(e) => handleChange('purchaseCost', e.target.value)} className="glass-effect border-white/20 text-white" required />
          </div>
          <div>
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input id="sellingPrice" type="number" step="0.01" value={formData.sellingPrice} onChange={(e) => handleChange('sellingPrice', e.target.value)} className="glass-effect border-white/20 text-white" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className="glass-effect border-white/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass-effect border-white/20 bg-slate-800 text-white">
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input id="supplier" value={formData.supplier} onChange={(e) => handleChange('supplier', e.target.value)} className="glass-effect border-white/20 text-white" />
            </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} className="glass-effect border-white/20 text-white hover:bg-white/10">Cancel</Button>
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ProductForm;
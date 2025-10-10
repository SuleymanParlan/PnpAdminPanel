import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('stockCategories', JSON.stringify(updatedCategories));
      setNewCategory('');
      toast({ title: 'Success', description: 'Category added.' });
    } else {
      toast({ title: 'Error', description: 'Category is empty or already exists.', variant: 'destructive' });
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
    setCategories(updatedCategories);
    localStorage.setItem('stockCategories', JSON.stringify(updatedCategories));
    toast({ title: 'Success', description: 'Category deleted.' });
  };
  
  const handleEditCategory = () => {
    if (editValue && !categories.includes(editValue)) {
      const updatedCategories = categories.map(cat => cat === editingCategory ? editValue : cat);
      setCategories(updatedCategories);
      localStorage.setItem('stockCategories', JSON.stringify(updatedCategories));
      setEditingCategory(null);
      setEditValue('');
      toast({ title: 'Success', description: 'Category updated.' });
    } else {
      toast({ title: 'Error', description: 'Category name is empty or already exists.', variant: 'destructive' });
    }
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Manage Categories</CardTitle>
        <CardDescription className="text-gray-400">Add, edit, or delete product categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="glass-effect border-white/20 text-white"
          />
          <Button onClick={handleAddCategory}>
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {categories.map(cat => (
            <div key={cat} className="flex items-center justify-between p-2 rounded-md glass-effect border border-white/10">
              <span className="text-white">{cat}</span>
              <div className="space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400" onClick={() => { setEditingCategory(cat); setEditValue(cat); }}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleDeleteCategory(cat)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent className="glass-effect border-white/20 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Category: {editingCategory}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={editValue} 
              onChange={(e) => setEditValue(e.target.value)} 
              className="glass-effect border-white/20 text-white"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCategory(null)} className="glass-effect border-white/20 text-white hover:bg-white/10">Cancel</Button>
            <Button onClick={handleEditCategory} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CategoryManager;
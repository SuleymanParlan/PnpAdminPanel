import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

const StockHistory = ({ product, isOpen, onOpenChange }) => {
  if (!product) return null;

  return (
    <DialogContent className="glass-effect border-white/20 text-white max-w-2xl">
      <DialogHeader>
        <DialogTitle>Stock History for {product.name}</DialogTitle>
        <DialogDescription className="text-gray-400">
          A log of all stock adjustments for this product.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-96">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Action</TableHead>
              <TableHead className="text-gray-300">Staff</TableHead>
              <TableHead className="text-gray-300">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(product.history || []).map((entry, index) => (
              <TableRow key={index} className="border-white/10">
                <TableCell className="text-white">{format(new Date(entry.date), 'PPpp')}</TableCell>
                <TableCell className="text-white">{entry.action}</TableCell>
                <TableCell className="text-white">{entry.staff}</TableCell>
                <TableCell className="text-gray-300">{entry.details}</TableCell>
              </TableRow>
            ))}
            {(!product.history || product.history.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">No history available for this product.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </DialogContent>
  );
};

export default StockHistory;
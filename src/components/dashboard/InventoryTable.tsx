
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InventoryTableProps {
  title: string;
  data: any[];
  loading: boolean;
  type: 'low-stock' | 'out-of-stock' | 'expiring';
  onRefresh?: () => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ 
  title, 
  data, 
  loading, 
  type,
  onRefresh 
}) => {
  const { toast } = useToast();

  const handleGenerateReorder = async () => {
    try {
      const { data: result, error } = await supabase
        .rpc('generate_purchase_order');

      if (error) throw error;

      toast({
        title: "Success",
        description: `Purchase order generated successfully: PO-${result}`,
      });

      if (onRefresh) onRefresh();
    } catch (error: any) {
      console.error('Error generating purchase order:', error);
      toast({
        title: "Error",
        description: "Failed to generate purchase order",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {(type === 'low-stock' || type === 'out-of-stock') && data.length > 0 && (
          <Button onClick={handleGenerateReorder} size="sm">
            Generate Reorder
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No items found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                {type === 'expiring' && <TableHead>Days Until Expiry</TableHead>}
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((item) => (
                <TableRow key={item.id || item.product_id}>
                  <TableCell className="font-medium">
                    {item.name || item.product_name}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.stock === 0 ? 'destructive' : 
                        item.stock <= 5 ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {item.stock}
                    </Badge>
                  </TableCell>
                  {type === 'expiring' && (
                    <TableCell>
                      <Badge 
                        variant={
                          item.days_until_expiry <= 7 ? 'destructive' : 
                          item.days_until_expiry <= 30 ? 'secondary' : 
                          'default'
                        }
                      >
                        {item.days_until_expiry} days
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>₹{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryTable;

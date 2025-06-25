
import { supabase } from '@/integrations/supabase/client';
import { useStaffAuth } from '@/contexts/StaffAuthContext';

export const useStaffOperations = () => {
  const { user: staffUser } = useStaffAuth();

  const isStaffAuthenticated = () => {
    return !!staffUser && ['admin', 'manager', 'staff'].includes(staffUser.role);
  };

  // Simple operations without complex permission checks
  const insertProduct = async (productData: any) => {
    if (!isStaffAuthenticated()) {
      throw new Error('Staff authentication required');
    }

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateProduct = async (id: string, productData: any) => {
    if (!isStaffAuthenticated()) {
      throw new Error('Staff authentication required');
    }

    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const insertImportLog = async (logData: any) => {
    if (!isStaffAuthenticated()) {
      throw new Error('Staff authentication required');
    }

    const { data, error } = await supabase
      .from('product_import_logs')
      .insert({
        ...logData,
        staff_id: staffUser!.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const bulkInsertProducts = async (products: any[]) => {
    if (!isStaffAuthenticated()) {
      throw new Error('Staff authentication required');
    }

    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();
    
    if (error) throw error;
    return data;
  };

  return {
    isStaffAuthenticated,
    insertProduct,
    updateProduct,
    insertImportLog,
    bulkInsertProducts,
    staffUser
  };
};

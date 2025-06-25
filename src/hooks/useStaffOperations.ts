
import { supabase } from '@/integrations/supabase/client';
import { useStaffAuth } from '@/contexts/StaffAuthContext';

export const useStaffOperations = () => {
  const { user: staffUser } = useStaffAuth();

  const isStaffAuthenticated = () => {
    return !!staffUser && ['admin', 'manager', 'staff'].includes(staffUser.role);
  };

  // Create a Supabase client call that ensures staff permissions
  const staffSupabaseCall = async (operation: () => Promise<any>) => {
    if (!isStaffAuthenticated()) {
      throw new Error('Staff authentication required');
    }

    try {
      return await operation();
    } catch (error: any) {
      console.error('Staff operation error:', error);
      throw error;
    }
  };

  // Staff-specific operations
  const insertProduct = async (productData: any) => {
    return staffSupabaseCall(async () => {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    });
  };

  const updateProduct = async (id: string, productData: any) => {
    return staffSupabaseCall(async () => {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    });
  };

  const insertImportLog = async (logData: any) => {
    return staffSupabaseCall(async () => {
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
    });
  };

  const bulkInsertProducts = async (products: any[]) => {
    return staffSupabaseCall(async () => {
      const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select();
      
      if (error) throw error;
      return data;
    });
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

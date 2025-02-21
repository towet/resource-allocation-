import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Resource {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  status: 'available' | 'in_use' | 'maintenance';
  location?: string;
  department_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Resource[];
    },
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resource: Partial<Omit<Resource, 'id' | 'created_at' | 'updated_at'>>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const newResource = {
        ...resource,
        created_by: user.id,
        status: resource.status || 'available',
        quantity: resource.quantity || 0
      };

      const { data, error } = await supabase
        .from('resources')
        .insert(newResource)
        .select()
        .single();

      if (error) {
        console.error('Error creating resource:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...resource }: Partial<Resource> & { id: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('resources')
        .update({
          ...resource,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating resource:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};

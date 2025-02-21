import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface AllocationRequest {
  id: string;
  resource_id: string;
  requesting_department_id: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  request_date: string;
  approval_date?: string;
  return_date?: string;
  resource?: {
    name: string;
    status: string;
  };
  department?: {
    name: string;
  };
}

export const useAllocationRequests = () => {
  return useQuery({
    queryKey: ['allocation_requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('allocation_requests')
        .select(`
          *,
          resource:resources(name, status),
          department:departments(name)
        `)
        .order('request_date', { ascending: false });

      if (error) throw error;
      return data as AllocationRequest[];
    },
  });
};

export const useCreateAllocationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: Omit<AllocationRequest, 'id' | 'request_date' | 'resource' | 'department'>) => {
      const { data, error } = await supabase
        .from('allocation_requests')
        .insert(request)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allocation_requests'] });
    },
  });
};

export const useUpdateAllocationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...request }: Partial<AllocationRequest> & { id: string }) => {
      const { data, error } = await supabase
        .from('allocation_requests')
        .update(request)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allocation_requests'] });
    },
  });
};

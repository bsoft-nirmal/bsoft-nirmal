import { useQuery } from '@tanstack/react-query';
import { getBids, getBidById } from '@services/api/bids.api';
import type { BidFilters } from '@models/bid.types';

export function useBids(filters?: BidFilters) {
  return useQuery({
    queryKey: ['bids', filters],
    queryFn: async () => {
      const res = await getBids(filters);
      return res.data.data;
    },
  });
}

export function useBid(id?: string) {
  return useQuery({
    queryKey: ['bid', id],
    queryFn: async () => {
      if (!id) return undefined;
      const res = await getBidById(id);
      return res.data.data;
    },
    enabled: !!id,
  });
}

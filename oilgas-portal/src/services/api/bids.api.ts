import axios from '../axios.config';
import type { Bid, BidFilters } from '@models/bid.types';
import type { ApiResponse, PaginatedResult } from '@models/common.types';

export const getBids = (filters?: BidFilters) =>
  axios.get<ApiResponse<PaginatedResult<Bid>>>('/bids', { params: filters });

export const getBidById = (id: string) => axios.get<ApiResponse<Bid>>(`/bids/${id}`);

export const createBid = (data: Partial<Bid>) => axios.post<ApiResponse<Bid>>('/bids', data);

export const updateBid = (id: string, data: Partial<Bid>) =>
  axios.put<ApiResponse<Bid>>(`/bids/${id}`, data);

export const deleteBid = (id: string) => axios.delete<ApiResponse<void>>(`/bids/${id}`);

export const applyToBid = (
  bidId: string,
  applicationData: unknown,
) => axios.post<ApiResponse<void>>(`/bids/${bidId}/apply`, applicationData);
